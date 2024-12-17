import inventoryData from './inventory.json';

export enum Status {
  Stunned = 1,
  Restrained = 2,
  Piercing = 3,
  Poisoned = 4,
  Inspiration = 5,
  Overload = 29,
  Force = 8,
  Necrosis = 9,
  Defense = 10,
  Regeneration = 11,
  Endurance = 12,
  Furtivity = 13,
  Horse = 14,
  MysticalSubterfuge = 15,
  Burning = 16,
  Bleeding = 17,
  Aegis = 19,
  Terror = 20,
  Immunity = 21,
  Hability = 22,
  Vivacious = 23,
  Protect = 26,
  Hitback = 27,
  Impact = 28,
  Exalted = 30,
  Bewitched = 31,
  Exposed = 32,
  Freeze = 39,
  Will = 40,
  Fire = 44,
  Taunt = 47,
}

export const allStatus = [{
  id: Status.Stunned,
  name: "Assomé"
}, {
  id: Status.Restrained,
  name: "Ralenti"
}, {
  id: Status.Piercing,
  name: "Faille"
}, {
  id: Status.Poisoned,
  name: "Poison"
}, {
  id: Status.Inspiration,
  name: "Inspiration"
}, {
  id: Status.Overload,
  name: "Surcharge"
}, {
  id: Status.Force,
  name: "Force"
}, {
  id: Status.Necrosis,
  name: "Nécrose"
}, {
  id: Status.Defense,
  name: "Défense"
}, {
  id: Status.Regeneration,
  name: "Régénération"
}, {
  id: Status.Endurance,
  name: "Endurance"
}, {
  id: Status.Furtivity,
  name: "Furtif"
}, {
  id: Status.Horse,
  name: "A cheval"
}, {
  id: Status.MysticalSubterfuge,
  name: "Subterfuge mystique"
}, {
  id: Status.Burning,
  name: "Brûlure"
}, {
  id: Status.Bleeding,
  name: "Saignement"
}, {
  id: Status.Aegis,
  name: "Egide"
}, {
  id: Status.Terror,
  name: "Terreur"
}, {
  id: Status.Immunity,
  name: "Immunité"
}, {
  id: Status.Hability,
  name: "Habile"
}, {
  id: Status.Vivacious,
  name: "Vivace"
}, {
  id: Status.Protect,
  name: "Protéger"
}, {
  id: Status.Hitback,
  name: "Riposte"
}, {
  id: Status.Impact,
  name: "Impact"
}, {
  id: Status.Exalted,
  name: "Exalté"
}, {
  id: Status.Bewitched,
  name: "Envoûté"
}, {
  id: Status.Exposed,
  name: "Exposé"
}, {
  id: Status.Freeze,
  name: "Gel"
}, {
  id: Status.Will,
  name: "Volonté"
}, {
  id: Status.Fire,
  name: "Incendie"
}, {
  id: Status.Taunt,
  name: 'Provocation'
}];

export enum ElementId {
  Fire = 1,
  Ice = 2,
  Thunder = 3,
  Light = 4,
  Dark = 5,
  Water = 6,
  Earth = 7,
  Wind = 8,
}

export const allElements = [{
  id: ElementId.Fire,
  name: "Feu"
}, {
  id: ElementId.Ice,
  name: "Glace"
}, {
  id: ElementId.Thunder,
  name: "Foudre"
}, {
  id: ElementId.Light,
  name: "Lumière"
}, {
  id: ElementId.Dark,
  name: "Ténèbres"
}, {
  id: ElementId.Water,
  name: "Eau"
}, {
  id: ElementId.Earth,
  name: "Terre"
}, {
  id: ElementId.Wind,
  name: "Vent"
}]

export interface ItemStatus {
  value: number;
  status: Status;
}

interface Attributes {
  strength?: number;
  dexterity?: number;
  intelligence?: number;
  constitution?: number;
  mind?: number;
  charisma?: number;
  accuracy?: number;
  dodge?: number;
  magicAttack?: number;
  magicDefense?: number;
  observation?: number;
  discretion?: number;
  armor?: number;
  damage?: number;
  magicResistance?: number;
  magicPower?: number;
  actionPointsBonus?: number;
  regeneration?: number;
}

export interface Modifier extends Attributes {
  id: number;
  description: string;
}

