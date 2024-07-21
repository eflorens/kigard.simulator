interface Item {
  id: number;
  name: string;
  weight: number;
  strength?: number;
  dexterity?: number;
  intelligence?: number;
  vitality?: number;
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
}

const head: Item[] = [
  {
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
  }
];

export default { head };