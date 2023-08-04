export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
}

export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
}

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

export const RatingMap = {
  '5': 'perfect',
  '4': 'good',
  '3': 'not bad',
  '2': 'badly',
  '1': 'terribly',
};

export const SORTING_MAPS = [
  { type: 'popular', title: 'Popular' },
  {
    type: 'priceToHigh',
    title: 'Price: low to high',
  },
  {
    type: 'priceToLow',
    title: 'Price: high to low',
  },
  {
    type: 'raitedFirst',
    title: 'Top rated first',
  },
];

export const RATING_IN_PERCENT = 20;

export const MIN_LENGTH_REVIEW_TEXT = 50;

export const MAX_LENGTH_REVIEW_TEXT = 300;

export const EMPTY_RATING = '0';

export const TIMEOUT_SHOW_ERROR = 2000;

export const URL_MARKER_DEFAULT = '../img/pin.svg';

export const URL_MARKER_CURRENT = '../img/pin-active.svg';

export const DEFAULT_CITY = 'Paris';

export const DEFAULT_SORTING = 'popular';

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
