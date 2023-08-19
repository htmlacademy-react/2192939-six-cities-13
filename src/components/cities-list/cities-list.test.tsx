import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withStore } from '../../test-mocks/test-component';
import ErrorScreen from '.';
import { APIRoute, DEFAULT_SORTING, Status } from '../../settings';
import { extractActionTypes, makeFakeCity } from '../../test-mocks/test-mocks';
import { fetchOffersAction } from '../../store/api-actions';
import CitiesList from './cities-list';
import { FullOffer } from '../../types/data-types';

describe('Component: CitiesList', () => {
  it('Проверяем правильность отрисовки', () => {
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
    expect(screen.getBy('anchor')).toBeInTheDocument();
  });

  it('Проверяем действия пользователя', async () => {
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(<CitiesList />, {});
    mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, []);

    render(withStoreComponent);
    await userEvent.click(screen.getByRole('button'));
    const actions = extractActionTypes(mockStore.getActions());

    expect(actions).toEqual([
      fetchOffersAction.pending.type,
      fetchOffersAction.fulfilled.type
    ]);
  });

});
