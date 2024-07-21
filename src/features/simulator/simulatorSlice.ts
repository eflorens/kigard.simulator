import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import Character, { BreedId, createDwarf, createElf, createGnome, createHalfing, createHuman, createLycan, createOrc, createSaurian, createWildBeast } from '../../data/character';

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

export interface SimulatorState {
  character: Character;
  experience: Experience;
  breed: BreedId;
}

const xpCost = 50;

const initialState: SimulatorState = {
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

export const simulatorSlice = createSlice({
  name: 'simulator',
  initialState,
  reducers: {
    setBreed: (state, action: PayloadAction<BreedId>) => {
      state.breed = action.payload;
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
} = simulatorSlice.actions;

export const selectSimulator = (state: RootState) => state.simulator;

export default simulatorSlice.reducer;
