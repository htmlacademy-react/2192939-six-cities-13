import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../test-mocks/test-component';
import MainPage from '.';
import { AuthStatus, DEFAULT_CITY, DEFAULT_SORTING, Status } from '../../settings';
import { FullOffer } from '../../types/data-types';

describe('Component: MainPage', () => {
  it('Проверяем правильность отрисовки', () => {
    const expectedText = 'Cities';
    const { withStoreComponent } = withStore(<MainPage />, {
      DATA: {
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
      },
      USER: {
        authStatus: AuthStatus.Unknown,
        loginStatus: Status.Idle,
        userName: '',
      }
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
