import { withHistory, withStore } from '../../test-mocks/test-component';
import { render, screen } from '@testing-library/react';
import { extractActionTypes, makeFakeFullOffer, makeFakeOffer, makeFakeStore } from '../../test-mocks/test-mocks';
import { APIRoute, AppRoute, TIME_TO_RENDER_PAGE } from '../../settings';
import PlaceCard from './place-card';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { favoriteStatusAction } from '../../store/api-actions';
import { testInitialState } from '../../store/app-data/app-data';

describe('Component: PlaceCard', () => {
  it('Ожидаю выполнения запроса если пользователь нажимает кнопку добавить в избранное', async () => {
    const mockOffer = makeFakeOffer();
    const mockFullOffer = makeFakeFullOffer();
    mockFullOffer.isFavorite = true;
    const offerId = mockFullOffer.id;
    const status = 1;
    const withHistoryComponent = withHistory(<PlaceCard offer={mockOffer} type='cities' />);
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(withHistoryComponent, makeFakeStore({}));
    mockAxiosAdapter.onPost(`${APIRoute.Favorites}/${offerId}/${status}`).reply(201, mockFullOffer);

    render(withStoreComponent);
    await userEvent.click(screen.getByRole('button'));
    const actions = extractActionTypes(mockStore.getActions());

    const waitingRenderTimer = setTimeout(() => {
      expect(actions).toEqual([
        favoriteStatusAction.pending.type,
        favoriteStatusAction.fulfilled.type
      ]);
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });


  it('Ожидаю отрисовку компонента если предложение не премиальное и не в избранном', () => {
    const placeCardImageTestId = 'placeCardImageElement';
    const notExpectedPremium = 'Premium';
    const notExpectedFavoritesClass = 'place-card__bookmark-button';
    const mockOffer = makeFakeOffer();
    mockOffer.isFavorite = false;
    mockOffer.isPremium = false;
    const withHistoryComponent = withHistory(
      <PlaceCard offer={mockOffer} type='cities' />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
    }));

    render(withStoreComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByTestId(placeCardImageTestId)).toBeInTheDocument();
      expect(screen.queryByText(notExpectedPremium)).not.toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveClass(notExpectedFavoritesClass);
      expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
      expect(screen.getByText(mockOffer.price)).toBeInTheDocument();
      expect(screen.getByText(mockOffer.type)).toBeInTheDocument();
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });

  it('Ожидаю отрисовку компонента если предложение премиальное и в избранном', () => {
    const placeCardImageTestId = 'placeCardImageElement';
    const expectedPremium = 'Premium';
    const expectedFavoritesClass = 'place-card__bookmark-button';
    const mockOffer = makeFakeOffer();
    mockOffer.isFavorite = true;
    mockOffer.isPremium = true;
    const withHistoryComponent = withHistory(
      <PlaceCard offer={mockOffer} type='cities' />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
    }));

    render(withStoreComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByTestId(placeCardImageTestId)).toBeInTheDocument();
      expect(screen.queryByText(expectedPremium)).not.toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveClass(expectedFavoritesClass);
      expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
      expect(screen.getByText(mockOffer.price)).toBeInTheDocument();
      expect(screen.getByText(mockOffer.type)).toBeInTheDocument();
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });

  it('Ожидаю перехода на страницу предложения', () => {
    const mockHistory = createMemoryHistory();

    const mockOffer = makeFakeOffer();
    const fullOffer = makeFakeFullOffer();
    const offerId = fullOffer.id;
    const withHistoryComponent = withHistory(<PlaceCard offer={mockOffer} type='cities' />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      DATA: {
        ...testInitialState,
        fullOffer: fullOffer,
      }
    }));
    mockHistory.push(`${AppRoute.Offer}/${offerId}`);

    render(withStoreComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByText(fullOffer.title)).toBeInTheDocument();
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });


});
