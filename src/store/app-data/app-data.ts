import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FullOffer, Offer, SortingType } from '../../types/data-types';
import { DEFAULT_CITY, DEFAULT_SORTING, NameSpace, Status } from '../../settings';
import { AppData } from '../state';
import {
  favoriteStatusAction,
  fetchFavoritesAction,
  fetchFullOfferAction,
  fetchNeighborPlacesAction,
  fetchOffersAction,
  fetchReviewsFullOfferAction,
  reviewAction
} from '../api-actions';

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
  currentCityName: DEFAULT_CITY,
  activeCard: null,
  sortingType: DEFAULT_SORTING,
  statusReview: Status.Idle,
  statusFullOffer: Status.Idle,
};

export const appData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    selectCityAction: (state, action: PayloadAction<string>) => {
      state.currentCityName = action.payload;
    },
    setActiveCardAction: (state, action: PayloadAction<Offer | null>) => {
      state.activeCard = action.payload;
    },
    setSortingType: (state, action: PayloadAction<SortingType>) => {
      state.sortingType = action.payload;
    },
    setReviewStatus: (state, action: PayloadAction<string>) => {
      state.statusReview = action.payload;
    },
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
        state.statusFullOffer = Status.Success;
      })
      .addCase(fetchFullOfferAction.pending, (state) => {
        state.isFullOfferDataLoading = false;
        state.statusFullOffer = Status.Loading;
      })
      .addCase(fetchFullOfferAction.rejected, (state) => {
        state.isFullOfferDataLoading = false;
        state.statusFullOffer = Status.Error;
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
      .addCase(reviewAction.pending, (state) => {
        state.statusReview = Status.Loading;
      })
      .addCase(reviewAction.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
        state.statusReview = Status.Success;
      })
      .addCase(reviewAction.rejected, (state) => {
        state.statusReview = Status.Error;
      })
      .addCase(favoriteStatusAction.pending, (state) => {
        state.isFavoriteAdding = true;
      })
      .addCase(favoriteStatusAction.fulfilled, (state, action) => {
        const isRemoval = action.meta.arg.status === 0;

        if (isRemoval) {
          state.favorites = state.favorites.filter((offer) => offer.id !== action.payload.id);
        } else {
          state.favorites = [...state.favorites, action.payload];
        }
        state.fullOffer = action.payload;
        state.isFavoriteAdding = false;
      })
      .addCase(favoriteStatusAction.rejected, (state) => {
        state.isFavoriteAdding = true;
      });
  }
});

export const {
  selectCityAction,
  setActiveCardAction,
  setSortingType,
  setReviewStatus,
} = appData.actions;

export { initialState as testInitialState };
