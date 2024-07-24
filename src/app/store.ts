import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import evolutionReducer from '../features/evolution/evolutionSlice';
import inventoryReducer from '../features/inventory/inventorySlice';

export const store = configureStore({
  reducer: {
    evolution: evolutionReducer,
    inventory: inventoryReducer,
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
