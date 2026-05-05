import {BookingDate} from './booking.ts';

export type LoginForm = {
  email: string;
  password: string;
  agreement: boolean;
};

export type BookingForm = {
  date: BookingDate;
  time: string;
  contactPerson: string;
  phone: string;
  withChildren: boolean;
  peopleCount: number;
  placeId: string;
  agreement: boolean;
};
