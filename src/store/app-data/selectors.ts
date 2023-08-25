import { AppData, State } from './../state';
import { NameSpace } from '../../settings';
import { SortingType } from '../../types/data-types';
import { createSelector } from '@reduxjs/toolkit';

export const getOffers = createSelector(
  (state: Pick<State, NameSpace.Data>) => state[NameSpace.Data],
  (state: AppData) => state.offers
);

export const getIsOffersDataLoading = createSelector(
  (state: Pick<State, NameSpace.Data>) => state[NameSpace.Data],
  (state: AppData) => state.isOffersDataLoading
);

export const getFullOffer = createSelector(
  (state: Pick<State, NameSpace.Data>) => state[NameSpace.Data],
  (state: AppData) => state.fullOffer
);

export const getNeighborPlaces = createSelector(
  (state: Pick<State, NameSpace.Data>) => state[NameSpace.Data],
  (state: AppData) => state.neighborPlaces
);

export const getReviewsData = createSelector(
  (state: Pick<State, NameSpace.Data>) => state[NameSpace.Data],
  (state: AppData) => state.reviews
);

export const getIsFullOfferLoaded = createSelector(
  (state: Pick<State, NameSpace.Data>) => state[NameSpace.Data],
  (state: AppData) => state.isFullOfferDataLoading
);

export const getIsReviewsLoaded = createSelector(
  (state: Pick<State, NameSpace.Data>) => state[NameSpace.Data],
  (state: AppData) => state.isReviewsDataLoading
);

export const getIsNearByLoaded = createSelector(
  (state: Pick<State, NameSpace.Data>) => state[NameSpace.Data],
  (state: AppData) => state.isNeighborPlacesDataLoading
);

export const getErrorStatus = createSelector(
  (state: Pick<State, NameSpace.Data>) => state[NameSpace.Data],
  (state: AppData) => state.hasError
);

export const getFavorites = createSelector(
  (state: Pick<State, NameSpace.Data>) => state[NameSpace.Data],
  (state: AppData) => state.favorites
);

export const getIsFavoritesLoading = createSelector(
  (state: Pick<State, NameSpace.Data>) => state[NameSpace.Data],
  (state: AppData) => state.isFavoritesLoading
);

export const getIsFavoriteAdding = createSelector(
  (state: Pick<State, NameSpace.Data>) => state[NameSpace.Data],
  (state: AppData) => state.isFavoriteAdding
);

export const getCurrentCityName = createSelector(
  (store: Pick<State, NameSpace.Data>) => store[NameSpace.Data],
  (state: AppData) => state.currentCityName
);

export const getSortingType = createSelector(
  (store: Pick<State, NameSpace.Data>) => store[NameSpace.Data],
  (state: AppData) => state.sortingType as SortingType
);

export const getActiveCard = createSelector(
  (store: Pick<State, NameSpace.Data>) => store[NameSpace.Data],
  (state: AppData) => state.activeCard
);

export const getReviewStatus = createSelector(
  (store: Pick<State, NameSpace.Data>) => store[NameSpace.Data],
  (state: AppData) => state.statusReview
);

export const getFullOfferStatus = createSelector(
  (state: Pick<State, NameSpace.Data>) => state[NameSpace.Data],
  (state: AppData) => state.statusFullOffer
);
