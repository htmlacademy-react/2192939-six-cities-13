import { render, screen } from '@testing-library/react';
import { withStore } from '../../test-mocks/test-component';
import { DEFAULT_SORTING, Status } from '../../settings';
import { makeFakeCity } from '../../test-mocks/test-mocks';
import CitiesList from './cities-list';
import { FullOffer } from '../../types/data-types';

describe('Component: CitiesList', () => {
  it('Проверяем правильность отрисовки', () => {
    const cityNameTestId = 'cityNameElement';
    const mockExpectedCityName = [makeFakeCity().name];
    const { withStoreComponent } = withStore(<CitiesList cities={mockExpectedCityName} />, {
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
        currentCityName: mockExpectedCityName[0],
        activeCard: null,
        sortingType: DEFAULT_SORTING,
        statusReview: Status.Idle,
      }
    });

    render(withStoreComponent);

    expect(screen.getByText(mockExpectedCityName[0])).toBeInTheDocument();
    expect(screen.getAllByTestId(cityNameTestId).length).toBe(mockExpectedCityName.length);
  });
});
