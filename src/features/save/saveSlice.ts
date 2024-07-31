import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Improvements, selectEvolution } from "../evolution/evolutionSlice";
import { Inventory, OneItemPerHand, selectInventory, ShareInventory } from "../inventory/inventorySlice";
import { BreedId } from "../../data/character";
import { Item, Weapon } from "../../data/inventory";
import { RootState } from "../../app/store";

export enum Tabs {
  Evolution = 1,
  Inventory = 2,
  Summary = 3,
}

export interface Simulator {
  breed: BreedId,
  improvements: Improvements,
  inventory: ShareInventory,
}

interface Backup {
  name: string,
  simulator: Simulator
}

interface Store {
  simulators: Backup[];
}

interface SaveState {
  store: Store;
  activeTab: Tabs;
}

const loadStore = () => {
  const local = localStorage.getItem("store");
  return (local && JSON.parse(local) as Store) || { simulators: [] };
}
export const saveSlice = createSlice({
  name: "save",
  initialState: { store: loadStore(), activeTab: Tabs.Evolution } as SaveState,
  reducers: {
    setActiveTab(state, action: PayloadAction<Tabs>) {
      state.activeTab = action.payload;
    },
    saveBackup(state, action: PayloadAction<Backup>) {
      const store = {
        simulators: [...loadStore().simulators.filter(s => s.name !== action.payload.name), action.payload]
      };
      localStorage.setItem("store", JSON.stringify(store));
      state.store.simulators = store.simulators;
    },
    removeBackup(state, action: PayloadAction<string>) {
      const store = {
        simulators: [...loadStore().simulators.filter(s => s.name !== action.payload)]
      };
      localStorage.setItem("store", JSON.stringify(store));
      state.store.simulators = store.simulators;
    }
  }
});

export const selectCurrent = createSelector([selectEvolution, selectInventory], ({ breed, experience }, inventory) => {

  const share = ({ enchantment, item, settings }: Inventory<Item | Weapon>) => {
    if (!item) {
      return undefined;
    }

    return {
      id: item.id,
      enchantmentId: enchantment?.id,
      settingsId: [settings?.first?.id, settings?.second?.id].filter(s => !!s) as number[],
    };
  }

  const leftHand = (inventory.hands as OneItemPerHand)?.leftHand;
  const rightHand = (inventory.hands as OneItemPerHand)?.rightHand;
  const hands = !leftHand && !rightHand ? inventory.hands as Inventory<Weapon> : undefined;

  const simulator: Simulator = {
    breed: breed,
    improvements: {
      strength: experience.strength.improvements,
      dexterity: experience.dexterity.improvements,
      intelligence: experience.intelligence.improvements,
      constitution: experience.constitution.improvements,
      mind: experience.mind.improvements,
      charisma: experience.charisma.improvements,
      accuracy: experience.accuracy.improvements,
      dodge: experience.dodge.improvements,
      magicAttack: experience.magicAttack.improvements,
      magicDefense: experience.magicDefense.improvements,
      observation: experience.observation.improvements,
      discretion: experience.discretion.improvements,
    },
    inventory: {
      head: (inventory.head?.item && share(inventory.head)) || undefined,
      hands: (hands?.item && share(hands)) || undefined,
      leftHand: (leftHand?.item && share(leftHand)) || undefined,
      rightHand: (rightHand?.item && share(rightHand)) || undefined,
      bust: (inventory?.bust && share(inventory.bust)) || undefined,
      feet: (inventory?.feet && share(inventory.feet)) || undefined,
      fetish: (inventory?.fetish && share(inventory.fetish)) || undefined,
      magicScrolls: {
        rightHand: Object.entries(inventory?.magicScrolls.rightHand)
          .map((scroll) => scroll[1]?.id)
          .filter(scroll => !!scroll),
        leftHand: Object.entries(inventory?.magicScrolls.leftHand)
          .map((scroll) => scroll[1]?.id)
          .filter(scroll => !!scroll),
      }
    }
  };

  return simulator;
});

export const {
  setActiveTab,
  saveBackup,
  removeBackup,
} = saveSlice.actions;

export const selectStore = (state: RootState) => state.save.store;
export const selectTab = (state: RootState) => state.save.activeTab;

export default saveSlice.reducer;