import { createSlice } from '@reduxjs/toolkit';
import { FullOffer } from '../../types/data-types';
import { NameSpace } from '../../settings';
import { AppData } from '../state';
import { fetchFavoritesAction, fetchFullOfferAction, fetchNeighborPlacesAction, fetchOffersAction, fetchReviewsFullOfferAction } from '../api-actions';

const initialState: AppData = {
  offers: [],
  fullOffer: {} as FullOffer,
  reviews: [],
  neighborPlaces: [],
  favorites: [],
  isOffersDataLoading: false,
  isFullOfferDataLoading: true,
  isReviewsDataLoading: true,
  isNeighborPlacesDataLoading: true,
  isFavoritesLoading: false,
  hasError: false
};

export const appData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
        state.hasError = true;
      })
      .addCase(fetchFullOfferAction.fulfilled, (state, action) => {
        state.fullOffer = action.payload;
        state.isFullOfferDataLoading = false;
      })
      .addCase(fetchReviewsFullOfferAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isReviewsDataLoading = false;
      })
      .addCase(fetchNeighborPlacesAction.fulfilled, (state, action) => {
        state.neighborPlaces = action.payload;
        state.isNeighborPlacesDataLoading = false;
      })
      .addCase(fetchFavoritesAction.pending, (state) => {
        state.isFavoritesLoading = true;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.isFavoritesLoading = false;
      });
  }
});
