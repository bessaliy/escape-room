import {AuthStatus} from '../../const.ts';
import {createSlice} from '@reduxjs/toolkit';
import {checkAuth, login, logout} from '../api-actions.ts';

type UserState = {
  authStatus: AuthStatus;
  email: string | null;
  loginError: string | null;
  isSending: boolean;
};

const initialState: UserState = {
  authStatus: AuthStatus.Unknown,
  email: null,
  loginError: null,
  isSending: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loginError = null;
        state.isSending = true;
      })
      .addCase(login.fulfilled, (state) => {
        state.authStatus = AuthStatus.Auth;
        state.loginError = null;
        state.isSending = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginError = action.payload ?? null;
        state.isSending = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authStatus = AuthStatus.NoAuth;
        state.loginError = null;
      })
      .addCase(logout.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
        state.loginError = null;
      })
      .addCase(checkAuth.fulfilled, (state) => {
        state.authStatus = AuthStatus.Auth;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
      });
  }
});

export default userSlice.reducer;
