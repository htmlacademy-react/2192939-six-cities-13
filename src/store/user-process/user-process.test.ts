import { expect } from 'vitest';
import { AuthStatus, Status } from '../../settings';
import { setLoginStatus, userProcess } from './user-process';
import { checkAuthStatus, loginAction, logoutAction } from '../api-actions';

describe('UserProcess Slice', () => {

  it('Должен вернуть начальное состояние при пустом действии', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      authStatus: AuthStatus.NoAuth,
      loginStatus: Status.Loading,
      userName: 'lorem@test.com',
    };
    const result = userProcess.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть дефолтное начальное состояние при неизвестном состоянии', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      authStatus: AuthStatus.Unknown,
      loginStatus: Status.Idle,
      userName: '',
    };
    const result = userProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть успех при авторизации', () => {
    const initialState = {
      authStatus: AuthStatus.Unknown,
      loginStatus: Status.Idle,
      userName: '',
    };
    const expectedLoginStatus = Status.Success;
    const result = userProcess.reducer(
      initialState,
      setLoginStatus(Status.Success)
    );
    expect(result.loginStatus).toBe(expectedLoginStatus);
  });

  it('Должен вернуть \'NO_AUTH\' при ошибке авторизации', () => {
    const initialState = {
      authStatus: AuthStatus.Unknown,
      loginStatus: Status.Idle,
      userName: '',
    };
    const expectedState = {
      authStatus: AuthStatus.NoAuth,
      loginStatus: Status.Idle,
      userName: '',
    };
    const result = userProcess.reducer(initialState, checkAuthStatus.rejected);
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть \'NO_AUTH\' при ошибке регистрации', () => {
    const initialState = {
      authStatus: AuthStatus.Unknown,
      loginStatus: Status.Idle,
      userName: '',
    };
    const expectedState = {
      authStatus: AuthStatus.NoAuth,
      loginStatus: Status.Idle,
      userName: '',
    };
    const result = userProcess.reducer(initialState, loginAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть \'NO_AUTH\' при выходе из приложения', () => {
    const initialState = {
      authStatus: AuthStatus.Auth,
      loginStatus: Status.Idle,
      userName: '',
    };
    const expectedState = {
      authStatus: AuthStatus.NoAuth,
      loginStatus: Status.Idle,
      userName: '',
    };
    const result = userProcess.reducer(initialState, logoutAction.fulfilled);
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть \'AUTH\' и \'Lorem@test.com\' при успешной авторизации', () => {
    const initialState = {
      authStatus: AuthStatus.Unknown,
      loginStatus: Status.Idle,
      userName: '',
    };
    const expectedState = {
      authStatus: AuthStatus.Auth,
      loginStatus: Status.Idle,
      userName: 'Lorem@test.com',
    };
    const result = userProcess.reducer(
      initialState,
      checkAuthStatus.fulfilled('Lorem@test.com', '', undefined)
    );
    expect(result).toEqual(expectedState);
  });

  it('Должен вернуть \'AUTH\' и \'Lorem@test.com\' при успешной регистрации', () => {
    const initialState = {
      authStatus: AuthStatus.Unknown,
      loginStatus: Status.Idle,
      userName: '',
    };
    const expectedState = {
      authStatus: AuthStatus.Auth,
      loginStatus: Status.Idle,
      userName: 'Lorem@test.com',
    };
    const authData = {
      login: 'Lorem@test.com',
      password: 'w2'
    };
    const result = userProcess.reducer(
      initialState,
      loginAction.fulfilled('Lorem@test.com', '', authData)
    );
    expect(result).toEqual(expectedState);
  });
});

