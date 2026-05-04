import {RootState} from './index.ts';

export const getQuests = (state: RootState) => state.quests.quests;
export const getDetailedQuest = (state: RootState) => state.detailedQuest.detailedQuest;

export const getAuthStatus = (state: RootState) => state.user.authStatus;

export const getBookingSlots = (state: RootState) => state.booking.bookings;
export const getBookingSlotsLoading = (state: RootState) => state.booking.isLoading;
export const getBookingSendingState = (state: RootState) => state.booking.isSending;
export const getBookingSlotsError = (state: RootState) => state.booking.error;

export const getReservations = (state: RootState) => state.reservation.reservations;
