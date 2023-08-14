import { SortingType } from './types/data-types';

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
  NoFound = '/not-found',
}

export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  NearBy = '/nearby',
  Favorites = '/favorite'
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

export const EMPTY_RATING = 0;

export const MAX_QUANTITY_REVIEWS = 10;

export const URL_MARKER_DEFAULT = '/img/pin.svg';

export const URL_MARKER_CURRENT = '/img/pin-active.svg';

export const DEFAULT_CITY = 'Paris';

export const DEFAULT_SORTING: SortingType = 'popular';

export const StylesForMapMainPage = {
  width: '100%',
  height: '100%',
};

export const StylesForMapOfferPage = {
  width: '1144px',
  height: '100%',
  margin: '0 auto',
};

export enum PlacesCard {
  Cities = 'cities',
  NearPlaces = 'near-places',
  Favorites = 'favorites',
}

export const StatusCode = {
  401: 401
};

export const StatusMessage = {
  401: 'You\'re not authorized'
};

export enum NameSpace {
  App = 'APP',
  Data = 'DATA',
  User = 'USER',
}

export const MAP_URL_TEMPLATE = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

export const MAP_OPTIONS_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

export enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

export const TIMEOUT_SHOW_ERROR = 2000;
