import { State } from './../state';
import { NameSpace } from '../../settings';
import { FullOffer, Offer, Offers, Reviews, SortingType } from '../../types/data-types';

export const getOffers = (state: Pick<State, NameSpace.Data>): Offers => state[NameSpace.Data].offers;

export const getIsOffersDataLoading = (state: Pick<State, NameSpace.Data>): boolean => state[NameSpace.Data].isOffersDataLoading;

export const getFullOffer = (state: Pick<State, NameSpace.Data>): FullOffer => state[NameSpace.Data].fullOffer;

export const getNeighborPlaces = (state: Pick<State, NameSpace.Data>): Offers => state[NameSpace.Data].neighborPlaces;

export const getReviewsData = (state: Pick<State, NameSpace.Data>): Reviews => state[NameSpace.Data].reviews;

export const getIsFullOfferLoaded = (state: Pick<State, NameSpace.Data>): boolean => state[NameSpace.Data].isFullOfferDataLoading;

export const getIsReviewsLoaded = (state: Pick<State, NameSpace.Data>): boolean => state[NameSpace.Data].isReviewsDataLoading;

export const getIsNearByLoaded = (state: Pick<State, NameSpace.Data>): boolean => state[NameSpace.Data].isNeighborPlacesDataLoading;

export const getErrorStatus = (state: Pick<State, NameSpace.Data>): boolean => state[NameSpace.Data].hasError;

export const getFavorites = (state: Pick<State, NameSpace.Data>): (Offer)[] => state[NameSpace.Data].favorites;

export const getIsFavoritesLoading = (state: Pick<State, NameSpace.Data>): boolean => state[NameSpace.Data].isFavoritesLoading;

export const getIsFavoriteAdding = (state: Pick<State, NameSpace.Data>): boolean => state[NameSpace.Data].isFavoriteAdding;

export const getCurrentCityName = (store: Pick<State, NameSpace.Data>): string => store[NameSpace.Data].currentCityName;

export const getSortingType = (store: Pick<State, NameSpace.Data>): SortingType => store[NameSpace.Data].sortingType as SortingType;

export const getActiveCard = (store: Pick<State, NameSpace.Data>): Offer | null => store[NameSpace.Data].activeCard;

export const getReviewStatus = (store: Pick<State, NameSpace.Data>): string => store[NameSpace.Data].statusReview;

export const getFullOfferStatus = (state: Pick<State, NameSpace.Data>): string => state[NameSpace.Data].statusFullOffer;
