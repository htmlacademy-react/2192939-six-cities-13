import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute } from '../../settings';
import { withHistory, withStore } from '../../test-mocks/test-component';
import { makeFakeStore } from '../../test-mocks/test-mocks';
import LoginPage from '../../pages/login';
import Page404 from '../../pages/404';

describe('Маршрутизация приложения', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('Ожидаю страницу авторизации', () => {
    const { withStoreComponent } = withStore(<LoginPage />, makeFakeStore());
    const withHistoryComponent = withHistory(withStoreComponent, mockHistory);
    mockHistory.push(AppRoute.Login);

    render(withHistoryComponent);

    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
  });

  it('Ожидаю страницу 404', () => {
    const withHistoryComponent = withHistory(<Page404 />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.NoFound);

    render(withStoreComponent);

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  });


});
