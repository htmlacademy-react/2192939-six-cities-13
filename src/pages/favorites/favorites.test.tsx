import { render, screen } from '@testing-library/react';
import { DEFAULT_CITY, DEFAULT_SORTING, Status, TIME_TO_RENDER_PAGE } from '../../settings';
import { withHistory, withStore } from '../../test-mocks/test-component';
import { makeFakeFavorites, makeFakeStore } from '../../test-mocks/test-mocks';
import { createMemoryHistory } from 'history';
import { FullOffer } from '../../types/data-types';
import FavoritesPage from '.';

describe('Component: FavoritesPage', () => {
  const mockHistory = createMemoryHistory();

  const favorites = [makeFakeFavorites(), makeFakeFavorites(), makeFakeFavorites()];
  const withHistoryComponent = withHistory(<FavoritesPage />, mockHistory);
  const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
    DATA: {
      offers: [],
      fullOffer: {} as FullOffer,
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
    }
  }));

  it('Ожидаю страницу избранного', () => {
    const favoritesTitleText = 'Saved listing';

    render(withStoreComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByText(favoritesTitleText)).toBeInTheDocument();
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });

  it('Ожидаю количество избранных предложений', () => {
    const favoritesListQuantity = favorites.length;

    render(withStoreComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByText(favoritesListQuantity)).toBeInTheDocument();
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });

  it('Ожидаю логотип в футере страницы', () => {
    const favoritesLogoTestId = 'favoritesLogo';

    render(withStoreComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByTestId(favoritesLogoTestId)).toBeInTheDocument();
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });

});
