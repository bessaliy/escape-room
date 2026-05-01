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

export const LEVEL_LABELS = {
  easy: 'Простой',
  medium: 'Средний',
  hard: 'Сложный',
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
