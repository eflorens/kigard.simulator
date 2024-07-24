export enum Status {
  Stunned = 'Stunned',
  Poisoned = 'Poisoned',
  Burning = 'Burning',
  Frozen = 'Frozen',
  Bleeding = 'Bleeding',
  Necrosis = 'Necrosis',
}

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
}

export interface Modifier extends Attributes {
  description: string;
}

export const allEnchantments: Modifier[] = [{
  description: "+5% OBS",
  observation: 5,
}, {
  description: "+5% PRE",
  accuracy: 5,
}, {
  description: "+5% MM",
  magicAttack: 5,
}, {
  description: "+5% DIS",
  discretion: 5,
}, {
  description: "+5% ESQ",
  dodge: 5,
}, {
  description: "+5% DM",
  magicDefense: 5,
}, {
  description: "+25% PA",
  actionPointsBonus: 25,
}];

export const allSettings: Modifier[] = [{
  description: "+1 FOR",
  strength: 1,
}, {
  description: "+1 DEX",
  dexterity: 1,
}, {
  description: "+1 INT",
  intelligence: 1,
}, {
  description: "+1 CON",
  constitution: 1,
}, {
  description: "+1 CHA",
  charisma: 1,
}, {
  description: "+1 ESP",
  mind: 1,
}];

export interface Item extends Attributes {
  id: number;
  name: string;
  weight: number;
  doubleSetting?: boolean;
  status?: ItemStatus[];
  elementaryResistances?: {
    value: number;
    element: ElementId;
  }[];
}

export interface Weapon extends Item {
  usageCost: number;
  isRanged: boolean;
  element?: ElementId;
}

const head: Item[] = [{
  id: 19,
  name: 'Toque',
  weight: 1,
  armor: 1,
  magicResistance: 1,
}, {
  id: 285,
  name: 'Casque en bois',
  weight: 1,
  armor: 2,
}, {
  id: 166,
  name: 'Capuchon',
  weight: 1,
  magicResistance: 2,
}, {
  id: 7,
  name: 'Cabasset en cuivre',
  weight: 1,
  armor: 2,
}, {
  id: 59,
  name: 'Bandana',
  weight: 1,
  dodge: 10,
}, {
  id: 32,
  name: 'Casque',
  weight: 2,
  armor: 3,
}, {
  id: 329,
  name: 'Masque fantôme',
  weight: 2,
  armor: 2,
  discretion: 10,
}, {
  id: 11,
  name: 'Heaume',
  weight: 2,
  armor: 4,
}, {
  id: 319,
  name: 'Crâne rituel',
  weight: 2,
  magicDefense: 10,
  mind: 2,
}, {
  id: 25,
  name: 'Coiffe en soie',
  weight: 1,
  magicPower: 1,
  magicResistance: 3,
}, {
  id: 194,
  name: 'Casque terrifiant',
  weight: 3,
  armor: 3,
  strength: 1,
}, {
  id: 86,
  name: 'Casque astral',
  weight: 3,
  armor: 3,
  dexterity: 1,
}, {
  id: 271,
  name: 'Capuchon en soie',
  weight: 1,
  magicResistance: 4,
}, {
  id: 317,
  name: 'Capuche de rôdeur',
  weight: 1,
  discretion: 15,
  dexterity: 1,
}, {
  id: 146,
  name: 'Bandana en soie',
  weight: 1,
  dodge: 10,
  magicDefense: 10,
}, {
  id: 177,
  name: 'Diadème',
  weight: 1,
  intelligence: 1,
  mind: 1,
  charisma: 1,
  doubleSetting: true,
}, {
  id: 83,
  name: 'Chapeau du nomade',
  weight: 1,
  dodge: 5,
  magicDefense: 5,
  actionPointsBonus: 50,
}, {
  id: 137,
  name: 'Casque noble',
  weight: 2,
  armor: 3,
  intelligence: 1,
}, {
  id: 162,
  name: 'Cagoule de l\'ombre',
  weight: 1,
  dodge: 10,
  discretion: 10,
}, {
  id: 155,
  name: 'Cabasset à cornes',
  weight: 2,
  damage: 1,
  armor: 3,
}, {
  id: 121,
  name: 'Bonnet émeraude',
  weight: 1,
  magicResistance: 3,
  intelligence: 1,
}, {
  id: 233,
  name: 'Bassinet plume',
  weight: 2,
  armor: 3,
  accuracy: 5,
}, {
  id: 286,
  name: 'Barrette en or',
  weight: 1,
  magicDefense: 15,
  doubleSetting: true,
}];

