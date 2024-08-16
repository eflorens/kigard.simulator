import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import Character, { BreedId, Breeds, Profile } from '../../data/character';

export enum TalentType {
  Technique = 0,
  MagicScroll = 1,
}

export interface AttributeExperience {
  total: number;
  improvements: number;
  next: number;
  step: number;
}

export interface Improvements {
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
}

interface Experience {
  total: number;
  rank: number;
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
  talents: { [index: number]: { id: number, type: TalentType } };
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
  actionPointBonus: 0,
};

const createHuman = (): Character => {
  return {
    breed: Breeds.find(breed => breed.id === BreedId.HUMAN) || Breeds[0],
    profile: {
      ...baseProfile,
      actionPointBonus: 100,
    }
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
  talents: [],
  experience: {
    total: 0,
    rank: 1,
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

const computeRank = (xp: number) => {
  if (xp < 1000) {
    return 1;
  }
  if (xp < 3000) {
    return 2;
  }

  return 3;
}

export const evolutionSlice = createSlice({
  name: 'evolution',
  initialState,
  reducers: {
    setBreed: (state, action: PayloadAction<BreedId>) => {
      state.breed = action.payload;
      state.experience = { ...initialState.experience };
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
    improve: (state, action: PayloadAction<Partial<Improvements>>) => {
      (Object.keys(action.payload) as (keyof Improvements)[]).forEach((key) => {
        const improvements = computeImprovements(state.experience[key], action.payload[key] ?? 0);

        if (improvements !== 0) {
          state.character.profile[key] += improvements * state.experience[key].step;

          const xp = computeExperience(state.experience[key], improvements);
          state.experience[key].total += xp;
          state.experience[key].next += improvements * xpCost;
          state.experience[key].improvements += improvements;
          state.experience.total += xp;
          state.experience.rank = computeRank(state.experience.total);
        }
      });
    },
    setTalent(state, action: PayloadAction<{ index: number, talent?: { id: number, type: TalentType } }>) {
      if (!action.payload.talent) {
        delete state.talents[action.payload.index];
      } else {
        state.talents[action.payload.index] = { id: action.payload.talent.id, type: action.payload.talent.type };
      }
    },
    setTalents(state, action: PayloadAction<{ id: number, type: TalentType }[]>) {

      state.talents = action.payload.reduce((talents, talent, index) => {
        talents[index] = { id: talent.id, type: talent.type };
        return talents;
      }, {} as { [index: number]: { id: number, type: TalentType } });
    },
  },
});

export const {
  setBreed,
  improve,
  setTalent,
  setTalents,
} = evolutionSlice.actions;

export const selectEvolution = (state: RootState) => state.evolution;

export default evolutionSlice.reducer;
