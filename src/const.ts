export enum AppRoute {
  Catalogue = '/',
  Quest = 'quest/:id',
  Contacts = 'contacts',
  Login = 'login',
  Booking = 'quest/:id/booking',
  MyQuests = 'my-quests',
  NotFound = '404',
  Fallback = '*'
}

export const API_CONFIG = {
  BaseUrl: 'https://grading.design.htmlacademy.pro/v1/escape-room/',
  RequestTimeout: 5000,
} as const;

export const TOKEN_KEY = 'token';

export const QUEST_LEVELS = {
  Easy: 'easy',
  Medium: 'medium',
  Hard: 'hard',
} as const;

export const QUEST_TYPES = {
  Adventures: 'adventures',
  Horror: 'horror',
  Mystic: 'mystic',
  Detective: 'detective',
  SciFi: 'sci-fi',
} as const;

export const BOOKING_DATES = {
  Today: 'today',
  Tomorrow: 'tomorrow',
} as const;

export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}
