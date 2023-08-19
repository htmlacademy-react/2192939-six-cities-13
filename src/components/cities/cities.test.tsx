import { render, screen } from '@testing-library/react';
import { withStore } from '../../test-mocks/test-component';
import Cities from '.';
import { FullOffer } from '../../types/data-types';
import { DEFAULT_CITY, DEFAULT_SORTING, Status } from '../../settings';

describe('Component: Cities', () => {
  it('Проверяем правильность отрисовки', () => {
    const expectedTest = 'Cities';
    const { withStoreComponent } = withStore(<Cities />, {
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
      }
    });

    render(withStoreComponent);

    expect(screen.getByText(expectedTest)).toBeInTheDocument();
  });
});
