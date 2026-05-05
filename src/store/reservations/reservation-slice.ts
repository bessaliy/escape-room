import {createSlice} from '@reduxjs/toolkit';
import {Reservation} from '../../types/reservation.ts';
import {deleteReservation, fetchReservations} from '../api-actions.ts';

type ReservationsState = {
  reservations: Reservation[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ReservationsState = {
  reservations: [],
  isLoading: false,
  error: null,
};

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reservations = action.payload;
        state.error = null;
      })
      .addCase(fetchReservations.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Не удалось загрузить бронирования';
      })
      .addCase(deleteReservation.fulfilled, (state, action) => {
        state.reservations = state.reservations.filter(
          (item) => item.id !== action.meta.arg
        );
      });
  },
});

export default reservationSlice.reducer;
