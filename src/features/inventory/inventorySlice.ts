import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { allEnchantments, allSettings, bust, feet, fetish, hand, head, Item, Modifier, twoHands, Weapon } from '../../data/inventory';
import { MagicScrollId } from "../../data/magicScrolls/MagicScrollId";

export interface ShareItem {
  id: number;
  enchantmentId?: number;
  settingsId?: number[];
}

export enum InventoryHands {
  TwoHands = "twoHands",
  RightHand = "rightHand",
  LeftHand = "leftHand"
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

export interface InventoryLocation {
  head?: Inventory<Item>;
  bust?: Inventory<Item>;
  hands?: { hand: InventoryHands, item?: Inventory<Weapon | Item> }[];
  feet?: Inventory<Item>;
  fetish?: Inventory<Item>;
}

interface InventoryState extends InventoryLocation {
  magicScrolls: {
    hand: InventoryHands,
    index: number,
    scroll: MagicScrollId
  }[];
}

const initialState: InventoryState = {
  magicScrolls: [],
};

function computeSettingsOnItemChange<T extends Item>(current?: Inventory<T>, item?: T) {
  return current?.settings?.second && !item?.doubleSetting
    ? { first: current.settings.second, second: undefined }
    : current?.settings || {}
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

const loadMagicScrolls = (hand: InventoryHands, scrolls?: number[]) => {
  return scrolls?.map((scroll, index) => ({ scroll, hand, index })) ?? [];
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
      if (!action.payload.hands) {
        state.hands = [
          { hand: InventoryHands.LeftHand, item: loadItem(hand, action.payload.leftHand) },
          { hand: InventoryHands.RightHand, item: loadItem(hand, action.payload.rightHand) },
        ]
        state.magicScrolls = [
          ...loadMagicScrolls(InventoryHands.RightHand, action.payload.magicScrolls?.rightHand),
          ...loadMagicScrolls(InventoryHands.LeftHand, action.payload.magicScrolls?.leftHand)
        ];
      }
      else {
        state.hands = [{ hand: InventoryHands.TwoHands, item: loadItem(twoHands, action.payload.hands) }];
      }
    },
    setMagicScrolls(state, action: PayloadAction<{ index: number, hand: InventoryHands, scroll?: MagicScrollId }>) {
      const { index, scroll, hand } = action.payload;
      state.magicScrolls = (scroll && [
        ...state.magicScrolls.filter(s => s.index !== index || s.hand !== hand),
        { index, scroll, hand }
      ]) || state.magicScrolls.filter(s => s.index !== index || s.hand !== hand);
    },
    setEnchantment(state, action: PayloadAction<{ slot: keyof Omit<InventoryLocation, "hands">, enchantment?: Modifier }>) {
      const slot = action.payload.slot;
      const current = state[slot] as Inventory<Item>;

      state[slot] = {
        enchantment: action.payload.enchantment,
        settings: current?.settings || {},
        item: current?.item
      };
    },
    setHandEnchantment(state, action: PayloadAction<{ hand: InventoryHands, enchantment?: Modifier }>) {
      const previous = state.hands?.find(h => h.hand === action.payload.hand);
      const handItem = {
        hand: action.payload.hand,
        item: {
          settings: previous?.item?.settings || {},
          item: previous?.item?.item,
          enchantment: action.payload.enchantment,
        }
      };

      state.hands = handItem.hand === InventoryHands.TwoHands ? [handItem] : [
        ...(state.hands?.filter(h => h.hand !== action.payload.hand && h.hand !== InventoryHands.TwoHands) || []),
        handItem
      ];
    },
    setSettings(state, action: PayloadAction<{ slot: keyof Omit<InventoryLocation, "hands">, settings: { first?: Modifier, second?: Modifier } }>) {
      const slot = action.payload.slot;
      const current = state[slot] as Inventory<Item>;

      state[slot] = {
        enchantment: current?.enchantment,
        settings: action.payload.settings,
        item: current?.item
      };
    },
    setHandSettings(state, action: PayloadAction<{hand: InventoryHands, settings: { first?: Modifier, second?: Modifier } }>) {
      const previous = state.hands?.find(h => h.hand === action.payload.hand);
      const handItem = {
        hand: action.payload.hand,
        item: {
          enchantment: previous?.item?.enchantment,
          item: previous?.item?.item,
          settings: action.payload.settings,
        }
      };

      state.hands = handItem.hand === InventoryHands.TwoHands ? [handItem] : [
        ...(state.hands?.filter(h => h.hand !== action.payload.hand && h.hand !== InventoryHands.TwoHands) || []),
        handItem
      ];
    },
    equipItem(state, action: PayloadAction<{ slot: keyof Omit<InventoryLocation, "hands">, item?: Item }>) {
      const slot = action.payload.slot;
      const item = action.payload.item;
      const current = state[slot] as Inventory<Item>;

      state[action.payload.slot] = {
        enchantment: current?.enchantment,
        settings: computeSettingsOnItemChange(current, item),
        item: action.payload.item
      };
    },
    equipHand(state, action: PayloadAction<{hand: InventoryHands, item?: Weapon | Item}>) {
      const previous = state.hands?.find(h => h.hand === action.payload.hand);
      const handItem = {
        hand: action.payload.hand,
        item: {
          enchantment: previous?.item?.enchantment,
          settings: computeSettingsOnItemChange(previous?.item, action.payload.item) || {},
          item: action.payload.item,
        }
      };

      state.hands = handItem.hand === InventoryHands.TwoHands ? [handItem] : [
        ...(state.hands?.filter(h => h.hand !== action.payload.hand && h.hand !== InventoryHands.TwoHands) || []),
        handItem
      ];

      state.magicScrolls = action.payload.hand === InventoryHands.TwoHands ? []
        : state.magicScrolls.filter(s => action.payload.item?.magicalSpace || s.hand !== action.payload.hand);
    },
  },
});

export const {
  load,
  setMagicScrolls,
  setEnchantment,
  setHandEnchantment,
  setSettings,
  setHandSettings,
  equipItem,
  equipHand,
} = inventorySlice.actions;

export const selectInventory = (state: { inventory: InventoryState }) => state.inventory;

export default inventorySlice.reducer;