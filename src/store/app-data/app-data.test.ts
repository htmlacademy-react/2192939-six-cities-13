import { expect } from 'vitest';
import { Status } from '../../settings';
import { makeFakeFavorites, makeFakeFullOffer, makeFakeOffer, makeFakeReview } from '../../test-mocks/test-mocks';
import { appData, selectCityAction, setActiveCardAction, setReviewStatus, setSortingType, testInitialState } from './app-data';
import { favoriteStatusAction, fetchFavoritesAction, fetchOfferPageDataAction, fetchOffersAction, reviewAction } from '../api-actions';

describe('AppData Slice', () => {
  const state = {
    ...testInitialState,
    offers: [makeFakeOffer()],
    fullOffer: makeFakeFullOffer(),
    reviews: [makeFakeReview()],
    neighborPlaces: [makeFakeOffer()],
    favorites: [makeFakeFavorites()],
    activeCard: makeFakeOffer(),
  };

  const initialState = {
    ...testInitialState
  };

  it('Должен вернуть начальное состояние при пустом действии', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      ...testInitialState
    };
    const result = appData.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть дефолтное начальное состояние при неизвестном состоянии', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      ...testInitialState
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
      ...testInitialState,
      isOffersDataLoading: true,
      hasError: false,
    };

    const result = appData.reducer(initialState, fetchOffersAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть флаг успешной загрузки false и offers', () => {
    const offers = [makeFakeOffer()];
    const expectedState = {
      ...testInitialState,
      offers: offers,
      isOffersDataLoading: false,
    };

    const result = appData.reducer(
      initialState, fetchOffersAction.fulfilled(offers, '', undefined)
    );
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть флаг ошибки загрузки предложений false и ошибки true', () => {
    const expectedState = {
      ...testInitialState,
      isOffersDataLoading: false,
      hasError: true,
    };

    const result = appData.reducer(initialState, fetchOffersAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть данные страницы предложения и статус Success', () => {
    const offerPageData = {
      fullOffer: makeFakeFullOffer(),
      reviews: [makeFakeReview()],
      neighborPlaces: [makeFakeOffer()],

    };
    const expectedState = {
      ...testInitialState,
      fullOffer: offerPageData.fullOffer,
      reviews: offerPageData.reviews,
      neighborPlaces: offerPageData.neighborPlaces,
      statusOfferPageData: Status.Success
    };

    const result = appData.reducer(
      initialState,
      fetchOfferPageDataAction.fulfilled(offerPageData, '', offerPageData.fullOffer.id)
    );
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть статус процесса загрузки Loading', () => {
    const fullOffer = makeFakeFullOffer();
    const expectedState = {
      ...testInitialState,
      statusOfferPageData: Status.Loading
    };

    const result = appData.reducer(
      initialState, fetchOfferPageDataAction.pending('', fullOffer.id)
    );
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть статус процесса загрузки Error', () => {
    const fullOffer = makeFakeFullOffer();
    const expectedState = {
      ...testInitialState,
      statusOfferPageData: Status.Error
    };

    const result = appData.reducer(
      initialState, fetchOfferPageDataAction.rejected(null, '', fullOffer.id)
    );
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
      ...testInitialState,
      favorites: favorites,
      isFavoritesLoading: false,
    };


    const result = appData.reducer(
      initialState, fetchFavoritesAction.fulfilled(favorites, '', undefined)
    );
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
      ...testInitialState,
      reviews: [review],
      statusReview: Status.Success,
    };


    const result = appData.reducer(
      initialState, reviewAction.fulfilled(review, '', sendReview)
    );
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
      ...testInitialState,
      fullOffer: fullOffer,
      favorites: [fullOffer],
    };

    const result = appData.reducer(
      initialState, favoriteStatusAction.fulfilled(fullOffer, '', status)
    );
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
      ...testInitialState,
      favorites: [fullOffer],
    };

    const expectedState = {
      ...testInitialState,
      fullOffer: fullOffer,
    };

    const result = appData.reducer(
      initState, favoriteStatusAction.fulfilled(fullOffer, '', status)
    );

    expect(result).toEqual(expectedState);
  });

});
