export const AppRoute = {
  Root: '/',
  Login: '/login',
  Favorites: '/favorites',
  OfferId: '/offer/:id',
} as const;

export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const RATING_IN_PERCENT = 20;

export const MIN_LENGHT_REVIEW_TEXT = 50;
