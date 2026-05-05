import {createSlice} from '@reduxjs/toolkit';
import {Booking} from '../../types/booking.ts';
import {fetchBookingSlots, sendBooking} from '../api-actions.ts';

type BookingState = {
  bookings: Booking[];
  error: string | null;
  isLoading: boolean;
  isSending: boolean;
}

const initialState: BookingState = {
  bookings: [],
  error: null,
  isLoading: false,
  isSending: false,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    clearBookingError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookingSlots.pending, (state) => {
        state.bookings = [];
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchBookingSlots.fulfilled, (state, action) => {
        state.bookings = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchBookingSlots.rejected, (state) => {
        state.error = 'Не могу загрузить информацию о бронировании';
        state.isLoading = false;
      })
      .addCase(sendBooking.pending, (state) => {
        state.isSending = true;
        state.error = null;
      })
      .addCase(sendBooking.fulfilled, (state) => {
        state.isSending = false;
      })
      .addCase(sendBooking.rejected, (state) => {
        state.isSending = false;
        state.error = 'Не удалось отправить бронирование';
      });
  },
});

export const {clearBookingError} = bookingSlice.actions;

export default bookingSlice.reducer;
