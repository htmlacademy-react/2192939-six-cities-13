import { AuthStatus, NameSpace } from '../../settings';
import { checkAuthStatus, loginAction, logoutAction, reviewAction } from '../api-actions';
import { UserProcess } from '../state';
import { createSlice } from '@reduxjs/toolkit';

const initialState: UserProcess = {
  authStatus: AuthStatus.Unknown,
  userName: '',
  reviews: []
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
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
      })
      .addCase(reviewAction.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
      });
  }
});
