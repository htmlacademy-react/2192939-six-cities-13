import { extractActionTypes, makeFakeFavorites, makeFakeFullOffer, makeFakeReview } from '../test-mocks/test-mocks';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { State } from './state';
import { AppThunkDispatch, makeFakeOffer } from '../test-mocks/test-mocks';
import { Action } from '@reduxjs/toolkit';
import { APIRoute } from '../settings';
import { checkAuthStatus, favoriteStatusAction, fetchFavoritesAction, fetchFullOfferAction, fetchNeighborPlacesAction, fetchOffersAction, fetchReviewsFullOfferAction, loginAction, logoutAction, reviewAction } from './api-actions';
import { AuthData } from '../types/auth-data';
import { redirectToRoute } from './action';
import * as tokenStorage from '../services/token';

describe('Асинхронные операции', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ DATA: { offers: [] } });
  });

  describe('checkAuthStatus', () => {
    it('Должен отправить checkAuthStatus.pending & checkAuthStatus.fulfilled', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200, []);

      await store.dispatch(checkAuthStatus());

      const actions = extractActionTypes(store.getActions());
      expect(actions).toEqual([
        checkAuthStatus.pending.type,
        checkAuthStatus.fulfilled.type
      ]);
    });

    it('Должен отправить checkAuthStatus.pending & checkAuthStatus.rejected', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(400, []);

      await store.dispatch(checkAuthStatus());

      const actions = extractActionTypes(store.getActions());
      expect(actions).toEqual([
        checkAuthStatus.pending.type,
        checkAuthStatus.rejected.type
      ]);
    });
  });

  describe('fetchOffersAction', () => {
    it('Должен вернуть массив предложений при коде ответа сервера 200', async () => {
      const mockOffers = [makeFakeOffer()];
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, mockOffers);

      await store.dispatch(fetchOffersAction());

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionTypes(emittedActions);
      const fetchOffersActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffersAction.fulfilled>;

      expect(extractedActionTypes).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.fulfilled.type
      ]);

      expect(fetchOffersActionFulfilled.payload).toEqual(mockOffers);
    });

    it('Должен вернуть fetchOffersAction.pending и fetchOffersAction.rejected при коде ответа сервера 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(400, []);

      await store.dispatch(fetchOffersAction());

      const actions = extractActionTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.rejected.type
      ]);
    });

  });

  describe('fetchFullOfferAction', () => {
    const mockFullOffer = makeFakeFullOffer();
    const mockOfferId = mockFullOffer.id;

    it('Должен вернуть массив предложений при коде ответа сервера 200', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${mockOfferId}`).reply(200, mockFullOffer);

      await store.dispatch(fetchFullOfferAction(mockOfferId));

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionTypes(emittedActions);
      const fetchFullOfferActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFullOfferAction.fulfilled>;

      expect(extractedActionTypes).toEqual([
        fetchFullOfferAction.pending.type,
        fetchFullOfferAction.fulfilled.type
      ]);

      expect(fetchFullOfferActionFulfilled.payload).toEqual(mockFullOffer);
    });

    it('Должен вернуть fetchFullOfferAction.pending и fetchFullOfferAction.rejected при коде ответа сервера 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${mockOfferId}`).reply(400, []);

      await store.dispatch(fetchFullOfferAction(mockOfferId));

      const actions = extractActionTypes(store.getActions());

      expect(actions).toEqual([
        fetchFullOfferAction.pending.type,
        fetchFullOfferAction.rejected.type
      ]);
    });

  });

  describe('fetchReviewsFullOfferAction', () => {
    const mockReviews = makeFakeReview();
    const mockOfferId = mockReviews.id;

    it('Должен вернуть массив отзывов при коде ответа сервера 200', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${mockOfferId}`).reply(200, [mockReviews]);

      await store.dispatch(fetchReviewsFullOfferAction(mockOfferId));

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionTypes(emittedActions);
      const fetchReviewsFullOfferActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchReviewsFullOfferAction.fulfilled>;

      expect(extractedActionTypes).toEqual([
        fetchReviewsFullOfferAction.pending.type,
        fetchReviewsFullOfferAction.fulfilled.type
      ]);

      expect(fetchReviewsFullOfferActionFulfilled.payload).toEqual([mockReviews]);
    });

    it('Должен вернуть fetchReviewsFullOfferAction.pending и fetchReviewsFullOfferAction.rejected при коде ответа сервера 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${mockOfferId}`).reply(400, []);

      await store.dispatch(fetchReviewsFullOfferAction(mockOfferId));

      const actions = extractActionTypes(store.getActions());

      expect(actions).toEqual([
        fetchReviewsFullOfferAction.pending.type,
        fetchReviewsFullOfferAction.rejected.type
      ]);
    });

  });

  describe('fetchNeighborPlacesAction', () => {
    const mockNeighborPlaces = makeFakeOffer();
    const mockOfferId = mockNeighborPlaces.id;

    it('Должен вернуть массив мест поблизости при коде ответа сервера 200', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${mockOfferId}${APIRoute.NearBy}`).reply(200, [mockNeighborPlaces]);

      await store.dispatch(fetchNeighborPlacesAction(mockOfferId));

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionTypes(emittedActions);
      const fetchNeighborPlacesActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchReviewsFullOfferAction.fulfilled>;

      expect(extractedActionTypes).toEqual([
        fetchNeighborPlacesAction.pending.type,
        fetchNeighborPlacesAction.fulfilled.type
      ]);

      expect(fetchNeighborPlacesActionFulfilled.payload).toEqual([mockNeighborPlaces]);
    });

    it('Должен вернуть fetchNeighborPlacesAction.pending и fetchNeighborPlacesAction.rejected при коде ответа сервера 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${mockOfferId}${APIRoute.NearBy}`).reply(400, []);

      await store.dispatch(fetchNeighborPlacesAction(mockOfferId));

      const actions = extractActionTypes(store.getActions());

      expect(actions).toEqual([
        fetchNeighborPlacesAction.pending.type,
        fetchNeighborPlacesAction.rejected.type
      ]);
    });

  });

  describe('fetchFavoritesAction', () => {
    const mockFavorites = makeFakeFavorites();

    it('Должен вернуть массив избранных предложений при коде ответа сервера 200', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorites).reply(200, [mockFavorites]);

      await store.dispatch(fetchFavoritesAction());

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionTypes(emittedActions);
      const fetchFavoritesActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchReviewsFullOfferAction.fulfilled>;

      expect(extractedActionTypes).toEqual([
        fetchFavoritesAction.pending.type,
        fetchFavoritesAction.fulfilled.type
      ]);

      expect(fetchFavoritesActionFulfilled.payload).toEqual([mockFavorites]);
    });

    it('Должен вернуть fetchFavoritesAction.pending и fetchFavoritesAction.rejected при коде ответа сервера 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorites).reply(400, []);

      await store.dispatch(fetchFavoritesAction());

      const actions = extractActionTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavoritesAction.pending.type,
        fetchFavoritesAction.rejected.type
      ]);
    });
  });

  describe('loginAction', () => {
    it('Проверяем состояния при коде ответа сервера 200', async () => {
      const fakeUser: AuthData = { login: 'Lorem@test.com', password: 'w2' };
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);

      await store.dispatch(loginAction(fakeUser));

      const actions = extractActionTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        redirectToRoute.type,
        loginAction.fulfilled.type
      ]);
    });

    it('Проверяем вызов функции SaveToken', async () => {
      const fakeUser: AuthData = { login: 'Lorem@test.com', password: 'w2' };
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(fakeUser));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(fakeServerReplay.token);
    });
  });

  describe('logoutAction', () => {
    it('Проверяем состояния при коде ответа сервера 204', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

      await store.dispatch(logoutAction());

      const actions = extractActionTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type
      ]);
    });

    it('Проверяем вызов функции DropToken', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction());

      expect(mockDropToken).toBeCalledTimes(1);
    });
  });

  describe('reviewAction', () => {
    it('Проверяем ответ и состояния при коде ответа сервера 201', async () => {
      const mockReview = makeFakeReview();
      const mockData = {
        comment: mockReview.comment,
        rating: mockReview.rating,
        offerId: mockReview.id,
      };
      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${mockReview.id}`).reply(204, mockReview);

      await store.dispatch(reviewAction(mockData));
      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionTypes(emittedActions);
      const fetchReviewActionFulfilled = emittedActions.at(1) as ReturnType<typeof reviewAction.fulfilled>;

      expect(extractedActionTypes).toEqual([
        reviewAction.pending.type,
        reviewAction.fulfilled.type
      ]);

      expect(fetchReviewActionFulfilled.payload).toEqual(mockReview);
    });
  });

  describe('favoriteStatusAction', () => {
    it('Проверяем ответ и состояния при коде ответа сервера 200', async () => {
      const mockFavorite = makeFakeFullOffer();
      mockFavorite.isFavorite = false;
      const mockData = {
        offerId: mockFavorite.id,
        status: 0
      };
      mockAxiosAdapter.onPost(`${APIRoute.Favorites}/${mockData.offerId}/${mockData.status}`).reply(200, mockFavorite);

      await store.dispatch(favoriteStatusAction(mockData));
      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionTypes(emittedActions);
      const fetchFavoriteActionFulfilled = emittedActions.at(1) as ReturnType<typeof favoriteStatusAction.fulfilled>;

      expect(extractedActionTypes).toEqual([
        favoriteStatusAction.pending.type,
        favoriteStatusAction.fulfilled.type
      ]);

      expect(fetchFavoriteActionFulfilled.payload).toEqual(mockFavorite);
    });
    it('Проверяем ответ и состояния при коде ответа сервера 201', async () => {
      const mockFavorite = makeFakeFullOffer();
      mockFavorite.isFavorite = true;
      const mockData = {
        offerId: mockFavorite.id,
        status: 1
      };
      mockAxiosAdapter.onPost(`${APIRoute.Favorites}/${mockData.offerId}/${mockData.status}`).reply(201, mockFavorite);

      await store.dispatch(favoriteStatusAction(mockData));
      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionTypes(emittedActions);
      const fetchFavoriteActionFulfilled = emittedActions.at(1) as ReturnType<typeof favoriteStatusAction.fulfilled>;

      expect(extractedActionTypes).toEqual([
        favoriteStatusAction.pending.type,
        favoriteStatusAction.fulfilled.type
      ]);

      expect(fetchFavoriteActionFulfilled.payload).toEqual(mockFavorite);
    });
  });
});
