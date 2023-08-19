import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../test-mocks/test-component';
import LoginPage from '.';
import { AuthStatus, Status } from '../../settings';
import userEvent from '@testing-library/user-event';

describe('Component: LoginPage', () => {
  it('Проверяем правильность отрисовки', () => {
    const loginText = 'Email';
    const passwordText = 'Password';
    const { withStoreComponent } = withStore(<LoginPage />, {
      USER: {
        authStatus: AuthStatus.Unknown,
        loginStatus: Status.Idle,
        userName: '',
      }
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByPlaceholderText(loginText)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(passwordText)).toBeInTheDocument();
  });

  it('Проверяем правильность отрисовки', async () => {
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
    await userEvent.type(screen.getByTestId(loginElementTestId), expectedLoginValue);
    await userEvent.type(screen.getByTestId(passwordElementTestId), expectedPasswordValue);

    expect(screen.getByDisplayValue(expectedLoginValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPasswordValue)).toBeInTheDocument();
  });
});
