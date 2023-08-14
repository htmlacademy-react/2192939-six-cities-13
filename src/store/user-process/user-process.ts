import { AuthStatus, NameSpace, Status } from '../../settings';
import { checkAuthStatus, loginAction, logoutAction } from '../api-actions';
import { UserProcess } from '../state';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: UserProcess = {
  authStatus: AuthStatus.Unknown,
  loginStatus: Status.Idle,
  userName: '',
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    setLoginStatus: (state, action: PayloadAction<string>) => {
      state.loginStatus = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.authStatus = AuthStatus.Auth;
        state.userName = action.payload;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authStatus = AuthStatus.Auth;
        state.userName = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authStatus = AuthStatus.NoAuth;
      });
  }
});

export const { setLoginStatus } = userProcess.actions;
