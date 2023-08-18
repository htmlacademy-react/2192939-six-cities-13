import { MemoryHistory, createMemoryHistory } from 'history';
import { withHistory, withStore } from '../../test-mocks/test-component';
import App from '.';
import { makeFakeStore } from '../../test-mocks/test-mocks';
import { AppRoute } from '../../settings';
import { render, screen } from '@testing-library/react';

describe('Маршрутизация приложения', () => {

  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('Ожидаю страницу авторизации', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());

    mockHistory.push(AppRoute.Login);
    const path = mockHistory.location;
    console.log(path);

    render(withStoreComponent);

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  // it('Ожидаю страницу 404', () => {
  //   const withHistoryComponent = withHistory(<App />, mockHistory);
  //   const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());

  //   mockHistory.push('/not-found');

  //   render(withStoreComponent);

  //   expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  // });


});