export const allEnchantments: Modifier[] = [{
  id: 1,
  description: "+5% OBS",
  observation: 5,
}, {
  id: 2,
  description: "+5% PRE",
  accuracy: 5,
}, {
  id: 3,
  description: "+5% MM",
  magicAttack: 5,
}, {
  id: 4,
  description: "+5% DIS",
  discretion: 5,
}, {
  id: 5,
  description: "+5% ESQ",
  dodge: 5,
}, {
  id: 6,
  description: "+5% DM",
  magicDefense: 5,
}, {
  id: 7,
  description: "+25% PA",
  actionPointsBonus: 25,
}];

export const allSettings: Modifier[] = [{
  id: 8,
  description: "+1 FOR",
  strength: 1,
}, {
  id: 9,
  description: "+1 DEX",
  dexterity: 1,
}, {
  id: 10,
  description: "+1 INT",
  intelligence: 1,
}, {
  id: 11,
  description: "+1 CON",
  constitution: 1,
}, {
  id: 12,
  description: "+1 CHA",
  charisma: 1,
}, {
  id: 13,
  description: "+1 ESP",
  mind: 1,
}];

export interface Item extends Attributes {
  id: number;
  name: string;
  weight: number;
  doubleSetting?: boolean;
  enhancedEnchantment?: boolean;
  status?: ItemStatus[];
  elementaryResistances?: {
    value: number;
    element: ElementId;
  }[];
  magicalSpace?: number;
}

export interface Weapon extends Item {
  usageCost: number;
  range?: { min: number, max: number };
  element?: ElementId;
  elementaryAffinity?: ElementId;
}

interface ItemStatusData {
  value: number;
  status: string;
}

interface ItemData {
  id: number;
  name: string;
  weight: number;
  doubleSetting?: boolean;
  enhancedEnchantment?: boolean;
  status?: ItemStatusData[];
  elementaryResistances?: {
    value: number;
    element: string;
  }[];
  magicalSpace?: number;
  strength?: number;
  dexterity?: number;
  intelligence?: number;
  constitution?: number;
  mind?: number;
  charisma?: number;
  accuracy?: number;
  dodge?: number;
  magicAttack?: number;
  magicDefense?: number;
  observation?: number;
  discretion?: number;
  armor?: number;
  damage?: number;
  magicResistance?: number;
  magicPower?: number;
  actionPointsBonus?: number;
  regeneration?: number;
}

interface WeaponData extends ItemData {
  usageCost: number;
  range?: { min: number, max: number };
  element?: string;
  elementaryAffinity?: string;
}

const getItem = (item: ItemData): Item => ({

  id: item.id,
  name: item.name,
  weight: item.weight,
  doubleSetting: item.doubleSetting,
  enhancedEnchantment: item.enhancedEnchantment,
  status: item.status?.map(s => ({
    value: s.value,
    status: Status[s.status as keyof typeof Status],
  })),
  elementaryResistances: item.elementaryResistances?.map(res => ({
    value: res.value,
    element: ElementId[res.element as keyof typeof ElementId],
  })),
  magicalSpace: item.magicalSpace,
  strength: item.strength,
  dexterity: item.dexterity,
  intelligence: item.intelligence,
  constitution: item.constitution,
  mind: item.mind,
  charisma: item.charisma,
  accuracy: item.accuracy,
  dodge: item.dodge,
  magicAttack: item.magicAttack,
  magicDefense: item.magicDefense,
  observation: item.observation,
  discretion: item.discretion,
  armor: item.armor,
  damage: item.damage,
  magicResistance: item.magicResistance,
  magicPower: item.magicPower,
  actionPointsBonus: item.actionPointsBonus,
  regeneration: item.regeneration,
});


const getWeapon = (weapon: WeaponData): Weapon => ({
  ...getItem(weapon),
  usageCost: weapon.usageCost,
  range: weapon.range,
  element: weapon.element ? ElementId[weapon.element as keyof typeof ElementId] : undefined,
  elementaryAffinity: weapon.elementaryAffinity ? ElementId[weapon.elementaryAffinity as keyof typeof ElementId] : undefined,
});

const head: Item[] = (inventoryData.head as ItemData[]).map(getItem);

const bust: Item[] = inventoryData.bust.map(getItem);

const oneHandWeapon: Weapon[] = inventoryData.oneHandWeapon.map(getWeapon);

const twoHands: Weapon[] = inventoryData.twoHands.map(getWeapon);

const oneHand: Item[] = inventoryData.oneHand.map(getItem);

const feet: Item[] = inventoryData.feet.map(getItem);

const fetish: Item[] = inventoryData.fetish.map(getItem);

const hand: (Item | Weapon)[] = [...oneHandWeapon, ...oneHand];
export { head, bust, hand, twoHands, feet, fetish };
