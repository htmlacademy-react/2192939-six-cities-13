import { AuthStatus, NameSpace, Status } from './../../settings';
import { getAuthStatus, getLoginStatus, getUserName } from './selectors';

describe('Селекторы UseProcess', () => {
  const state = {
    [NameSpace.User]: {
      authStatus: AuthStatus.NoAuth,
      loginStatus: Status.Loading,
      userName: 'lorem@test.com',
    }
  };

  it('Должен вернуть статус авторизации из Хранилища', () => {
    const { authStatus } = state[NameSpace.User];
    const result = getAuthStatus(state);
    expect(result).toBe(authStatus);
  });

  it('Должен вернуть статус регистрации', () => {
    const { loginStatus } = state[NameSpace.User];
    const result = getLoginStatus(state);
    expect(result).toBe(loginStatus);
  });

  it('Должен вернуть имя (email) пользователя', () => {
    const { userName } = state[NameSpace.User];
    const result = getUserName(state);
    expect(result).toBe(userName);
  });

});
