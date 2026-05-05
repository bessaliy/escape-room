import {RootState} from './index.ts';

export const getQuests = (state: RootState) => state.quests.quests;
export const getQuestsError = (state: RootState) => state.quests.error;
export const getQuestsLoading = (state: RootState) => state.quests.isLoading;

export const getDetailedQuest = (state: RootState) => state.detailedQuest.detailedQuest;
export const getDetailedQuestError = (state: RootState) => state.detailedQuest.error;
export const getDetailedQuestLoading = (state: RootState) => state.detailedQuest.isQuestLoading;


export const getAuthStatus = (state: RootState) => state.user.authStatus;

export const getBookingSlots = (state: RootState) => state.booking.bookings;
export const getBookingSlotsLoading = (state: RootState) => state.booking.isLoading;
export const getBookingSendingState = (state: RootState) => state.booking.isSending;
export const getBookingSlotsError = (state: RootState) => state.booking.error;

export const getReservations = (state: RootState) => state.reservation.reservations;
export const getReservationError = (state: RootState) => state.reservation.error;
export const getReservationLoading = (state: RootState) => state.reservation.isLoading;

export const getLoginError = (state: RootState) => state.user.loginError;
export const getLoginSendingState = (state: RootState) => state.user.isSending;


