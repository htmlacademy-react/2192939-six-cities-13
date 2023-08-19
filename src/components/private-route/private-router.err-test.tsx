import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute, AuthStatus, Status } from '../../settings';
import { withHistory, withStore } from '../../test-mocks/test-component';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from '.';

describe('Component: PrivateRouter', () => {
  let mockHistory: MemoryHistory;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    mockHistory.push(AppRoute.Favorites);
  });

  it('Проверяем что отображается когда пользователь не авторизован', () => {
    const expectedText = 'public route';
    const notExpectedText = 'private route';
    const { withStoreComponent } = withStore(
      <Routes>
        <Route path={AppRoute.Login} element={<span>{expectedText}</span>} />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute >
            <span>{notExpectedText}</span>
          </PrivateRoute>
        }
        />
      </Routes>,
      {
        USER: {
          authStatus: AuthStatus.NoAuth,
          loginStatus: Status.Idle,
          userName: '',
        }
      });
    const preparedComponent = withHistory(withStoreComponent,
      mockHistory
    );


    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('Проверяем что отображается когда пользователь авторизован', () => {
    const expectedText = 'private route';
    const notExpectedText = 'public route';
    const { withStoreComponent } = withStore(
      <Routes>
        <Route path={AppRoute.Login} element={<span>{expectedText}</span>} />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute >
            <span>{notExpectedText}</span>
          </PrivateRoute>
        }
        />
      </Routes>,
      {
        USER: {
          authStatus: AuthStatus.Auth,
          loginStatus: Status.Idle,
          userName: '',
        }
      });
    const preparedComponent = withHistory(withStoreComponent,
      mockHistory
    );


    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

});
