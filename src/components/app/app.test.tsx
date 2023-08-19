import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute, DEFAULT_CITY, DEFAULT_SORTING, Status } from '../../settings';
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
      }
    }));
    mockHistory.push(AppRoute.Root);

    render(withStoreComponent);

    expect(screen.getByText('Cities')).toBeInTheDocument();
  });


  it('Ожидаю страницу авторизации', () => {
    const { withStoreComponent } = withStore(<App />, makeFakeStore());
    const withHistoryComponent = withHistory(withStoreComponent, mockHistory);
    mockHistory.push(AppRoute.Login);

    render(withHistoryComponent);

    setTimeout(() => {
      expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    }, 50);
  });

  it('Ожидаю страницу 404', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.NoFound);

    render(withStoreComponent);

    setTimeout(() => {
      expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    }, 50);
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
      }
    }));
    mockHistory.push(AppRoute.Offer);

    render(withStoreComponent);

    setTimeout(() => {
      expect(screen.getByText(fullOffer.title)).toBeInTheDocument();
    }, 50);
  });
});
