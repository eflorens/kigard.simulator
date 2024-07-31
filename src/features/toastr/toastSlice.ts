import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import * as uuid from 'uuid';

interface Toast {
  id: string;
  title?: string;
  detail: string;
  status: 'success' | 'error';
}

export interface ToastState {
  toasts: Toast[]
}

const initialState: ToastState = {
  toasts: [],
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setToast: (state, action: PayloadAction<Omit<Toast, "id">>) => {
      state.toasts.push({ id: uuid.v4(), ...action.payload});
    },
    resetToast: (state, action: PayloadAction<Toast>) => {
      const toasts = state.toasts.filter(toast =>
        toast.id !== action.payload.id
      );

      state.toasts = toasts;
    },
    resetAllToast: (state) => {
      state.toasts = initialState.toasts;
    }
  },
});

export const { setToast, resetToast, resetAllToast } = toastSlice.actions;

export const selectToasts = (state: RootState) => state.toast.toasts;

export default toastSlice.reducer;
