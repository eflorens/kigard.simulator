import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { allEnchantments, allSettings, bust, feet, fetish, hand, head, Item, Modifier, twoHands, Weapon } from '../../data/inventory';
import { MagicScrollId } from '../../data/talents';

interface ShareItem {
  id: number;
  enchantmentId?: number;
  settingsId?: number[];
}

export interface ShareInventory {
  head?: ShareItem;
  hands?: ShareItem;
  leftHand?: ShareItem;
  rightHand?: ShareItem;
  bust?: ShareItem;
  feet?: ShareItem;
  fetish?: ShareItem;
  magicScrolls?: {
    rightHand: number[],
    leftHand: number[],
  };
}

export interface Inventory<T extends Item> {
  enchantment?: Modifier;
  item?: T;
  settings: {
    first?: Modifier;
    second?: Modifier;
  };
}

export interface OneItemPerHand {
  leftHand?: Inventory<Weapon | Item>,
  rightHand?: Inventory<Weapon | Item>
}

export interface InventoryLocation {
  head?: Inventory<Item>;
  bust?: Inventory<Item>;
  hands?: Inventory<Weapon> | OneItemPerHand;
  feet?: Inventory<Item>;
  fetish?: Inventory<Item>;
}

interface InventoryState extends InventoryLocation {
  magicScrolls: {
    rightHand: { [index: number]: MagicScrollId },
    leftHand: { [index: number]: MagicScrollId },
  };
}

const initialState: InventoryState = {
  magicScrolls: {
    rightHand: [],
    leftHand: [],
  },
};

function computeSettingsOnItemChange<T extends Item>(current?: Inventory<T>, item?: T) {
  return !current?.settings || !current.settings.second || item?.doubleSetting
    ? current?.settings || {}
    : { first: current.settings.second, second: undefined };
}

function loadItem<T extends Item>(allItems: T[], shareItem?: ShareItem) {
  const enchantment = (shareItem?.enchantmentId && allEnchantments.find(e => e.id === shareItem.enchantmentId)) || undefined;
  const settings = shareItem?.settingsId?.map(id => allSettings.find(s => s.id === id)).filter(s => !!s) || [];
  const item = (shareItem && allItems.find(i => i.id === shareItem.id)) || undefined;

  return {
    enchantment,
    settings: {
      first: settings[0],
      second: settings[1],
    },
    item,
  };
}

