import {createSlice} from '@reduxjs/toolkit';
import {Reservation} from '../../types/reservation.ts';

type BookingState = {
  bookings: Reservation[];
}

const initialState: BookingState = {
  bookings: [],
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {},
  // extraReducers: (builder) => {
  //   builder.addCase( () => {
  //
  //   });
  // },
});

export default bookingSlice.reducer;
