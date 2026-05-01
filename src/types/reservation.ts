import {Quest} from './quest.ts';
import {BookingRequest, Location} from './booking.ts';

export type Reservation = Omit<BookingRequest, 'placeId'> & {
  id: string;
  location: Location;
  quest: Quest;
};
