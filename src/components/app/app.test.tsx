import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute } from '../../settings';
import { withHistory, withStore } from '../../test-mocks/test-component';
import { makeFakeStore } from '../../test-mocks/test-mocks';
import App from '.';

describe('Маршрутизация приложения', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('Ожидаю страницу авторизации', () => {
    const { withStoreComponent } = withStore(<App />, makeFakeStore());
    const withHistoryComponent = withHistory(withStoreComponent, mockHistory);
    mockHistory.push(AppRoute.Login);

    render(withHistoryComponent);

    setTimeout(() => {
      expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    }, 50);
  });

  it('Ожидаю страницу 404', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.NoFound);

    render(withStoreComponent);

    setTimeout(() => {
      expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    }, 50);
  });


});
