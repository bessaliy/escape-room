import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';

import {DetailedQuest, Quest} from '../types/quest.ts';
// import {Booking, BookingRequest} from '../types/booking.ts';
// import {User} from '../types/user.ts';
// import {Reservation} from '../types/reservation.ts';
// import {AuthData} from '../types/auth-data.ts';

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

