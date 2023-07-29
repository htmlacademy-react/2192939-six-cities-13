export const AppRoute = {
  Root: '/',
  Login: '/login',
  Favorites: '/favorites',
  Offer: '/offer',
} as const;

export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const CITIES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export const ratingMap = {
  '5': 'perfect',
  '4': 'good',
  '3': 'not bad',
  '2': 'badly',
  '1': 'terribly',
};

export const sortingMap: Record<string, string> = {
  ['popular']: 'Popular',
  ['priceToHigh']: 'Price: low to high',
  ['priceToLow']: 'Price: high to low',
  ['raitedFirst']: 'Top rated first',
};

export const RATING_IN_PERCENT = 20;

export const MIN_LENGTH_REVIEW_TEXT = 50;

export const MAX_LENGTH_REVIEW_TEXT = 300;

export const EMPTY_RATING = '0';

export const URL_MARKER_DEFAULT = '../img/pin.svg';

export const URL_MARKER_CURRENT = '../img/pin-active.svg';

export const DEFAULT_CITY = 'Paris';

export const StylesForMapMainPage = {
  width: '100%',
  height: '100%',
};

export const StylesForMapOfferPage = {
  width: '1144px',
  height: '100%',
  margin: '0 auto',
};

export const PageCard = {
  Cities: 'cities',
  NearPlaces: 'near-places',
  Favorites: 'favorites',
};