const loadMagicScrolls = (hand?: number[]) => {
  return hand?.map((id, index) => ({ id, index })).reduce((previous, current) => {
    previous[current.index] =current.id;
    return previous;
  }, {} as { [index: number]: MagicScrollId }) || {};
}

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    load(state, action: PayloadAction<ShareInventory>) {
      state.head = loadItem(head, action.payload.head);
      state.bust = loadItem(bust, action.payload.bust);
      state.feet = loadItem(feet, action.payload.feet);
      state.fetish = loadItem(fetish, action.payload.fetish);
      if (!!action.payload.hands) {
        state.hands = loadItem(twoHands, action.payload.hands);
      }
      else {
        state.hands = {
          leftHand: loadItem(hand, action.payload.leftHand),
          rightHand: loadItem(hand, action.payload.rightHand),
        }
        state.magicScrolls = {
          rightHand: loadMagicScrolls(action.payload.magicScrolls?.rightHand),
          leftHand: loadMagicScrolls(action.payload.magicScrolls?.leftHand)
        };
      }
    },
    setMagicScrolls(state, action: PayloadAction<{ index: number, slot: "rightHand" | "leftHand", scroll: MagicScrollId }>) {
      const { index, scroll, slot } = action.payload;
      state.magicScrolls[slot][index] = scroll;
    },
    unsetMagicScrolls(state, action: PayloadAction<{ slot: "rightHand" | "leftHand", index: number }>) {
      const { index, slot } = action.payload;
      delete state.magicScrolls[slot][index];
    },
    setEnchantment(state, action: PayloadAction<{ slot: keyof InventoryLocation, enchantment?: Modifier }>) {
      const slot = action.payload.slot;
      const current = state[slot] as Inventory<Item>;

      state[slot] = {
        enchantment: action.payload.enchantment,
        settings: current?.settings || {},
        item: current?.item
      };
    },
    setRightHandEnchantment(state, action: PayloadAction<{ enchantment?: Modifier }>) {
      const current = state.hands as OneItemPerHand;

      state.hands = {
        rightHand: {
          enchantment: action.payload.enchantment,
          settings: current?.rightHand?.settings || {},
          item: current?.rightHand?.item
        },
        leftHand: current?.leftHand
      };
    },
    setLeftHandEnchantment(state, action: PayloadAction<{ enchantment?: Modifier }>) {
      const current = state.hands as OneItemPerHand;

      state.hands = {
        leftHand: {
          enchantment: action.payload.enchantment,
          settings: current?.leftHand?.settings || {},
          item: current?.leftHand?.item
        },
        rightHand: current?.rightHand
      };
    },
    setSettings(state, action: PayloadAction<{ slot: keyof InventoryLocation, settings: { first?: Modifier, second?: Modifier } }>) {
      const slot = action.payload.slot;
      const current = state[slot] as Inventory<Item>;

      state[slot] = {
        enchantment: current?.enchantment,
        settings: action.payload.settings,
        item: current?.item
      };
    },
    setRightHandSettings(state, action: PayloadAction<{ settings: { first?: Modifier, second?: Modifier } }>) {
      const current = state.hands as OneItemPerHand;

      state.hands = {
        rightHand: {
          enchantment: current?.rightHand?.enchantment,
          settings: action.payload.settings,
          item: current?.rightHand?.item
        },
        leftHand: current?.leftHand
      };
    },
    setLeftHandSettings(state, action: PayloadAction<{ settings: { first?: Modifier, second?: Modifier } }>) {
      const current = state.hands as OneItemPerHand;

      state.hands = {
        leftHand: {
          enchantment: current?.leftHand?.enchantment,
          settings: action.payload.settings,
          item: current?.leftHand?.item
        },
        rightHand: current?.rightHand
      };
    },
    equipItem(state, action: PayloadAction<{ slot: keyof InventoryLocation, item: Item }>) {
      const slot = action.payload.slot;
      const item = action.payload.item;
      const current = state[slot] as Inventory<Item>;

      state[action.payload.slot] = {
        enchantment: current?.enchantment,
        settings: computeSettingsOnItemChange(current, item),
        item: action.payload.item
      };
    },
    unequipItem(state, action: PayloadAction<keyof InventoryLocation>) {
      const slot = action.payload;
      const current = state[slot] as Inventory<Item>;

      state[slot] = {
        enchantment: current?.enchantment,
        settings: computeSettingsOnItemChange(current, undefined),
      };
    },
    equipTwoHands(state, action: PayloadAction<Weapon>) {
      const current = state.hands as Inventory<Weapon>;
      const weapon = action.payload;

      state.hands = {
        enchantment: current?.enchantment,
        settings: computeSettingsOnItemChange(current, weapon),
        item: weapon,
      };

      state.magicScrolls = {
        rightHand: [],
        leftHand: [],
      };
    },
    equipRightHand(state, action: PayloadAction<Weapon | Item>) {
      const current = state.hands as OneItemPerHand;
      state.hands = {
        leftHand: current?.leftHand,
        rightHand: {
          enchantment: current?.rightHand?.enchantment,
          settings: computeSettingsOnItemChange(current?.rightHand, action.payload),
          item: action.payload
        }
      };

      if (action.payload.magicalSpace) {
        const rightHand = Array.from(Array(action.payload.magicalSpace).keys())
          .map((_, index) => state.magicScrolls.rightHand[index]);
        state.magicScrolls = {
          rightHand,
          leftHand: state.magicScrolls.leftHand,
        };
      }
      else {
        state.magicScrolls = {
          rightHand: [],
          leftHand: state.magicScrolls.leftHand,
        };
      }
    },
    unequipRightHand(state) {
      state.hands = { ...state.hands, rightHand: undefined };
      state.magicScrolls = {
        rightHand: [],
        leftHand: state.magicScrolls.leftHand,
      };
    },
    equipLeftHand(state, action: PayloadAction<Weapon | Item>) {
      const current = state.hands as OneItemPerHand;
      state.hands = {
        rightHand: current?.rightHand,
        leftHand: {
          enchantment: current?.leftHand?.enchantment,
          settings: computeSettingsOnItemChange(current?.leftHand, action.payload),
          item: action.payload
        }
      };

      if (action.payload.magicalSpace) {
        const leftHand = Array.from(Array(action.payload.magicalSpace).keys())
          .map((_, index) => state.magicScrolls.leftHand[index]);
        state.magicScrolls = {
          leftHand,
          rightHand: state.magicScrolls.rightHand,
        };
      }
      else {
        state.magicScrolls = {
          leftHand: [],
          rightHand: state.magicScrolls.rightHand,
        };
      }
    },
    unequipLeftHand(state) {
      state.hands = { ...state.hands, leftHand: undefined };
      state.magicScrolls = {
        leftHand: [],
        rightHand: state.magicScrolls.rightHand,
      };
    },
  },
});

export const {
  load,
  setMagicScrolls,
  unsetMagicScrolls,
  setEnchantment,
  setRightHandEnchantment,
  setLeftHandEnchantment,
  setSettings,
  setRightHandSettings,
  setLeftHandSettings,
  equipItem,
  unequipItem,
  equipTwoHands,
  equipRightHand,
  unequipRightHand,
  equipLeftHand,
  unequipLeftHand
} = inventorySlice.actions;

export const selectInventory = (state: { inventory: InventoryState }) => state.inventory;

export default inventorySlice.reducer;