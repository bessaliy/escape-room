import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';

import {DetailedQuest, Quest} from '../types/quest.ts';
import {AuthData} from '../types/auth-data.ts';
import {TOKEN_KEY_STORAGE} from '../const.ts';
import {LoginRequest} from '../types/requests.ts';
// import {Booking, BookingRequest} from '../types/booking.ts';
// import {User} from '../types/user.ts';
// import {Reservation} from '../types/reservation.ts';

export const fetchQuests = createAsyncThunk<
  Quest[],
  void,
  {extra: AxiosInstance}
>(
  'quests/fetchQuests',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Quest[]>('/quest');
    return data;
  }
);

export const fetchDetailedQuest = createAsyncThunk<
  DetailedQuest,
  string,
  {extra: AxiosInstance}
>(
  'quest/fetchDetailedQuest',
  async (id, {extra: api}) => {
    const {data} = await api.get<DetailedQuest>(`/quest/${id}`);
    return data;
  }
);

export const login = createAsyncThunk<
  AuthData,
  LoginRequest,
  {
    extra: AxiosInstance;
    rejectValue: string;
  }
>(
  'user/login',
  async ({email, password}, { extra: api, rejectWithValue }) => {
    try {
      const {data} = await api.post<AuthData>('/login', {email, password});
      localStorage.setItem(TOKEN_KEY_STORAGE, data.token);

      return data;
    } catch {
      return rejectWithValue('Неверный e-mail или пароль');
    }
  }
);

export const logout = createAsyncThunk<
  void,
  undefined,
  {extra: AxiosInstance}
>(
  'user/logout',
  async (_arg, {extra: api}) => {
    try {
      await api.delete('/logout');
    } finally {
      localStorage.removeItem(TOKEN_KEY_STORAGE);
    }
  }
);

export const checkAuth = createAsyncThunk<
  void,
  undefined,
  {extra: AxiosInstance}
>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    await api.get('/login');
  }
);

