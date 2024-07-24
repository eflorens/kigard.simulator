import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item, Modifier, Weapon } from '../../data/inventory';

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

export interface InventoryState {
  head?: Inventory<Item>;
  bust?: Inventory<Item>;
  hands?: Inventory<Weapon> | OneItemPerHand;
  feet?: Inventory<Item>;
  fetish?: Inventory<Item>;
}

const initialState: InventoryState = {};

function computeSettingsOnItemChange<T extends Item>(current?: Inventory<T>, item?: T) {
  return !current?.settings || !current.settings.second || item?.doubleSetting
    ? current?.settings || {}
    : { first: current.settings.second, second: undefined };
}

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setEnchantment(state, action: PayloadAction<{ slot: keyof InventoryState, enchantment?: Modifier }>) {
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
    setSettings(state, action: PayloadAction<{ slot: keyof InventoryState, settings: { first?: Modifier, second?: Modifier} }>) {
      const slot = action.payload.slot;
      const current = state[slot] as Inventory<Item>;

      state[slot] = {
        enchantment: current?.enchantment,
        settings: action.payload.settings,
        item: current?.item
      };
    },
    setRightHandSettings(state, action: PayloadAction<{ settings: { first?: Modifier, second?: Modifier} }>) {
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
    setLeftHandSettings(state, action: PayloadAction<{ settings:{ first?: Modifier, second?: Modifier} }>) {
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
    equipItem(state, action: PayloadAction<{ slot: keyof InventoryState, item: Item }>) {
      const slot = action.payload.slot;
      const item = action.payload.item;
      const current = state[slot] as Inventory<Item>;

      state[action.payload.slot] = {
        enchantment: current?.enchantment,
        settings: computeSettingsOnItemChange(current, item),
        item: action.payload.item
      };
    },
    unequipItem(state, action: PayloadAction<keyof InventoryState>) {
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
    },
    unequipRightHand(state) {
      state.hands = { ...state.hands, rightHand: undefined };
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
    },
    unequipLeftHand(state) {
      state.hands = { ...state.hands, leftHand: undefined };
    },
  },
});

export const {
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