const bust: Item[] = [{
  id: 55,
  name: 'Haillon',
  weight: 1,
  armor: 1,
  magicResistance: 1,
}, {
  id: 78,
  name: 'Plastron',
  weight: 3,
  armor: 4,
}, {
  id: 48,
  name: 'Armure en cuir',
  weight: 2,
  armor: 2,
  magicResistance: 2,
}, {
  id: 124,
  name: 'Veston',
  weight: 1,
  armor: 1,
  magicResistance: 1,
  discretion: 10,
}, {
  id: 18,
  name: 'Toge',
  weight: 1,
  magicResistance: 4,
}, {
  id: 92,
  name: 'Toge en soie',
  weight: 2,
  magicResistance: 6,
}, {
  id: 184,
  name: 'Pèlerine',
  weight: 2,
  dodge: 10,
  magicResistance: 10,
  discretion: 10,
}, {
  id: 198,
  name: 'Fourrures',
  weight: 2,
  armor: 2,
  magicResistance: 2,
  elementaryResistances: [{
    value: 10,
    element: ElementId.Fire,
  }, {
    value: 10,
    element: ElementId.Ice,
  }, {
    value: 10,
    element: ElementId.Thunder,
  }],
}, {
  id: 9,
  name: 'Cotte de mailles',
  weight: 4,
  armor: 6,
}, {
  id: 74,
  name: 'Brigandine',
  weight: 2,
  armor: 3,
  magicResistance: 3,
}, {
  id: 129,
  name: 'Tenue améthyste',
  weight: 2,
  magicPower: 2,
  magicResistance: 6
}, {
  id: 21,
  name: 'Pèlerine en soie',
  weight: 2,
  dodge: 15,
  magicDefense: 15,
  discretion: 10,
}, {
  id: 192,
  name: 'Plastron miroir',
  weight: 3,
  armor: 5,
  magicDefense: 15,
}, {
  id: 334,
  name: 'Manteau du nomade',
  weight: 3,
  dodge: 10,
  magicDefense: 10,
  actionPointsBonus: 100,
}, {
  id: 318,
  name: 'Manteau du rôdeur',
  weight: 2,
  dodge: 15,
  discretion: 15,
  dexterity: 2,
}, {
  id: 313,
  name: 'Harlequine',
  weight: 3,
  armor: 3,
  magicResistance: 3,
  magicAttack: 10,
}, {
  id: 232,
  name: 'Dérobade en soie',
  weight: 1,
  magicResistance: 5,
  magicAttack: 10,
}, {
  id: 81,
  name: 'Cuirasse',
  weight: 3,
  damage: 2,
  armor: 6,
}, {
  id: 236,
  name: 'Cotte de mailles en mithril',
  weight: 3,
  armor: 7,
  doubleSetting: true,
}, {
  id: 82,
  name: 'Armure de plates',
  weight: 3,
  armor: 8,
}, {
  id: 87,
  name: 'Armure astrale',
  weight: 3,
  armor: 6,
  dexterity: 2,
}, {
  id: 307,
  name: 'Tunique de l\'ombre',
  weight: 2,
  accuracy: 10,
  dodge: 15,
  discretion: 15,
}, {
  id: 197,
  name: 'Plastron terrifiant',
  weight: 3,
  armor: 6,
  strength: 2,
}, {
  id: 31,
  name: 'Plastron noble',
  weight: 3,
  armor: 6,
  intelligence: 2,
}, {
  id: 161,
  name: 'Kimono',
  weight: 2,
  armor: 3,
  magicResistance: 3,
  dodge: 10,
}, {
  id: 106,
  name: 'Ceinture de force',
  weight: 1,
  armor: 2,
  magicResistance: 2,
  dodge: 10,
  strength: 2,
}, {
  id: 111,
  name: 'Cape',
  weight: 1,
  dodge: 15,
  magicDefense: 15,
  charisma: 2,
}, {
  id: 191,
  name: 'Bliaut',
  weight: 2,
  damage: 2,
  dodge: 10,
  magicDefense: 10,
  discretion: 10,
}];

const oneHand: Weapon[] = [{
  id: 1,
  name: 'Epée courte',
  weight: 1,
  damage: 4,
  usageCost: 4,
  isRanged: false,
}, {
  id: 114,
  name: 'Lame',
  weight: 2,
  damage: 7,
  usageCost: 5,
  isRanged: false,
}];

const twoHands: Weapon[] = [{
  id: 108,
  name: 'Masse géante',
  weight: 5,
  damage: 8,
  status: [{
    value: 2,
    status: Status.Stunned,
  }],
  doubleSetting: true,
  usageCost: 5,
  isRanged: false,
}, {
  id: 55,
  name: 'Bâton de voyage',
  weight: 5,
  damage: 2,
  usageCost: 4,
  doubleSetting: true,
  actionPointsBonus: 100,
  isRanged: false,
}, {
  id: 244,
  name: 'Hache double',
  weight: 5,
  damage: 8,
  status: [{
    value: 2,
    status: Status.Bleeding,
  }],
  doubleSetting: true,
  usageCost: 5,
  isRanged: false,
}];

const feet: Item[] = [{
  id: 30,
  name: 'Jambières',
  weight: 2,
  armor: 2,
}, {
  id: 57,
  name: 'Souliers',
  weight: 1,
  magicResistance: 2,
}];

const fetish: Item[] = [{
  id: 181,
  name: 'Anneau',
  weight: 1,
  damage: 1,
}, {
  id: 212,
  name: 'Trèfle à quatre feuilles',
  weight: 1,
  actionPointsBonus: 50,
}];

export { head, bust, oneHand, twoHands, feet, fetish };