import { createSelector } from "@reduxjs/toolkit";
import { selectEvolution } from "../evolution/evolutionSlice";
import { Inventory, InventoryState, OneItemPerHand, selectInventory } from "../inventory/inventorySlice";
import { ElementId, Item, Weapon } from "../../data/inventory";
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
  const computeInventory = (inventory: InventoryState) => {
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

    let slot: keyof InventoryState;

    for (slot in inventory) {
      const slotItem = inventory[slot] as Inventory<Item | Weapon>;
      if (slotItem?.item) {
        let attribute: keyof Attributes;
        if (slotItem.enchantment) {
          for (attribute in slotItem.enchantment as Attributes) {
            total[attribute] += slotItem.enchantment[attribute] || 0;
          }
        }
        if (slotItem.settings) {
          for (attribute in total) {
            total[attribute] += (slotItem.settings.first && slotItem.settings.first[attribute]) || 0;
            total[attribute] += (slotItem.settings.second && slotItem.settings.second[attribute]) || 0;
          }
        }
        for (attribute in total) {
          if (slot === 'hands' && (attribute === 'damage' || attribute === 'accuracy')) {
            continue;
          }

          total[attribute] += slotItem.item[attribute] || 0;
        }

        if (slotItem.item.elementaryResistances) {
          slotItem.item.elementaryResistances.forEach(({ value, element }) => {
            elementaryResistances.find(res => res.element === element)!.value += value;
          });
        }
      }
    }

    const hands = inventory.hands as OneItemPerHand;

    if (hands && (hands.rightHand || hands.leftHand)) {
      let attribute: keyof Attributes;
      if (hands.rightHand?.enchantment) {
        for (attribute in hands.rightHand.enchantment as Attributes) {
          total[attribute] += hands.rightHand.enchantment[attribute] || 0;
        }
      }
      if (hands.rightHand?.settings) {
        for (attribute in total) {
          total[attribute] += (hands.rightHand.settings.first && hands.rightHand.settings.first[attribute]) || 0;
          total[attribute] += (hands.rightHand.settings.second && hands.rightHand.settings.second[attribute]) || 0;
        }
      }
      if (hands.leftHand?.enchantment) {
        for (attribute in hands.leftHand.enchantment as Attributes) {
          total[attribute] += hands.leftHand.enchantment[attribute] || 0;
        }
      }
      if (hands.leftHand?.settings) {
        for (attribute in total) {
          total[attribute] += (hands.leftHand.settings.first && hands.leftHand.settings.first[attribute]) || 0;
          total[attribute] += (hands.leftHand.settings.second && hands.leftHand.settings.second[attribute]) || 0;
        }
      }
      for (attribute in total) {
        if (attribute === 'damage' || attribute === 'accuracy') {
          continue;
        }
        total[attribute] += (hands.rightHand?.item && hands.rightHand?.item[attribute]) || 0;
        total[attribute] += (hands.leftHand?.item && hands.leftHand?.item[attribute]) || 0;
      }
    }

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
    elementaryResistances
  };

  const weapon = ((inventory.hands as OneItemPerHand)?.rightHand?.item as Weapon) || (inventory.hands as Inventory<Weapon>)?.item;
  const primaryWeapon = weapon && {
    ...weapon,
    damage: (weapon.range && weapon.range.min > 1 ? summary.dexterity : summary.strength) + (weapon.damage || 0),
    accuracy: summary.accuracy + (weapon?.accuracy || 0),
  };

  const leftWeapon = (inventory.hands as OneItemPerHand)?.leftHand?.item as Weapon;
  const secondaryWeapon = leftWeapon && {
    ...leftWeapon,
    damage: (leftWeapon.range && leftWeapon.range.min > 1 ? summary.dexterity : summary.strength) + (leftWeapon.damage || 0),
    accuracy: summary.accuracy + (weapon?.accuracy || 0),
  };

  return {
    ...summary,
    primaryWeapon,
    secondaryWeapon,
  }
});