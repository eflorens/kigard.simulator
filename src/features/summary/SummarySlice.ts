import { createSelector } from "@reduxjs/toolkit";
import { selectEvolution } from "../evolution/evolutionSlice";
import { Inventory, InventoryLocation, OneItemPerHand, selectInventory } from "../inventory/inventorySlice";
import { ElementId, Item, Modifier, Weapon } from "../../data/inventory";
import { GiftId } from "../../data/character";

interface Attributes {
  strength: number;
  dexterity: number;
  intelligence: number;
  constitution: number;
  mind: number;
  charisma: number;
  accuracy: number;
  dodge: number;
  magicAttack: number;
  magicDefense: number;
  observation: number;
  discretion: number;
  armor: number;
  damage: number;
  magicResistance: number;
  magicPower: number;
  actionPointsBonus: number;
  regeneration: number;
}

export const selectSummary = createSelector([selectEvolution, selectInventory], (evolution, inventory) => {
  const computeInventory = (inventory: InventoryLocation) => {
    const total: Attributes = {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      constitution: 0,
      mind: 0,
      charisma: 0,
      accuracy: 0,
      dodge: 0,
      magicAttack: 0,
      magicDefense: 0,
      observation: 0,
      discretion: 0,
      armor: 0,
      damage: 0,
      magicResistance: 0,
      magicPower: 0,
      actionPointsBonus: 0,
      regeneration: 0,
    };

    const elementaryResistances = [{
      value: 0,
      element: ElementId.Fire
    }, {
      value: 0,
      element: ElementId.Ice
    }, {
      value: 0,
      element: ElementId.Thunder
    }, {
      value: 0,
      element: ElementId.Light
    }, {
      value: 0,
      element: ElementId.Dark
    }, {
      value: 0,
      element: ElementId.Water
    }, {
      value: 0,
      element: ElementId.Earth
    }, {
      value: 0,
      element: ElementId.Wind
    }];

    const getModifiers = ({ enchantment, item, settings }: Inventory<Item | Weapon>) => {
      if (!item) {
        return [];
      }

      const enchantments = !enchantment ? [] : item.enhancedEnchantment
        ? [enchantment, enchantment]
        : [enchantment];
      const settingCollection = [settings.first, settings.second]
        .filter(setting => !!setting);

      return [...enchantments, ...settingCollection];
    }

    type ItemSlot = keyof InventoryLocation | "leftHand" | "rightHand";

    const items = (Object.keys(inventory) as (keyof InventoryLocation)[])
      .map(slot => {
        return { slot: slot as ItemSlot, item: inventory[slot] as Inventory<Item | Weapon> };
      });
    const itemPerHand = inventory.hands as OneItemPerHand;
    if (itemPerHand?.rightHand) {
      items.push({ slot: "rightHand", item: itemPerHand.rightHand });
    }
    if (itemPerHand?.leftHand) {
      items.push({ slot: "leftHand", item: itemPerHand.leftHand });
    }

    const modifiers = items
      .map(({ item }) => getModifiers(item))
      .reduce((previous, current) => previous.concat(current), [])
      .reduce<Modifier[]>((previous, current) => {
        return current && previous.filter(modifier => modifier.description === current.description).length < 3
          ? [...previous, current]
          : previous;
      }, []);

    let attribute: keyof Attributes;
    for (const { slot, item } of items) {
      if (item.item) {
        for (attribute in item.item as Attributes) {
          if ((slot !== "hands" && slot !== "rightHand" && slot !== "leftHand") || (attribute !== "accuracy" && attribute !== "damage")) {
            total[attribute] += item.item[attribute] || 0;
          }
        }
      }
    }
    for (const modifier of modifiers) {
      for (attribute in modifier as Attributes) {
        total[attribute] += modifier[attribute] || 0;
      }
    }

    items.forEach(({ item }) => {
      item.item?.elementaryResistances?.forEach(({ value, element }) => {
        elementaryResistances.find(res => res.element === element)!.value += value;
      });
    });

    return { total, elementaryResistances };
  }

  const { total, elementaryResistances } = computeInventory(inventory);
  const regeneration = (evolution.character.breed.gifts.some(gift => gift === GiftId.REGENERATION) ? (evolution.character.profile.constitution / 5) : 0)
    + total.regeneration;

  const summary = {
    strength: evolution.character.profile.strength + total.strength,
    dexterity: evolution.character.profile.dexterity + total.dexterity,
    intelligence: evolution.character.profile.intelligence + total.intelligence,
    constitution: evolution.character.profile.constitution + total.constitution,
    mind: evolution.character.profile.mind + total.mind,
    charisma: evolution.character.profile.charisma + total.charisma,
    accuracy: evolution.character.profile.accuracy + total.accuracy,
    dodge: evolution.character.profile.dodge + total.dodge,
    magicAttack: evolution.character.profile.magicAttack + total.magicAttack,
    magicDefense: evolution.character.profile.magicDefense + total.magicDefense,
    observation: evolution.character.profile.observation + total.observation,
    discretion: evolution.character.profile.discretion + total.discretion,
    armor: evolution.character.profile.armor + total.armor,
    damage: evolution.character.profile.damage + total.damage,
    magicResistance: evolution.character.profile.magicResistance + total.magicResistance,
    magicPower: evolution.character.profile.magicPower + total.magicPower,
    magicRecovery: evolution.character.profile.magicRecovery,
    actionPointBonus: evolution.character.profile.actionPointBonus + total.actionPointsBonus,
    regeneration,
    elementaryResistances,
    empathie: Math.floor((evolution.character.profile.charisma + total.charisma) / 5),
    memory: Math.floor((evolution.character.profile.mind + total.mind) / 5),
    mana: (evolution.character.profile.mind + total.mind) * 2,
    vitality: (evolution.character.profile.constitution + total.constitution) * 10,
  };

  const weapon = ((inventory.hands as OneItemPerHand)?.rightHand?.item as Weapon) || (inventory.hands as Inventory<Weapon>)?.item;
  const primaryWeapon = weapon && {
    ...weapon,
    damage: (weapon.range && weapon.range.max > 1 ? summary.dexterity : summary.strength) + (weapon.damage || 0),
    accuracy: summary.accuracy + (weapon?.accuracy || 0),
  };

  const leftWeapon = (inventory.hands as OneItemPerHand)?.leftHand?.item as Weapon;
  const isLeftHand = leftWeapon?.id === 311;
  const secondaryWeapon = leftWeapon && {
    ...leftWeapon,
    damage: (leftWeapon.range && leftWeapon.range.min > 1 ? summary.dexterity : summary.strength)
      + (leftWeapon.damage || 0)
      + ((isLeftHand && 2) || 0),
    accuracy: summary.accuracy + (leftWeapon?.accuracy || 0)+ ((isLeftHand && 10) || 0),
  };

  return {
    ...summary,
    primaryWeapon,
    secondaryWeapon,
  }
});