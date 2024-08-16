import { createSelector } from "@reduxjs/toolkit";
import { selectEvolution, TalentType } from "../evolution/evolutionSlice";
import { Inventory, InventoryLocation, OneItemPerHand, selectInventory } from "../inventory/inventorySlice";
import { ElementId, Item, ItemStatus, Modifier, Weapon } from "../../data/inventory";
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

export interface HandSummary {
  id: number,
  name: string;
  baseDamage: number;
  damage: number;
  baseAccuracy: number;
  accuracy: number;
  usageCost: number;
  elementaryAffinity?: ElementId;
  element?: ElementId;
  status?: ItemStatus[];
  isWeapon: boolean;
  range: { min: number, max: number };
}

export interface SummaryState extends Attributes {
  elementaryResistances: { value: number, element: ElementId }[];
  empathie: number;
  memory: number;
  mana: number;
  vitality: number;
  magicRecovery: number;
  actionPointsBonus: number;
  regeneration: number;
  primaryWeapon?: HandSummary;
  secondaryWeapon?: HandSummary;
  talents: { id: number, type: TalentType }[];
  inventory: { id: number, name: string }[];
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
    
    const applyEnchantment = (item: Item | Weapon, enchantment: Modifier) => {
      return (item.enhancedEnchantment && [enchantment, enchantment]) || [enchantment];
    }

    const getModifiers = ({ enchantment, item, settings }: Inventory<Item | Weapon>) => {
      if (!item) {
        return [];
      }

      const enchantments = (enchantment && applyEnchantment(item, enchantment)) || [];
      
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
          if ((slot !== "hands" && slot !== "rightHand" && slot !== "leftHand") || !(item.item as Weapon)?.usageCost || (attribute !== "accuracy" && attribute !== "damage")) {
            total[attribute] += item.item[attribute] ?? 0;
          }
        }
      }
    }
    for (const modifier of modifiers) {
      for (attribute in modifier as Attributes) {
        total[attribute] += modifier[attribute] ?? 0;
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
    actionPointsBonus: evolution.character.profile.actionPointBonus + total.actionPointsBonus,
    regeneration,
    elementaryResistances,
    empathie: Math.floor((evolution.character.profile.charisma + total.charisma) / 5),
    memory: Math.floor((evolution.character.profile.mind + total.mind) / 5),
    mana: (evolution.character.profile.mind + total.mind) * 2,
    vitality: (evolution.character.profile.constitution + total.constitution) * 10,
    talents: [
      ...Object.entries(inventory?.magicScrolls.rightHand)
        .map((scroll) => (scroll[1] && { id: scroll[1], type: TalentType.MagicScroll }) || undefined)
        .filter(scroll => !!scroll),
      ...Object.entries(inventory?.magicScrolls.leftHand)
        .map((scroll) => (scroll[1] && { id: scroll[1], type: TalentType.MagicScroll }) || undefined)
        .filter(scroll => !!scroll),
      ...Object.entries(evolution.talents).map(talent => talent[1]).filter(talent => !!talent),
    ],
  };
  const getBaseDamage = (weapon: Weapon) => (!weapon.range || weapon.range.max === 1)
    ? summary.strength
    : summary.dexterity;

  const weapon = ((inventory.hands as OneItemPerHand)?.rightHand?.item as Weapon | undefined) || (inventory.hands as Inventory<Weapon>)?.item;
  const primaryWeapon: HandSummary | undefined = weapon && {
    id: weapon.id,
    name: weapon.name,
    baseDamage: getBaseDamage(weapon),
    damage: (weapon.damage ?? 0) + summary.damage,
    baseAccuracy: summary.accuracy,
    accuracy: (weapon?.accuracy ?? 0),
    usageCost: weapon.usageCost,
    elementaryAffinity: weapon.elementaryAffinity,
    element: weapon.element,
    status: weapon.status,
    isWeapon: !!weapon.usageCost,
    range: weapon.range || { min: 1, max: 1 },
  };

  const leftWeapon = (inventory.hands as OneItemPerHand)?.leftHand?.item as Weapon | undefined;
  const isLeftHand = leftWeapon?.id === 311;
  const secondaryWeapon: HandSummary | undefined = leftWeapon && {
    id: leftWeapon.id,
    name: leftWeapon.name,
    baseDamage: getBaseDamage(leftWeapon),
    damage: (leftWeapon.damage ?? 0) + ((isLeftHand && 2) || 0) + summary.damage,
    baseAccuracy: summary.accuracy,
    accuracy: (leftWeapon?.accuracy ?? 0) + ((isLeftHand && 10) || 0),
    usageCost: leftWeapon.usageCost,
    elementaryAffinity: leftWeapon.elementaryAffinity,
    element: leftWeapon.element,
    status: leftWeapon.status,
    isWeapon: !!leftWeapon.usageCost,
    range: leftWeapon.range || { min: 1, max: 1 },
  };

  const getSummaryItem = (item?: Item) => (item && {
    id: item.id,
    name: item.name,
  });
  const inventorySummary = [
    getSummaryItem(inventory.head?.item),
    getSummaryItem(inventory.bust?.item),
    getSummaryItem(weapon),
    getSummaryItem(leftWeapon),
    getSummaryItem(inventory.feet?.item),
    getSummaryItem(inventory.fetish?.item),
  ].filter(item => !!item);

  return {
    ...summary,
    primaryWeapon,
    secondaryWeapon,
    inventory: inventorySummary,
  } as SummaryState;
});