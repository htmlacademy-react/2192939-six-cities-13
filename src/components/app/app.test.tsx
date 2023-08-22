import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute, DEFAULT_CITY, DEFAULT_SORTING, Status, TIME_TO_RENDER_PAGE } from '../../settings';
import { withHistory, withStore } from '../../test-mocks/test-component';
import { makeFakeFullOffer, makeFakeOffer, makeFakeStore } from '../../test-mocks/test-mocks';
import App from '.';
import { FullOffer } from '../../types/data-types';

describe('Маршрутизация приложения', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('Ожидаю главную страницу', () => {
    const expectedText = 'Cities';
    const offers = [makeFakeOffer(), makeFakeOffer()];
    const currentCityName = offers[0].city.name;
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      DATA: {
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
        currentCityName: currentCityName,
        activeCard: null,
        sortingType: DEFAULT_SORTING,
        statusReview: Status.Idle,
        statusFullOffer: Status.Idle
      }
    }));
    mockHistory.push(AppRoute.Root);

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });


  it('Ожидаю страницу авторизации', () => {
    const loginElementTestId = 'loginElement';
    const passwordElementTestId = 'passwordElement';
    const { withStoreComponent } = withStore(<App />, makeFakeStore());
    const withHistoryComponent = withHistory(withStoreComponent, mockHistory);
    mockHistory.push(AppRoute.Login);

    render(withHistoryComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByTestId(loginElementTestId)).toBeInTheDocument();
      expect(screen.getByTestId(passwordElementTestId)).toBeInTheDocument();
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });

  it('Ожидаю страницу 404', () => {
    const expectedText = '404 Not Found';
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.NoFound);

    render(withStoreComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByText(expectedText)).toBeInTheDocument();
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });


  it('Ожидаю страницу предложения', () => {
    const fullOffer = makeFakeFullOffer();
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      DATA: {
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
      }
    }));
    mockHistory.push(AppRoute.Offer);

    render(withStoreComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByText(fullOffer.title)).toBeInTheDocument();
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });
});
