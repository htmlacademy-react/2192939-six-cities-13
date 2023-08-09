import { State } from './../state';
import { NameSpace } from '../../settings';
import { FullOffer, Offers } from '../../types/data-types';

export const getOffers = (state: State): Offers => state[NameSpace.Data].offers;

export const getIsOffersDataLoading = (state: State): boolean => state[NameSpace.Data].isOffersDataLoading;

export const getFullOffer = (state: State): FullOffer => state[NameSpace.Data].fullOffer;

export const getNeighborPlaces = (state: State): Offers => state[NameSpace.Data].neighborPlaces;

export const getIsFullOfferLoaded = (state: State): boolean => state[NameSpace.Data].isFullOfferDataLoading;

export const getIsReviewsLoaded = (state: State): boolean => state[NameSpace.Data].isReviewsDataLoading;

export const getIsNearByLoaded = (state: State): boolean => state[NameSpace.Data].isNeighborPlacesDataLoading;

export const getErrorStatus = (state: State): boolean => state[NameSpace.Data].hasError;

export const getFavorites = (state: State): Offers => state[NameSpace.Data].favorites;

export const getIsFavoritesLoading = (state: State): boolean => state[NameSpace.Data].isFavoritesLoading;
