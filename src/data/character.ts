export enum BreedId {
  HUMAN = 1,
  ELF = 2,
  DWARF = 3,
  ORC = 4,
  GNOME = 5,
  HALFING = 6,
  LYCAN = 7,
  SAURIAN = 8,
  WILDBEAST = 9,
}

export enum GiftId {
  ADAPTATION = 1,
  MUTUALAID = 2,
  STRENGTH = 3,
  SAVAGERY = 4,
  SYMBIOSIS = 5,
  TRANSFORMATION = 6,
  INTELLIGENCE = 7,
  DODGE = 8,
  INGENUITY = 9,
  ARMOR = 10,
  REGENERATION = 11,
  DREAMINESS = 12,
  DEXTERITY = 13,
  PRECISION = 14,
  MAGICMASTERY = 15,
  EXCELLENCE = 16,
  MAGICDEFENSE = 17,
  CAUTION = 18,
  DAMAGE = 19,
  BRAVERY = 20,
  CONSTITUTION = 21,
  ENDURANCE = 22,
}

interface Gift {
  id: GiftId;
  label: string;
  description: string;
}

export const Gifts: Gift[] = [
  {
    id: GiftId.ADAPTATION,
    label: 'Adaptation',
    description: '+1 PA /tour',
  }, {
    id: GiftId.MUTUALAID,
    label: 'Entraide',
    description: '+1PA reçu ou donné lors des soutiens',
  }, {
    id: GiftId.STRENGTH,
    label: 'Force',
    description: '+2 FOR',
  }, {
    id: GiftId.SAVAGERY,
    label: 'Sauvagerie',
    description: 'donne +1DGT et +1MAG pour chaque tranche de 20 PV manquants',
  }, {
    id: GiftId.SYMBIOSIS,
    label: 'Symbiose',
    description: '+5% Pré et MM par personnage lié à 2 cases',
  }, {
    id: GiftId.TRANSFORMATION,
    label: 'Transformation',
    description: '+1D6 PA tous les 4 tours',
  }, {
    id: GiftId.INTELLIGENCE,
    label: 'Intelligence',
    description: '+2 INT',
  }, {
    id: GiftId.DODGE,
    label: 'Esquive',
    description: '+5% ESQ',
  }, {
    id: GiftId.INGENUITY,
    label: 'Ingéniosité',
    description: '+1 PM lors de la première méditation',
  }, {
    id: GiftId.ARMOR,
    label: 'Armure',
    description: '+2 Armure',
  }, {
    id: GiftId.REGENERATION,
    label: 'Régénération',
    description: 'Constitution / 5 PV récupérés à l\'activation',
  }, {
    id: GiftId.DREAMINESS,
    label: 'Onirisme',
    description: 'Effet de Régénération triplé sur une source de mana',
  }, {
    id: GiftId.DEXTERITY,
    label: 'Dextérité',
    description: '+2 Dextérité',
  }, {
    id: GiftId.PRECISION,
    label: 'Précision',
    description: '+5% Précision',
  }, {
    id: GiftId.MAGICMASTERY,
    label: 'Maîtrise Magique',
    description: '+5% Maîtrise magique',
  }, {
    id: GiftId.EXCELLENCE,
    label: 'Excellence',
    description: '+10% au score lors d\'une action avec Avantage',
  }, {
    id: GiftId.MAGICDEFENSE,
    label: 'Défense Magique',
    description: '+5% Défense magique',
  }, {
    id: GiftId.CAUTION,
    label: 'Prudence',
    description: 'Gagne Exalté(1) si pas d\'attaque reçue au tour précédent',
  }, {
    id: GiftId.DAMAGE,
    label: 'Dégâts',
    description: '+2 Dégâts (physique)',
  }, {
    id: GiftId.BRAVERY,
    label: 'Bravoure',
    description: 'Après une attaque effectuée ou reçue, gagne Inspiration(1)',
  }, {
    id: GiftId.CONSTITUTION,
    label: 'Constitution',
    description: '+2 Constitution',
  }, {
    id: GiftId.ENDURANCE,
    label: 'Endurance',
    description: 'Agonisant, ne subit pas le malus de -1 dé d\'action',
  }
];

interface Breed {
  id: BreedId;
  label: string;
  gifts: GiftId[];
}

