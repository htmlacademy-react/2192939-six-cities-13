import { AppProcess } from '../state';
import { NameSpace } from './../../settings';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AppProcess = {
  error: null,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  },
});

export const { setError } = appProcess.actions;
