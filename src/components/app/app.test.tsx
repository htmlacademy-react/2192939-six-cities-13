import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute, TIME_TO_RENDER_PAGE } from '../../settings';
import { withHistory, withStore } from '../../test-mocks/test-component';
import { makeFakeFullOffer, makeFakeStore } from '../../test-mocks/test-mocks';
import App from '.';
import { testInitialState } from '../../store/app-data/app-data';

describe('Маршрутизация приложения', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
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
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );
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
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        DATA: {
          ...testInitialState,
          fullOffer: fullOffer,
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
