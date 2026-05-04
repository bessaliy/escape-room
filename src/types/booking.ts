import {BOOKING_DATES} from '../const.ts';

export type BookingDate = typeof BOOKING_DATES[keyof typeof BOOKING_DATES];

export type SlotInfo = {
  time: string;
  isAvailable: boolean;
};

type Slots = {
  today: SlotInfo[];
  tomorrow: SlotInfo[];
};

export type Location = {
  address: string;
  coords: [number, number];
};


export type Booking = {
  id: string;
  location: Location;
  slots: Slots;
};

export type BookingRequest = {
  date: BookingDate;
  time: string;
  contactPerson: string;
  phone: string;
  withChildren: boolean;
  peopleCount: number;
  placeId: string;
};
