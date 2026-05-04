import {Booking as BookingType} from './types/booking.ts';

export enum AppRoute {
  Catalogue = '/',
  Quest = '/quest/:id',
  Contacts = '/contacts',
  Login = '/login',
  Booking = '/quest/:id/booking',
  MyQuests = '/my-quests',
  NotFound = '/404',
  Fallback = '*'
}

export const API_CONFIG = {
  BaseUrl: 'https://grading.design.htmlacademy.pro/v1/escape-room/',
  RequestTimeout: 5000,
} as const;

export const TOKEN_KEY_STORAGE = 'token';

export const TOKEN_KEY_SERVER = 'X-Token';

export const QUEST_LEVELS = {
  Easy: 'easy',
  Medium: 'medium',
  Hard: 'hard',
} as const;

export const LEVEL_LABELS = {
  easy: 'Простой',
  medium: 'Средний',
  hard: 'Сложный',
} as const;

export const DAYS_LABELS = {
  today: 'Сегодня',
  tomorrow: 'Завтра',
} as const;

export const LEVEL_FILTER_TYPES = {
  any: 'Любой',
  easy: 'Простой',
  medium: 'Средний',
  hard: 'Сложный',
} as const;

export const QUEST_TYPES = {
  Adventures: 'adventures',
  Horror: 'horror',
  Mystic: 'mystic',
  Detective: 'detective',
  SciFi: 'sci-fi',
} as const;

export const QUEST_FILTER = {
  all: {
    label: 'Все квесты',
    icon: 'all-quests',
  },
  adventures: {
    label: 'Приключения',
    icon: 'adventure',
  },
  horror: {
    label: 'Ужасы',
    icon: 'horror',
  },
  mystic: {
    label: 'Мистика',
    icon: 'mystic',
  },
  detective: {
    label: 'Детектив',
    icon: 'detective',
  },
  'sci-fi': {
    label: 'Sci-fi',
    icon: 'sci-fi',
  },
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


export const PASSWORD_LENGTH = {
  MIN: 3,
  MAX: 15,
} as const;

export const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const validPassword = /^(?=.*[a-zA-Z])(?=.*\d).+$/;
export const validName = /^[А-Яа-яЁёA-Za-z' -]{1,}$/;
export const validPhone = /[0-9]{10,}/;

export const MAP_DEFAULT_COORDINATES = [59.93, 30.31];

export const CONTACT_ADDRESS: BookingType[] = [{
  id: 'static',
  location: {
    'address': 'Набережная реки Карповка, д 5П',
    'coords': [
      59.968322,
      30.317359
    ],
  },
  'slots': {
    today: [],
    tomorrow: [],
  }
}];
