import { render, screen } from '@testing-library/react';
import { TIME_TO_RENDER_PAGE } from '../../settings';
import { withHistory, withStore } from '../../test-mocks/test-component';
import { makeFakeStore } from '../../test-mocks/test-mocks';
import { createMemoryHistory } from 'history';
import FavoritesPage from '.';
import { testInitialState } from '../../store/app-data/app-data';

describe('Component: FavoritesPage', () => {
  const mockHistory = createMemoryHistory();

  const withHistoryComponent = withHistory(<FavoritesPage />, mockHistory);
  const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
    DATA: {
      ...testInitialState
    }
  }));

  it('Ожидаю страницу избранного', () => {
    const favoritesEmptyTitleText = 'Favorites (empty)';
    const favoritesEmptyHeaderText = 'Nothing yet saved.';
    const favoritesEmptyText = 'Save properties to narrow down search or plan your future trips.';

    render(withStoreComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByText(favoritesEmptyTitleText)).toBeInTheDocument();
      expect(screen.getByText(favoritesEmptyHeaderText)).toBeInTheDocument();
      expect(screen.getByText(favoritesEmptyText)).toBeInTheDocument();
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });

  it('Ожидаю количество избранных предложений', () => {
    const favoritesListQuantity = 0;

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
