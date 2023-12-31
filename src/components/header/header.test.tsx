import { MemoryHistory, createMemoryHistory } from 'history';
import LogoLeft from '.';
import { withHistory, withStore } from '../../test-mocks/test-component';
import { render, screen } from '@testing-library/react';
import { makeFakeFavorites, makeFakeStore, makeFakeUserName } from '../../test-mocks/test-mocks';
import { AppRoute, AuthStatus, Status, TIME_TO_RENDER_PAGE } from '../../settings';
import Header from '.';
import { testInitialState } from '../../store/app-data/app-data';

describe('Component: Header', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  describe('Пользователь авторизован', () => {
    it('Ожидаю отрисовку компонента', () => {
      const expectedUserName = makeFakeUserName();
      const expectedText = 'Sign out';
      const notExpectedText = 'Sign in';
      const favorites = [makeFakeFavorites(), makeFakeFavorites()];
      const withHistoryComponent = withHistory(<Header />, mockHistory);
      const { withStoreComponent } = withStore(
        withHistoryComponent,
        makeFakeStore(
          {
            USER: {
              authStatus: AuthStatus.Auth,
              loginStatus: Status.Idle,
              userName: expectedUserName,
            },
            DATA: {
              ...testInitialState,
              favorites: favorites,
            }
          }));


      render(withStoreComponent);

      expect(screen.getByText(expectedUserName)).toBeInTheDocument();
      expect(screen.getByText(expectedText)).toBeInTheDocument();
      expect(screen.getByText(favorites.length)).toBeInTheDocument();
      expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
    });

    it('Ожидаю перехода на LoginAction когда юзер выходит из приложения', () => {
      const expectedText = 'Sign in';
      const withHistoryComponent = withHistory(<LogoLeft />, mockHistory);
      const { withStoreComponent } = withStore(
        withHistoryComponent, makeFakeStore({}));
      mockHistory.push(AppRoute.Login);

      render(withStoreComponent);

      const waitingRenderTimer = setTimeout(() => {
        expect(screen.getAllByText(expectedText)).toBeInTheDocument();
        clearTimeout(waitingRenderTimer);
      }, TIME_TO_RENDER_PAGE);
    });
  });


  describe('Пользователь не авторизован', () => {
    it('Ожидаю отрисовку компонента', () => {
      const notExpectedUserName = makeFakeUserName();
      const notExpectedText = 'Sign out';
      const expectedText = 'Sign in';
      const withHistoryComponent = withHistory(<Header />, mockHistory);
      const { withStoreComponent } = withStore(
        withHistoryComponent, makeFakeStore({
          USER: {
            authStatus: AuthStatus.NoAuth,
            loginStatus: Status.Idle,
            userName: notExpectedUserName,
          },
          DATA: {
            ...testInitialState
          }
        }));


      render(withStoreComponent);

      expect(screen.getByText(expectedText)).toBeInTheDocument();
      expect(screen.queryByText(notExpectedUserName)).not.toBeInTheDocument();
      expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
    });

    it('Ожидаю клик по логотипу', () => {
      const expectedText = 'Sign in';
      const withHistoryComponent = withHistory(<LogoLeft />, mockHistory);
      const { withStoreComponent } = withStore(
        withHistoryComponent, makeFakeStore({
          DATA: {
            ...testInitialState
          }
        }));
      mockHistory.push(AppRoute.Login);

      render(withStoreComponent);

      const waitingRenderTimer = setTimeout(() => {
        expect(screen.getAllByText(expectedText)).toBeInTheDocument();
        clearTimeout(waitingRenderTimer);
      }, TIME_TO_RENDER_PAGE);
    });
  });

});
