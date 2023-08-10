import { NameSpace } from './../../settings';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DEFAULT_CITY, DEFAULT_SORTING } from '../../settings';
import { AppProcess } from './../state';
import { Offer, SortingType } from '../../types/data-types';

const initialState: AppProcess = {
  cityName: DEFAULT_CITY,
  activeCard: undefined,
  sortingType: DEFAULT_SORTING,
  favoritesCount: 0
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    selectCityAction: (state, action: PayloadAction<string>) => {
      state.cityName = action.payload;
    },
    setActiveCardAction: (state, action: PayloadAction<Offer | undefined>) => {
      state.activeCard = action.payload;
    },
    setSortingType: (state, action: PayloadAction<SortingType>) => {
      state.sortingType = action.payload;
    },
    setFavoritesCount: (state, action: PayloadAction<number>) => {
      state.favoritesCount = action.payload;
    }
  },
});

export const { selectCityAction, setActiveCardAction, setSortingType, setFavoritesCount } = appProcess.actions;
