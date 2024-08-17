export enum Status {
  Stunned = 1,
  Restrained = 2,
  Piercing = 3,
  Poisoned = 4,
  Inspiration = 5,
  Overload = 6,
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
  id: 58,
  name: 'Tunique en soie',
  weight: 2,
  dodge: 15,
  magicDefense: 15,
  intelligence: 2,
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

const oneHandWeapon: Weapon[] = [{
  id: 1,
  name: 'Epée courte',
  weight: 1,
  damage: 4,
  usageCost: 4,
}, {
  id: 114,
  name: 'Lame',
  weight: 2,
  damage: 7,
  usageCost: 5,
}, {
  id: 56,
  name: 'Glaive',
  weight: 2,
  damage: 4,
  usageCost: 4,
}, {
  id: 196,
  name: 'Langue démon',
  weight: 2,
  damage: 3,
  usageCost: 4,
  status: [{
    value: 1,
    status: Status.Necrosis,
  }],
}, {
  id: 119,
  name: 'Falchion',
  weight: 2,
  damage: 9,
  usageCost: 5,
}, {
  id: 204,
  name: 'Cimeterre',
  weight: 2,
  damage: 6,
  usageCost: 4,
}, {
  id: 328,
  name: 'Badelaire ardent',
  weight: 2,
  damage: 4,
  usageCost: 5,
  element: ElementId.Fire,
  status: [{
    value: 2,
    status: Status.Burning,
  }],
}, {
  id: 311,
  name: 'Main-gauche',
  weight: 2,
  damage: 3,
  usageCost: 4,
  dodge: 5,
}, {
  id: 252,
  name: 'Lame solaire',
  weight: 2,
  damage: 6,
  usageCost: 4,
  element: ElementId.Light,
  charisma: 2,
}, {
  id: 136,
  name: 'Epée noble',
  weight: 2,
  damage: 4,
  usageCost: 4,
  intelligence: 2,
}, {
  id: 100,
  name: 'Epée de spadassin',
  weight: 2,
  damage: 4,
  accuracy: 10,
  usageCost: 4,
}, {
  id: 27,
  name: 'Barong',
  weight: 2,
  damage: 5,
  usageCost: 5,
  status: [{
    value: 2,
    status: Status.Bleeding,
  }],
}, {
  id: 23,
  name: 'Sceptre',
  weight: 2,
  damage: 0,
  usageCost: 4,
  magicPower: 4,
}, {
  id: 290,
  name: 'Sceptre foudre',
  weight: 2,
  damage: 0,
  usageCost: 4,
  magicPower: 4,
  element: ElementId.Thunder,
  elementaryAffinity: ElementId.Thunder,
}, {
  id: 206,
  name: 'Sceptre en mithril',
  weight: 2,
  damage: 0,
  usageCost: 4,
  magicPower: 3,
  magicAttack: 10,
  doubleSetting: true,
}, {
  id: 250,
  name: 'Orbe démon',
  weight: 2,
  damage: 0,
  usageCost: 4,
  magicPower: 6,
  mind: -2,
  element: ElementId.Dark,
  elementaryAffinity: ElementId.Dark,
}, {
  id: 309,
  name: 'Orbe angélique',
  weight: 2,
  damage: 0,
  usageCost: 4,
  magicPower: 2,
  mind: 2,
  element: ElementId.Light,
  elementaryAffinity: ElementId.Light,
}, {
  id: 110,
  name: 'Crosse tellurique',
  weight: 2,
  damage: 0,
  usageCost: 4,
  magicPower: 5,
  constitution: 1,
}, {
  id: 76,
  name: 'Sceptre émeraude',
  weight: 2,
  damage: 0,
  usageCost: 4,
  magicPower: 4,
  magicAttack: 10,
}, {
  id: 207,
  name: 'Sceptre noble',
  weight: 2,
  damage: 5,
  usageCost: 5,
  magicPower: 4,
}, {
  id: 117,
  name: 'Sceptre lumière',
  weight: 2,
  damage: 0,
  usageCost: 4,
  magicPower: 2,
  observation: 10,
  element: ElementId.Light,
  elementaryAffinity: ElementId.Light,
}, {
  id: 205,
  name: 'Sceptre glace',
  weight: 2,
  damage: 0,
  usageCost: 4,
  magicPower: 4,
  element: ElementId.Ice,
  elementaryAffinity: ElementId.Ice,
}, {
  id: 289,
  name: 'Sceptre coeur',
  weight: 2,
  damage: 0,
  usageCost: 4,
  magicPower: 3,
  intelligence: 2,
  regeneration: 2,
}, {
  id: 34,
  name: 'Coutelas',
  weight: 1,
  usageCost: 4,
  damage: 3,
}, {
  id: 51,
  name: 'Dague',
  weight: 1,
  usageCost: 4,
  damage: 3,
  accuracy: 5,
}, {
  id: 47,
  name: 'Poignard',
  weight: 1,
  usageCost: 4,
  damage: 3,
  status: [{
    value: 1,
    status: Status.Piercing,
  }],
}, {
  id: 141,
  name: 'Kandjar',
  weight: 1,
  usageCost: 4,
  damage: 3,
  accuracy: 15,
}, {
  id: 53,
  name: 'Kukri',
  weight: 1,
  usageCost: 4,
  damage: 3,
  status: [{
    value: 1,
    status: Status.Bleeding,
  }],
}, {
  id: 296,
  name: 'Tonfa',
  weight: 2,
  usageCost: 4,
  armor: 1,
}, {
  id: 167,
  name: 'Griffes larges',
  weight: 2,
  usageCost: 4,
  damage: 4,
  armor: 1,
  dodge: 5,
}, {
  id: 80,
  name: 'Griffes',
  weight: 1,
  usageCost: 4,
  damage: 2,
  accuracy: 10,
  armor: 1,
  dodge: 5,
}, {
  id: 14,
  name: 'Gantelet',
  weight: 2,
  usageCost: 5,
  damage: 5,
  armor: 2,
  status: [{
    value: 1,
    status: Status.Stunned,
  }],
}, {
  id: 150,
  name: 'Fouet',
  weight: 2,
  usageCost: 4,
  range: { min: 1, max: 2 },
  damage: 2,
}, {
  id: 151,
  name: 'Magifouet',
  weight: 2,
  usageCost: 5,
  range: { min: 1, max: 2 },
  damage: 4,
  magicPower: 2,
}, {
  id: 157,
  name: 'Fouet-lame',
  weight: 2,
  usageCost: 5,
  range: { min: 1, max: 2 },
  damage: 6,
}, {
  id: 292,
  name: 'Hachoir',
  weight: 2,
  usageCost: 4,
  damage: 2,
}, {
  id: 148,
  name: 'Hache',
  weight: 2,
  usageCost: 5,
  damage: 3,
  status: [{
    value: 1,
    status: Status.Bleeding,
  }],
}, {
  id: 101,
  name: 'Tomahawk',
  weight: 2,
  usageCost: 5,
  damage: 5,
  status: [{
    value: 1,
    status: Status.Bleeding,
  }],
}, {
  id: 103,
  name: 'Hache de guerre',
  weight: 2,
  usageCost: 5,
  damage: 5,
  status: [{
    value: 2,
    status: Status.Bleeding,
  }],
}, {
  id: 62,
  name: 'Croc de fer',
  weight: 2,
  usageCost: 5,
  damage: 5,
  status: [{
    value: 1,
    status: Status.Piercing,
  }],
}, {
  id: 168,
  name: 'Trident',
  weight: 2,
  usageCost: 5,
  damage: 7,
  dodge: 10,
}, {
  id: 308,
  name: 'Lance',
  weight: 2,
  usageCost: 5,
  damage: 5,
  status: [{
    value: 2,
    status: Status.Piercing,
  }],
}, {
  id: 284,
  name: 'Gourdin clouté',
  weight: 2,
  usageCost: 5,
  damage: 3,
  status: [{
    value: 1,
    status: Status.Stunned,
  }],
}, {
  id: 125,
  name: 'Masse purificatrice',
  weight: 2,
  usageCost: 5,
  damage: 6,
  element: ElementId.Light,
  intelligence: 2,
}, {
  id: 49,
  name: 'Masse',
  weight: 2,
  usageCost: 4,
  damage: 3,
  status: [{
    value: 1,
    status: Status.Stunned,
  }],
}, {
  id: 60,
  name: 'Fléau d\'arme',
  weight: 2,
  usageCost: 5,
  damage: 5,
  status: [{
    value: 2,
    status: Status.Stunned,
  }],
}, {
  id: 54,
  name: 'Bâton de voyage',
  weight: 5,
  damage: 2,
  usageCost: 4,
  doubleSetting: true,
  enhancedEnchantment: true,
  actionPointsBonus: 100,
}];

const twoHands: Weapon[] = [{
  id: 39,
  name: 'Arc court',
  weight: 2,
  doubleSetting: true,
  enhancedEnchantment: true,
  usageCost: 4,
  range: { min: 2, max: 3 },
  damage: 4,
}, {
  id: 127,
  name: 'Arc de chasseur',
  weight: 2,
  doubleSetting: true,
  enhancedEnchantment: true,
  usageCost: 4,
  range: { min: 2, max: 3 },
  damage: 5,
}, {
  id: 79,
  name: 'Arc sylvain',
  weight: 2,
  doubleSetting: true,
  enhancedEnchantment: true,
  usageCost: 5,
  range: { min: 2, max: 3 },
  damage: 6,
  accuracy: 15,
}, {
  id: 17,
  name: 'Arc lourd composite',
  weight: 2,
  doubleSetting: true,
  enhancedEnchantment: true,
  usageCost: 5,
  range: { min: 2, max: 3 },
  damage: 9,
}, {
  id: 230,
  name: 'Arc de rôdeur',
  weight: 2,
  doubleSetting: true,
  enhancedEnchantment: true,
  usageCost: 4,
  range: { min: 2, max: 3 },
  damage: 4,
  dexterity: 2
}, {
  id: 163,
  name: 'Arc béni',
  weight: 2,
  doubleSetting: true,
  enhancedEnchantment: true,
  usageCost: 5,
  range: { min: 2, max: 3 },
  damage: 6,
  element: ElementId.Light,
  intelligence: 2,
}, {
  id: 109,
  name: 'Arc de guerre',
  weight: 2,
  doubleSetting: true,
  enhancedEnchantment: true,
  usageCost: 5,
  range: { min: 2, max: 3 },
  damage: 7,
  status: [{
    value: 1,
    status: Status.Bleeding,
  }],
}, {
  id: 294,
  name: 'Arc d\'élite',
  weight: 2,
  doubleSetting: true,
  enhancedEnchantment: true,
  usageCost: 5,
  range: { min: 2, max: 3 },
  damage: 7,
  status: [{
    value: 1,
    status: Status.Piercing,
  }],
}, {
  id: 327,
  name: 'Fusil',
  weight: 3,
  doubleSetting: true,
  enhancedEnchantment: true,
  usageCost: 5,
  range: { min: 2, max: 3 },
  damage: 7,
}, {
  id: 326,
  name: 'Carabine harpie',
  weight: 3,
  doubleSetting: true,
  enhancedEnchantment: true,
  usageCost: 5,
  range: { min: 2, max: 4 },
  damage: 4,
  accuracy: 10,
}, {
  id: 98,
  name: 'Arquebuse en bois',
  weight: 3,
  enhancedEnchantment: true,
  usageCost: 5,
  range: { min: 2, max: 3 },
  damage: 9,
}, {
  id: 108,
  name: 'Masse géante',
  weight: 5,
  damage: 8,
  status: [{
    value: 2,
    status: Status.Stunned,
  }],
  doubleSetting: true,
  enhancedEnchantment: true,
  usageCost: 5,
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
  enhancedEnchantment: true,
  usageCost: 5,
}, {
  id: 10,
  name: 'Epée large',
  weight: 4,
  doubleSetting: true,
  enhancedEnchantment: true,
  usageCost: 4,
  damage: 5,
}, {
  id: 246,
  name: 'Epée géante',
  weight: 4,
  doubleSetting: true,
  enhancedEnchantment: true,
  usageCost: 5,
  damage: 9,
}, {
  id: 245,
  name: 'Guillotineuse',
  weight: 5,
  doubleSetting: true,
  enhancedEnchantment: true,
  usageCost: 5,
  damage: 10,
  dodge: 10,
}, {
  id: 147,
  name: 'Flamberge',
  weight: 5,
  doubleSetting: true,
  enhancedEnchantment: true,
  usageCost: 5,
  damage: 12,
}, {
  id: 122,
  name: 'Claymore',
  weight: 5,
  doubleSetting: true,
  enhancedEnchantment: true,
  usageCost: 5,
  damage: 10,
  accuracy: 10,
}];

const oneHand: Item[] = [{
  id: 91,
  name: 'Targe',
  weight: 1,
  armor: 2,
}, {
  id: 2,
  name: 'Rondache',
  weight: 2,
  armor: 2,
}, {
  id: 28,
  name: 'Ecu en cuivre',
  weight: 2,
  armor: 4,
}, {
  id: 270,
  name: 'Bouclier dragon',
  weight: 2,
  armor: 3,
  magicalSpace: 1,
}, {
  id: 203,
  name: 'Pavois phénix',
  weight: 2,
  regeneration: 2,
  armor: 3,
}, {
  id: 29,
  name: 'Bouclier à pointes',
  weight: 2,
  damage: 1,
  armor: 3,
}, {
  id: 126,
  name: 'Bouclier sacré',
  weight: 3,
  armor: 3,
  intelligence: 1,
}, {
  id: 243,
  name: 'Bouclier ailé',
  weight: 2,
  armor: 2,
  dodge: 10,
}, {
  id: 256,
  name: 'Tome de cristal',
  weight: 2,
  magicDefense: 5,
  magicalSpace: 3,
}, {
  id: 257,
  name: 'Testament rituel',
  weight: 2,
  mind: 1,
  magicalSpace: 3,
}, {
  id: 226,
  name: 'Recueil sacré',
  weight: 2,
  armor: 1,
  magicalSpace: 3,
}, {
  id: 224,
  name: 'Ouvrage sylvestre',
  weight: 2,
  dexterity: 1,
  magicalSpace: 3,
}, {
  id: 227,
  name: 'Livre des morts',
  weight: 2,
  strength: 1,
  magicalSpace: 3,
}, {
  id: 275,
  name: 'Grimoire astral',
  weight: 2,
  magicAttack: 5,
  magicalSpace: 3,
}, {
  id: 24,
  name: 'Grimoire',
  weight: 2,
  intelligence: 1,
  magicalSpace: 3,
}, {
  id: 231,
  name: 'Brassard runique',
  weight: 2,
  armor: 1,
  magicAttack: 10,
  magicalSpace: 1,
}, {
  id: 102,
  name: 'Harpe elfique',
  weight: 1,
  magicAttack: 10,
  charisma: 2,
}, {
  id: 199,
  name: 'Flûte',
  weight: 1,
  dodge: 10,
  charisma: 2,
}, {
  id: 85,
  name: 'Conque de chasse',
  weight: 1,
  accuracy: 10,
  charisma: 2,
}, {
  id: 200,
  name: 'Cloche',
  weight: 1,
  magicDefense: 10,
  charisma: 2,
}, {
  id: 269,
  name: 'Castagnettes',
  weight: 1,
  actionPointsBonus: 50,
  charisma: 2,
}, {
  id: 190,
  name: 'Bracelet miroir',
  weight: 1,
  magicResistance: 2,
  magicDefense: 10,
}, {
  id: 337,
  name: 'Eventail noble',
  weight: 1,
  mind: 2,
  magicDefense: 10,
}, {
  id: 336,
  name: 'Eventail',
  weight: 1,
  mind: 2,
  dodge: 10,
}, {
  id: 312,
  name: 'Cercle coeur',
  weight: 1,
  regeneration: 2,
  magicResistance: 3,
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
}, {
  id: 22,
  name: 'Chaussons',
  weight: 1,
  discretion: 10,
}, {
  id: 8,
  name: 'Bottes',
  weight: 1,
  armor: 1,
  magicResistance: 1,
}, {
  id: 260,
  name: 'Jambières en cuivre',
  weight: 2,
  armor: 3,
}, {
  id: 156,
  name: 'Bottines',
  weight: 1,
  armor: 1,
  magicResistance: 1,
  dodge: 5,
}, {
  id: 229,
  name: 'Chaussons en soie',
  weight: 1,
  dodge: 10,
  magicDefense: 10,
}, {
  id: 261,
  name: 'Bottes runiques',
  weight: 1,
  armor: 2,
  magicDefense: 10,
}, {
  id: 335,
  name: 'Bottes du nomade',
  weight: 2,
  dodge: 5,
  magicDefense: 5,
  actionPointsBonus: 50,
}, {
  id: 77,
  name: 'Souliers en soie',
  weight: 1,
  magicPower: 1,
  magicResistance: 3,
}, {
  id: 95,
  name: 'Mocassins',
  weight: 1,
  magicResistance: 3,
  intelligence: 1,
}, {
  id: 239,
  name: 'Jambières en mithril',
  weight: 2,
  doubleSetting: true,
  armor: 3,
}, {
  id: 64,
  name: 'Brodequins',
  weight: 1,
  armor: 2,
  magicResistance: 2,
}, {
  id: 149,
  name: 'Bottines sylvaines',
  weight: 1,
  dodge: 10,
  discretion: 10,
}, {
  id: 138,
  name: 'Botillons ailés',
  weight: 1,
  armor: 2,
  dodge: 10,
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
}, {
  id: 228,
  name: 'Talisman du centaure',
  weight: 1,
  accuracy: 5,
  strength: 1,
}, {
  id: 115,
  name: 'Talisman de la dryade',
  weight: 1,
  accuracy: 5,
  dexterity: 1,
}, {
  id: 186,
  name: 'Perle',
  weight: 1,
  mind: 2,
}, {
  id: 118,
  name: 'Médaillon du vétéran',
  weight: 1,
  armor: 1,
  magicResistance: 1,
}, {
  id: 75,
  name: 'Bracelet',
  weight: 1,
  accuracy: 5,
  dodge: 5,
}, {
  id: 216,
  name: 'Boucle en or',
  weight: 1,
  accuracy: 5,
  magicAttack: 5,
}, {
  id: 20,
  name: 'Bague rubis',
  weight: 1,
  accuracy: 5,
  intelligence: 1,
}, {
  id: 185,
  name: 'Anneau corail',
  weight: 1,
  magicAttack: 5,
  intelligence: 1,
}, {
  id: 182,
  name: 'Anneau ailé',
  weight: 1,
  armor: 1,
  dodge: 5,
}, {
  id: 287,
  name: 'Amulette gelée',
  weight: 1,
  magicDefense: 5,
  magicResistance: 1,
}];

const hand: (Item | Weapon)[] = [...oneHandWeapon, ...oneHand];
export { head, bust, hand, twoHands, feet, fetish };