export const Breeds: Breed[] = [
  {
    id: BreedId.HUMAN,
    label: 'Humain',
    gifts: [
      GiftId.ADAPTATION,
      GiftId.MUTUALAID,
    ],
  }, {
    id: BreedId.ELF,
    label: 'Elfe',
    gifts: [
      GiftId.DEXTERITY,
      GiftId.PRECISION,
      GiftId.MAGICMASTERY,
      GiftId.EXCELLENCE,
    ],
  }, {
    id: BreedId.DWARF,
    label: 'Nain',
    gifts: [
      GiftId.CONSTITUTION,
      GiftId.MAGICDEFENSE,
      GiftId.ENDURANCE,
    ],
  }, {
    id: BreedId.ORC,
    label: 'Orc',
    gifts: [
      GiftId.STRENGTH,
      GiftId.SAVAGERY,
    ],
  }, {
    id: BreedId.GNOME,
    label: 'Gnome',
    gifts: [
      GiftId.INTELLIGENCE,
      GiftId.DODGE,
      GiftId.INGENUITY,
    ],
  }, {
    id: BreedId.HALFING,
    label: 'Halfelin',
    gifts: [
      GiftId.DODGE,
      GiftId.MAGICDEFENSE,
      GiftId.CAUTION,
    ],
  }, {
    id: BreedId.LYCAN,
    label: 'Lycan',
    gifts: [
      GiftId.SYMBIOSIS,
      GiftId.TRANSFORMATION,
    ],
  }, {
    id: BreedId.SAURIAN,
    label: 'Saurien',
    gifts: [
      GiftId.ARMOR,
      GiftId.REGENERATION,
      GiftId.DREAMINESS,
    ],
  }, {
    id: BreedId.WILDBEAST,
    label: 'Fauve',
    gifts: [
      GiftId.DAMAGE,
      GiftId.BRAVERY,
    ],
  }
];

interface Profile {
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
  magicRecovery: number;
}

export default interface Character {
  breed: Breed;
  profile: Profile;
}

const baseProfile: Profile = {
  strength: 10,
  dexterity: 10,
  intelligence: 10,
  constitution: 10,
  mind: 10,
  charisma: 10,
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
  magicRecovery: 0,
};

export const createHuman = (): Character => {
  return {
    breed: Breeds.find(breed => breed.id === BreedId.HUMAN) || Breeds[0],
    profile: baseProfile
  };
}

export const createElf = (): Character => {
  return {
    breed: Breeds.find(breed => breed.id === BreedId.ELF) || Breeds[0],
    profile: {
      ...baseProfile,
      dexterity: baseProfile.dexterity + 2,
      accuracy: baseProfile.accuracy + 5,
      magicAttack: baseProfile.magicAttack + 5,
    }
  };
}

export const createOrc = (): Character => {
  return {
    breed: Breeds.find(breed => breed.id === BreedId.ORC) || Breeds[0],
    profile: {
      ...baseProfile,
      strength: baseProfile.strength + 2,
    }
  };
}

export const createDwarf = (): Character => {
  return {
    breed: Breeds.find(breed => breed.id === BreedId.DWARF) || Breeds[0],
    profile: {
      ...baseProfile,
      constitution: baseProfile.constitution + 2,
      magicDefense: baseProfile.magicDefense + 5,
    }
  };
}

export const createGnome = (): Character => {
  return {
    breed: Breeds.find(breed => breed.id === BreedId.GNOME) || Breeds[0],
    profile: {
      ...baseProfile,
      intelligence: baseProfile.intelligence + 2,
      dodge: baseProfile.dodge + 5,
      magicRecovery: baseProfile.magicRecovery + 1,
    }
  };
}

export const createHalfing = (): Character => {
  return {
    breed: Breeds.find(breed => breed.id === BreedId.HALFING) || Breeds[0],
    profile: {
      ...baseProfile,
      dodge: baseProfile.dodge + 5,
      magicDefense: baseProfile.magicDefense + 5,
    }
  };
}

export const createLycan = (): Character => {
  return {
    breed: Breeds.find(breed => breed.id === BreedId.LYCAN) || Breeds[0],
    profile: baseProfile
  };
}

export const createSaurian = (): Character => {
  return {
    breed: Breeds.find(breed => breed.id === BreedId.SAURIAN) || Breeds[0],
    profile: {
      ...baseProfile,
      armor: baseProfile.armor + 2,
    }
  };
}

export const createWildBeast = (): Character => {
  return {
    breed: Breeds.find(breed => breed.id === BreedId.WILDBEAST) || Breeds[0],
    profile: {
      ...baseProfile,
      damage: baseProfile.damage + 2,
    }
  };
}
