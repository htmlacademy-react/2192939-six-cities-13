import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../test-mocks/test-component';
import MainPage from '.';
import { AuthStatus, Status } from '../../settings';
import { testInitialState } from '../../store/app-data/app-data';

describe('Component: MainPage', () => {
  it('Проверяем правильность отрисовки', () => {
    const expectedText = 'Cities';
    const { withStoreComponent } = withStore(<MainPage />, {
      DATA: {
        ...testInitialState
      },
      USER: {
        authStatus: AuthStatus.Unknown,
        loginStatus: Status.Idle,
        userName: '',
      }
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
