import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Improvements, selectEvolution, TalentType } from "../evolution/evolutionSlice";
import { Inventory, InventoryHands, selectInventory, ShareInventory, ShareItem } from "../inventory/inventorySlice";
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
  talents: { id: number, type: TalentType }[];
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

export const compress = (simulator: Simulator) => {
  const improvements = compressImprovements(simulator.improvements);
  const inventory = compressInventory(simulator.inventory);
  const talents = compressTalents(simulator.talents);
  return `${simulator.breed}|${improvements}|${inventory}|${talents}`;
}

export const decompress = (compressed: string): Simulator => {
  const [breed, improvements, inventory, talents] = compressed.split("|");
  console.log(compressed);
  console.log({ breed, improvements, inventory, talents });
  return {
    breed: Number(breed) as BreedId,
    improvements: decompressImprovements(improvements),
    inventory: decompressInventory(inventory),
    talents: decompressTalents(talents),
  };
}

const compressImprovements = (improvements: Improvements) => {
  return `${improvements.strength},${improvements.dexterity},${improvements.intelligence},${improvements.constitution},${improvements.mind},${improvements.charisma},${improvements.accuracy},${improvements.dodge},${improvements.magicAttack},${improvements.magicDefense},${improvements.observation},${improvements.discretion}`;
}

const decompressImprovements = (compressed: string): Improvements => {
  const [strength, dexterity, intelligence, constitution, mind, charisma, accuracy, dodge, magicAttack, magicDefense, observation, discretion] = compressed.split(",").map(Number);
  return { strength, dexterity, intelligence, constitution, mind, charisma, accuracy, dodge, magicAttack, magicDefense, observation, discretion };
}

const compressInventory = (inventory: ShareInventory) => {
  return `${compressItem(inventory.head)},${compressItem(inventory.hands)},${compressItem(inventory.leftHand)},${compressItem(inventory.rightHand)},${compressItem(inventory.bust)},${compressItem(inventory.feet)},${compressItem(inventory.fetish)},${inventory.magicScrolls?.rightHand.join("&")},${inventory.magicScrolls?.leftHand.join("&")}`;
}

const decompressInventory = (compressed: string): ShareInventory => {
  const [head, hands, leftHand, rightHand, bust, feet, fetish, rightHandScrolls, leftHandScrolls] = compressed.split(",");
  return {
    head: decompressItem(head),
    hands: decompressItem(hands),
    leftHand: decompressItem(leftHand),
    rightHand: decompressItem(rightHand),
    bust: decompressItem(bust),
    feet: decompressItem(feet),
    fetish: decompressItem(fetish),
    magicScrolls: {
      rightHand: rightHandScrolls?.split("&").map(Number),
      leftHand: leftHandScrolls?.split("&").map(Number),
    }
  };
}

const compressItem = (item?: ShareItem) => {
  return (item && `${item.id}&${item.enchantmentId}&${item.settingsId?.join("$")}`) ?? "";
}

const decompressItem = (compressed?: string): ShareItem | undefined => {
  if (!compressed) {
    return undefined;
  }

  const [id, enchantmentId, settings] = compressed.split("&");
  return {
    id: Number(id),
    enchantmentId: Number(enchantmentId),
    settingsId: settings.split("$").map(Number)
  };
}

const compressTalents = (talents: { id: number, type: TalentType }[]) => {
  return talents.map(talent => `${talent.id}&${talent.type}`).join(",");
}

const decompressTalents = (compressed: string): { id: number, type: TalentType }[] => {
  return compressed.split(",").map(talent => {
    const [id, type] = talent.split("&");
    return { id: Number(id), type: Number(type) as TalentType };
  });
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

export const selectCurrent = createSelector([selectEvolution, selectInventory], ({ breed, experience, talents }, inventory) => {

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

  const leftHand = inventory.hands?.find(hand => hand.hand === InventoryHands.LeftHand)?.item;
  const rightHand = inventory.hands?.find(hand => hand.hand === InventoryHands.RightHand)?.item;
  const hands = inventory.hands?.find(hand => hand.hand === InventoryHands.TwoHands)?.item;

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
        rightHand: inventory?.magicScrolls.filter(scroll => scroll.hand === InventoryHands.RightHand)
          .map((scroll) => scroll.scroll)
          .filter(scroll => !!scroll),
        leftHand: inventory?.magicScrolls.filter(scroll => scroll.hand === InventoryHands.LeftHand)
          .map((scroll) => scroll.scroll)
          .filter(scroll => !!scroll),
      }
    },
    talents: Object.entries(talents).map(talent => talent[1]).filter(talent => !!talent),
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
