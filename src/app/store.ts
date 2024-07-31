import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import evolutionReducer from '../features/evolution/evolutionSlice';
import inventoryReducer from '../features/inventory/inventorySlice';
import toastReducer from '../features/toastr/toastSlice';
import saveReducer from '../features/save/saveSlice';

export const store = configureStore({
  reducer: {
    evolution: evolutionReducer,
    inventory: inventoryReducer,
    toast: toastReducer,
    save: saveReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
