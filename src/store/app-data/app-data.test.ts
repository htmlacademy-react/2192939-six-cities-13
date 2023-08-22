import { expect } from 'vitest';
import { DEFAULT_CITY, DEFAULT_SORTING, Status } from '../../settings';
import { makeFakeFavorites, makeFakeFullOffer, makeFakeOffer, makeFakeReview } from '../../test-mocks/test-mocks';
import { FullOffer } from '../../types/data-types';
import { appData, selectCityAction, setActiveCardAction, setReviewStatus, setSortingType } from './app-data';
import { favoriteStatusAction, fetchFavoritesAction, fetchFullOfferAction, fetchNeighborPlacesAction, fetchOffersAction, fetchReviewsFullOfferAction, reviewAction } from '../api-actions';

describe('AppData Slice', () => {
  const state = {
    offers: [makeFakeOffer()],
    fullOffer: makeFakeFullOffer(),
    reviews: [makeFakeReview()],
    neighborPlaces: [makeFakeOffer()],
    favorites: [makeFakeFavorites()],
    isOffersDataLoading: false,
    isFullOfferDataLoading: true,
    isReviewsDataLoading: true,
    isNeighborPlacesDataLoading: true,
    isFavoritesLoading: false,
    isFavoriteAdding: false,
    hasError: false,
    currentCityName: DEFAULT_CITY,
    activeCard: makeFakeOffer(),
    sortingType: DEFAULT_SORTING,
    statusReview: Status.Idle,
    statusFullOffer: Status.Idle
  };

  const initialState = {
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
    statusFullOffer: Status.Idle
  };

  it('Должен вернуть начальное состояние при пустом действии', () => {
    const emptyAction = { type: '' };
    const expectedState = {
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
      statusFullOffer: Status.Idle
    };
    const result = appData.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть дефолтное начальное состояние при неизвестном состоянии', () => {
    const emptyAction = { type: '' };
    const expectedState = {
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
      statusFullOffer: Status.Idle
    };
    const result = appData.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть название текущего города', () => {
    const expectedCurrentCityName = 'Paris';
    const result = appData.reducer(state, selectCityAction(expectedCurrentCityName));
    expect(result.currentCityName).toBe(expectedCurrentCityName);
  });

  it('Должен вернуть активную карту приложения', () => {
    const expectedActiveCard = makeFakeOffer();
    const result = appData.reducer(state, setActiveCardAction(expectedActiveCard));
    expect(result.activeCard).toBe(expectedActiveCard);
  });

  it('Должен вернуть тип сортировки', () => {
    const expectedCurrentSorting = 'priceToHigh';
    const result = appData.reducer(state, setSortingType(expectedCurrentSorting));
    expect(result.sortingType).toBe(expectedCurrentSorting);
  });

  it('Должен вернуть статус отправки запроса', () => {
    const expectedReviewStatus = Status.Loading;
    const result = appData.reducer(state, setReviewStatus(expectedReviewStatus));
    expect(result.statusReview).toBe(expectedReviewStatus);
  });

  it('Должен вернуть флаг процесса загрузки true и ошибки false', () => {
    const expectedState = {
      offers: [],
      fullOffer: {} as FullOffer,
      reviews: [],
      neighborPlaces: [],
      favorites: [],
      isOffersDataLoading: true,
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
      statusFullOffer: Status.Idle
    };

    const result = appData.reducer(initialState, fetchOffersAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть флаг успешной загрузки false и offers', () => {
    const offers = [makeFakeOffer()];
    const expectedState = {
      offers: offers,
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
      statusFullOffer: Status.Idle
    };

    const result = appData.reducer(initialState, fetchOffersAction.fulfilled(offers, '', undefined));
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть флаг ошибки загрузки предложений false и ошибки true', () => {
    const expectedState = {
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
      hasError: true,
      currentCityName: DEFAULT_CITY,
      activeCard: null,
      sortingType: DEFAULT_SORTING,
      statusReview: Status.Idle,
      statusFullOffer: Status.Idle
    };

    const result = appData.reducer(initialState, fetchOffersAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть предложение, флаг процесса загрузки false и статус Success', () => {
    const fullOffer = makeFakeFullOffer();
    const expectedState = {
      offers: [],
      fullOffer: fullOffer,
      reviews: [],
      neighborPlaces: [],
      favorites: [],
      isOffersDataLoading: false,
      isFullOfferDataLoading: false,
      isReviewsDataLoading: true,
      isNeighborPlacesDataLoading: true,
      isFavoritesLoading: false,
      isFavoriteAdding: false,
      hasError: false,
      currentCityName: DEFAULT_CITY,
      activeCard: null,
      sortingType: DEFAULT_SORTING,
      statusReview: Status.Idle,
      statusFullOffer: Status.Success
    };

    const result = appData.reducer(initialState, fetchFullOfferAction.fulfilled(fullOffer, '', fullOffer.id));
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть флаг процесса загрузки false и статус Loading', () => {
    const fullOffer = makeFakeFullOffer();
    const expectedState = {
      offers: [],
      fullOffer: {},
      reviews: [],
      neighborPlaces: [],
      favorites: [],
      isOffersDataLoading: false,
      isFullOfferDataLoading: false,
      isReviewsDataLoading: true,
      isNeighborPlacesDataLoading: true,
      isFavoritesLoading: false,
      isFavoriteAdding: false,
      hasError: false,
      currentCityName: DEFAULT_CITY,
      activeCard: null,
      sortingType: DEFAULT_SORTING,
      statusReview: Status.Idle,
      statusFullOffer: Status.Loading
    };

    const result = appData.reducer(initialState, fetchFullOfferAction.pending('', fullOffer.id));
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть флаг процесса загрузки false и статус Error', () => {
    const fullOffer = makeFakeFullOffer();
    const expectedState = {
      offers: [],
      fullOffer: {},
      reviews: [],
      neighborPlaces: [],
      favorites: [],
      isOffersDataLoading: false,
      isFullOfferDataLoading: false,
      isReviewsDataLoading: true,
      isNeighborPlacesDataLoading: true,
      isFavoritesLoading: false,
      isFavoriteAdding: false,
      hasError: false,
      currentCityName: DEFAULT_CITY,
      activeCard: null,
      sortingType: DEFAULT_SORTING,
      statusReview: Status.Idle,
      statusFullOffer: Status.Error
    };

    const result = appData.reducer(initialState, fetchFullOfferAction.rejected(null, '', fullOffer.id));
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть предложения поблизости флаг процесса загрузки false', () => {
    const offerId = makeFakeOffer().id;
    const neighborPlaces = [makeFakeOffer()];
    const expectedState = {
      offers: [],
      fullOffer: {},
      reviews: [],
      neighborPlaces: neighborPlaces,
      favorites: [],
      isOffersDataLoading: false,
      isFullOfferDataLoading: true,
      isReviewsDataLoading: true,
      isNeighborPlacesDataLoading: false,
      isFavoritesLoading: false,
      isFavoriteAdding: false,
      hasError: false,
      currentCityName: DEFAULT_CITY,
      activeCard: null,
      sortingType: DEFAULT_SORTING,
      statusReview: Status.Idle,
      statusFullOffer: Status.Idle
    };

    const result = appData.reducer(initialState, fetchNeighborPlacesAction.fulfilled(neighborPlaces, '', offerId));
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть предложения поблизости и флаг процесса загрузки false', () => {
    const offerId = makeFakeOffer().id;
    const reviews = [makeFakeReview()];
    const expectedState = {
      offers: [],
      fullOffer: {},
      reviews: reviews,
      neighborPlaces: [],
      favorites: [],
      isOffersDataLoading: false,
      isFullOfferDataLoading: true,
      isReviewsDataLoading: false,
      isNeighborPlacesDataLoading: true,
      isFavoritesLoading: false,
      isFavoriteAdding: false,
      hasError: false,
      currentCityName: DEFAULT_CITY,
      activeCard: null,
      sortingType: DEFAULT_SORTING,
      statusReview: Status.Idle,
      statusFullOffer: Status.Idle
    };

    const result = appData.reducer(initialState, fetchReviewsFullOfferAction.fulfilled(reviews, '', offerId));
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть флаг процесса загрузки избранных предложений true', () => {
    const expectedFavoritesAction = true;

    const result = appData.reducer(initialState, fetchFavoritesAction.pending);
    expect(result.isFavoritesLoading).toEqual(expectedFavoritesAction);
  });

  it('Должен вернуть флаг процесса загрузки избранных предложений true', () => {
    const favorites = [makeFakeFavorites()];
    const expectedState = {
      offers: [],
      fullOffer: {},
      reviews: [],
      neighborPlaces: [],
      favorites: favorites,
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
      statusFullOffer: Status.Idle
    };


    const result = appData.reducer(initialState, fetchFavoritesAction.fulfilled(favorites, '', undefined));
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть состояние отправки отзыва - отправляется', () => {
    const expectedStatusReview = Status.Loading;

    const result = appData.reducer(initialState, reviewAction.pending);
    expect(result.statusReview).toEqual(expectedStatusReview);
  });

  it('Должен вернуть отзыв и состояние - успешно', () => {
    const review = makeFakeReview();
    const offerId = makeFakeOffer().id;
    const sendReview = {
      comment: review.comment,
      rating: review.rating,
      offerId: offerId
    };

    const expectedState = {
      offers: [],
      fullOffer: {},
      reviews: [review],
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
      statusReview: Status.Success,
      statusFullOffer: Status.Idle
    };


    const result = appData.reducer(initialState, reviewAction.fulfilled(review, '', sendReview));
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть состояние отправки отзыва - ошибка', () => {
    const expectedStatusReview = Status.Error;

    const result = appData.reducer(initialState, reviewAction.rejected);
    expect(result.statusReview).toEqual(expectedStatusReview);
  });

  it('Должен вернуть состояние добавления в избранное - true', () => {
    const expectedIsFavoriteAdding = true;

    const result = appData.reducer(initialState, favoriteStatusAction.pending);
    expect(result.isFavoriteAdding).toEqual(expectedIsFavoriteAdding);
  });

  it('Должен вернуть состояние добавление в избранное при ошибке - true', () => {
    const expectedIsFavoriteAdding = true;

    const result = appData.reducer(initialState, favoriteStatusAction.pending);
    expect(result.isFavoriteAdding).toEqual(expectedIsFavoriteAdding);
  });

  it('Должен добавить предложение в избранное', () => {
    const fullOffer = makeFakeFullOffer();
    const status = {
      offerId: fullOffer.id,
      status: 1
    };
    const expectedState = {
      offers: [],
      fullOffer: fullOffer,
      reviews: [],
      neighborPlaces: [],
      favorites: [fullOffer],
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
      statusFullOffer: Status.Idle
    };

    const result = appData.reducer(initialState, favoriteStatusAction.fulfilled(fullOffer, '', status));
    expect(result).toEqual(expectedState);
  });

  it('Должен удалить предложение из избранного', () => {
    const fullOffer = makeFakeFullOffer();
    fullOffer.isFavorite = false;
    const status = {
      offerId: fullOffer.id,
      status: 0
    };
    const initState = {
      offers: [],
      fullOffer: {} as FullOffer,
      reviews: [],
      neighborPlaces: [],
      favorites: [fullOffer],
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
      statusFullOffer: Status.Idle
    };

    const expectedState = {
      offers: [],
      fullOffer: fullOffer,
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
      statusFullOffer: Status.Idle
    };

    const result = appData.reducer(initState, favoriteStatusAction.fulfilled(fullOffer, '', status));

    expect(result).toEqual(expectedState);
  });

});
