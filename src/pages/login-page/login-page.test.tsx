import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../test-mocks/test-component';
import LoginPage from '.';
import { AuthStatus, Status } from '../../settings';
import userEvent from '@testing-library/user-event';

describe('Component: LoginPage', () => {
  it('Проверяем правильность отрисовки', () => {
    const loginElementTestId = 'loginElement';
    const passwordElementTestId = 'passwordElement';
    const { withStoreComponent } = withStore(<LoginPage />, {
      USER: {
        authStatus: AuthStatus.Unknown,
        loginStatus: Status.Idle,
        userName: '',
      }
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(loginElementTestId)).toBeInTheDocument();
    expect(screen.getByTestId(passwordElementTestId)).toBeInTheDocument();
  });

  it('Проверяем правильность отработки действий пользователя', async () => {
    const loginElementTestId = 'loginElement';
    const passwordElementTestId = 'passwordElement';
    const expectedLoginValue = 'Lorem@test.com';
    const expectedPasswordValue = '1234';
    const { withStoreComponent } = withStore(<LoginPage />, {
      USER: {
        authStatus: AuthStatus.Unknown,
        loginStatus: Status.Idle,
        userName: '',
      }
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    await userEvent.type(
      screen.getByTestId(loginElementTestId),
      expectedLoginValue
    );
    await userEvent.type(
      screen.getByTestId(passwordElementTestId),
      expectedPasswordValue
    );

    expect(screen.getByDisplayValue(expectedLoginValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPasswordValue)).toBeInTheDocument();
  });
});
