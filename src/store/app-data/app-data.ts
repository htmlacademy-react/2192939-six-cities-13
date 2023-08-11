import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FullOffer } from '../../types/data-types';
import { NameSpace } from '../../settings';
import { AppData } from '../state';
import { favoriteStatusAction, fetchFavoritesAction, fetchFullOfferAction, fetchNeighborPlacesAction, fetchOffersAction, fetchReviewsFullOfferAction, reviewAction } from '../api-actions';

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
  isFavoriteAdding: false,
  hasError: false,
  favoritesCount: 0
};

export const appData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    setFavoritesCount: (state, action: PayloadAction<number>) => {
      state.favoritesCount = action.payload;
    }
  },
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
      })
      .addCase(reviewAction.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
      })
      .addCase(favoriteStatusAction.pending, (state) => {
        state.isFavoriteAdding = true;
      })
      .addCase(favoriteStatusAction.fulfilled, (state, action) => {
        const index = state.offers.findIndex((offer) => offer.id === action.payload.id);
        state.isFavoriteAdding = false;
        state.offers[index].isFavorite = action.payload.isFavorite;
        state.favoritesCount += action.payload.isFavorite ? 1 : -1;
        state.fullOffer = action.payload;
      });
  }
});

export const { setFavoritesCount } = appData.actions;
