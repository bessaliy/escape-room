import {AuthStatus} from '../../const.ts';
import {createSlice} from '@reduxjs/toolkit';

type UserState = {
  authStatus: AuthStatus;
  email: string | null;
};

const initialState: UserState = {
  authStatus: AuthStatus.Unknown,
  email: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  // extraReducers: (builder) => {
  //   builder.addCase( () => {
  //
  //   });
  // },
});

export default userSlice.reducer;
