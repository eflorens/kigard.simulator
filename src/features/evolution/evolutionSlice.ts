import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import Character, { BreedId, Breeds, Profile } from '../../data/character';

export interface AttributeExperience {
  total: number;
  improvements: number;
  next: number;
  step: number;
}

interface Experience {
  total: number;
  strength: AttributeExperience;
  dexterity: AttributeExperience;
  intelligence: AttributeExperience;
  constitution: AttributeExperience;
  mind: AttributeExperience;
  charisma: AttributeExperience;
  accuracy: AttributeExperience;
  dodge: AttributeExperience;
  magicAttack: AttributeExperience;
  magicDefense: AttributeExperience;
  observation: AttributeExperience;
  discretion: AttributeExperience;
}

export interface EvolutionState {
  character: Character;
  experience: Experience;
  breed: BreedId;
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
  magicRecovery: 1,
};

const createHuman = (): Character => {
  return {
    breed: Breeds.find(breed => breed.id === BreedId.HUMAN) || Breeds[0],
    profile: baseProfile
  };
}

const createElf = (): Character => {
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

const createOrc = (): Character => {
  return {
    breed: Breeds.find(breed => breed.id === BreedId.ORC) || Breeds[0],
    profile: {
      ...baseProfile,
      strength: baseProfile.strength + 2,
    }
  };
}

const createDwarf = (): Character => {
  return {
    breed: Breeds.find(breed => breed.id === BreedId.DWARF) || Breeds[0],
    profile: {
      ...baseProfile,
      constitution: baseProfile.constitution + 2,
      magicDefense: baseProfile.magicDefense + 5,
    }
  };
}

const createGnome = (): Character => {
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

const createHalfing = (): Character => {
  return {
    breed: Breeds.find(breed => breed.id === BreedId.HALFING) || Breeds[0],
    profile: {
      ...baseProfile,
      dodge: baseProfile.dodge + 5,
      magicDefense: baseProfile.magicDefense + 5,
    }
  };
}

const createLycan = (): Character => {
  return {
    breed: Breeds.find(breed => breed.id === BreedId.LYCAN) || Breeds[0],
    profile: baseProfile
  };
}

const createSaurian = (): Character => {
  return {
    breed: Breeds.find(breed => breed.id === BreedId.SAURIAN) || Breeds[0],
    profile: {
      ...baseProfile,
      armor: baseProfile.armor + 2,
    }
  };
}

const createWildBeast = (): Character => {
  return {
    breed: Breeds.find(breed => breed.id === BreedId.WILDBEAST) || Breeds[0],
    profile: {
      ...baseProfile,
      damage: baseProfile.damage + 2,
    }
  };
}

const xpCost = 50;

const initialState: EvolutionState = {
  character: createHuman(),
  breed: BreedId.HUMAN,
  experience: {
    total: 0,
    strength: {
      total: 0,
      next: xpCost,
      step: 1,
      improvements: 0,
    },
    dexterity: {
      total: 0,
      next: xpCost,
      step: 1,
      improvements: 0,
    },
    intelligence: {
      total: 0,
      next: xpCost,
      step: 1,
      improvements: 0,
    },
    constitution: {
      total: 0,
      next: xpCost,
      step: 1,
      improvements: 0,
    },
    mind: {
      total: 0,
      next: xpCost,
      step: 1,
      improvements: 0,
    },
    charisma: {
      total: 0,
      next: xpCost,
      step: 1,
      improvements: 0,
    },
    accuracy: {
      total: 0,
      next: xpCost,
      step: 5,
      improvements: 0,
    },
    dodge: {
      total: 0,
      next: xpCost,
      step: 5,
      improvements: 0,
    },
    magicAttack: {
      total: 0,
      next: xpCost,
      step: 5,
      improvements: 0,
    },
    magicDefense: {
      total: 0,
      next: xpCost,
      step: 5,
      improvements: 0,
    },
    observation: {
      total: 0,
      next: xpCost,
      step: 5,
      improvements: 0,
    },
    discretion: {
      total: 0,
      next: xpCost,
      step: 5,
      improvements: 0,
    },
  }
};

const computeExperience = (xp: AttributeExperience, nbImprovements: number) => {
  return ((xp.improvements + nbImprovements) * (xp.improvements + nbImprovements + 1) / 2) * xpCost - xp.total;
}

const computeImprovements = (current: AttributeExperience, nbImprovements: number) => {
  return Math.min(10, Math.max(0, current.improvements + nbImprovements)) - current.improvements;
}

export const evolutionSlice = createSlice({
  name: 'evolution',
  initialState,
  reducers: {
    setBreed: (state, action: PayloadAction<BreedId>) => {
      state.breed = action.payload;
      state.experience = { ...initialState.experience};
      switch (action.payload) {
        case BreedId.ELF:
          state.character = createElf();
          break;
        case BreedId.DWARF:
          state.character = createDwarf();
          break;
        case BreedId.ORC:
          state.character = createOrc();
          break;
        case BreedId.GNOME:
          state.character = createGnome();
          break;
        case BreedId.HALFING:
          state.character = createHalfing();
          break;
        case BreedId.LYCAN:
          state.character = createLycan();
          break;
        case BreedId.SAURIAN:
          state.character = createSaurian();
          break;
        case BreedId.WILDBEAST:
          state.character = createWildBeast();
          break;

        case BreedId.HUMAN:
        default:
          state.character = createHuman();
          break;
      }
    },
    addStrength: (state, action: PayloadAction<number>) => {
      const improvements = computeImprovements(state.experience.strength, action.payload);
      

      if (improvements !== 0) {
        state.character.profile.strength += improvements * state.experience.strength.step;

        const xp = computeExperience(state.experience.strength, improvements);
        state.experience.strength.total += xp;
        state.experience.strength.next += improvements * xpCost;
        state.experience.strength.improvements += improvements;
        state.experience.total += xp;
      }
    },
    addDexterity: (state, action: PayloadAction<number>) => {
      const improvements = computeImprovements(state.experience.dexterity, action.payload);

      if (improvements !== 0) {
        state.character.profile.dexterity += improvements * state.experience.dexterity.step;

        const xp = computeExperience(state.experience.dexterity, improvements);
        state.experience.dexterity.total += xp;
        state.experience.dexterity.next += improvements * xpCost;
        state.experience.dexterity.improvements += improvements;
        state.experience.total += xp;
      }
    },
    addIntelligence: (state, action: PayloadAction<number>) => {
      const improvements = computeImprovements(state.experience.intelligence, action.payload);

      if (improvements !== 0) {
        state.character.profile.intelligence += improvements * state.experience.intelligence.step;

        const xp = computeExperience(state.experience.intelligence, improvements);
        state.experience.intelligence.total += xp;
        state.experience.intelligence.next += improvements * xpCost;
        state.experience.intelligence.improvements += improvements;
        state.experience.total += xp;
      }
    },
    addConsitution: (state, action: PayloadAction<number>) => {
      const improvements = computeImprovements(state.experience.constitution, action.payload);

      if (improvements !== 0) {
        state.character.profile.constitution += improvements * state.experience.constitution.step;

        const xp = computeExperience(state.experience.constitution, improvements);
        state.experience.constitution.total += xp;
        state.experience.constitution.next += improvements * xpCost;
        state.experience.constitution.improvements += improvements;
        state.experience.total += xp;
      }
    },
    addMind: (state, action: PayloadAction<number>) => {
      const improvements = computeImprovements(state.experience.mind, action.payload);

      if (improvements !== 0) {
        state.character.profile.mind += improvements * state.experience.mind.step;

        const xp = computeExperience(state.experience.mind, improvements);
        state.experience.mind.total += xp;
        state.experience.mind.next += improvements * xpCost;
        state.experience.mind.improvements += improvements;
        state.experience.total += xp;
      }
    },
    addCharisma: (state, action: PayloadAction<number>) => {
      const improvements = computeImprovements(state.experience.charisma, action.payload);

      if (improvements !== 0) {
        state.character.profile.charisma += improvements * state.experience.charisma.step;

        const xp = computeExperience(state.experience.charisma, improvements);
        state.experience.charisma.total += xp;
        state.experience.charisma.next += improvements * xpCost;
        state.experience.charisma.improvements += improvements;
        state.experience.total += xp;
      }
    },
    addAccuracy: (state, action: PayloadAction<number>) => {
      const improvements = computeImprovements(state.experience.accuracy, action.payload);

      if (improvements !== 0) {
        state.character.profile.accuracy += improvements * state.experience.accuracy.step;

        const xp = computeExperience(state.experience.accuracy, improvements);
        state.experience.accuracy.total += xp;
        state.experience.accuracy.next += improvements * xpCost;
        state.experience.accuracy.improvements += improvements;
        state.experience.total += xp;
      }
    },
    addDodge: (state, action: PayloadAction<number>) => {
      const improvements = computeImprovements(state.experience.dodge, action.payload);

      if (improvements !== 0) {
        state.character.profile.dodge += improvements * state.experience.dodge.step;

        const xp = computeExperience(state.experience.dodge, improvements);
        state.experience.dodge.total += xp;
        state.experience.dodge.next += improvements * xpCost;
        state.experience.dodge.improvements += improvements;
        state.experience.total += xp;
      }
    },
    addMagicAttack: (state, action: PayloadAction<number>) => {
      const improvements = computeImprovements(state.experience.magicAttack, action.payload);

      if (improvements !== 0) {
        state.character.profile.magicAttack += improvements * state.experience.magicAttack.step;

        const xp = computeExperience(state.experience.magicAttack, improvements);
        state.experience.magicAttack.total += xp;
        state.experience.magicAttack.next += improvements * xpCost;
        state.experience.magicAttack.improvements += improvements;
        state.experience.total += xp;
      }
    },
    addMagicDefense: (state, action: PayloadAction<number>) => {
      const improvements = computeImprovements(state.experience.magicDefense, action.payload);

      if (improvements !== 0) {
        state.character.profile.magicDefense += improvements * state.experience.magicDefense.step;

        const xp = computeExperience(state.experience.magicDefense, improvements);
        state.experience.magicDefense.total += xp;
        state.experience.magicDefense.next += improvements * xpCost;
        state.experience.magicDefense.improvements += improvements;
        state.experience.total += xp;
      }
    },
    addObservation: (state, action: PayloadAction<number>) => {
      const improvements = computeImprovements(state.experience.observation, action.payload);

      if (improvements !== 0) {
        state.character.profile.observation += improvements * state.experience.observation.step;

        const xp = computeExperience(state.experience.observation, improvements);
        state.experience.observation.total += xp;
        state.experience.observation.next += improvements * xpCost;
        state.experience.observation.improvements += improvements;
        state.experience.total += xp;
      }
    },
    addDiscretion: (state, action: PayloadAction<number>) => {
      const improvements = computeImprovements(state.experience.discretion, action.payload);

      if (improvements !== 0) {
        state.character.profile.discretion += improvements * state.experience.discretion.step;

        const xp = computeExperience(state.experience.discretion, improvements);
        state.experience.discretion.total += xp;
        state.experience.discretion.next += improvements * xpCost;
        state.experience.discretion.improvements += improvements;
        state.experience.total += xp;
      }
    },
  },
});

export const {
  setBreed,
  addStrength,
  addDexterity,
  addIntelligence,
  addConsitution,
  addMind,
  addCharisma,
  addAccuracy,
  addDodge,
  addMagicAttack,
  addMagicDefense,
  addObservation,
  addDiscretion,
} = evolutionSlice.actions;

export const selectEvolution = (state: RootState) => state.evolution;

export default evolutionSlice.reducer;
