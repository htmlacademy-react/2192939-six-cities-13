import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { City, FullOffer, Location, Offer, Review } from '../types/data-types';
import faker from 'faker';
import { State } from '../store/state';
import { createAPI } from '../services/api';
import { AuthStatus, DEFAULT_CITY, DEFAULT_SORTING, Status } from '../settings';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>

export const extractActionTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  USER: {
    authStatus: AuthStatus.NoAuth,
    loginStatus: Status.Idle,
    userName: '',
  },
  DATA: {
    offers: [],
    fullOffer: {} as FullOffer,
    reviews: [],
    neighborPlaces: [],
    favorites: [],
    isOffersDataLoading: false,
    isFullOfferDataLoading: true,
    isReviewsDataLoading: true,
    isNeighborPlacesDataLoading: true,
    isFavoritesLoading: false,
    isFavoriteAdding: false,
    hasError: false,
    currentCityName: DEFAULT_CITY,
    activeCard: null,
    sortingType: DEFAULT_SORTING,
    statusReview: Status.Idle,
  },
  ...initialState ?? {}
});

const Location: Location = {
  latitude: Number(faker.address.latitude()),
  longitude: Number(faker.address.longitude()),
  zoom: faker.datatype.number({ min: 10, max: 15 }),
};

export const makeFakeCity = (): City => ({
  name: faker.address.cityName(),
  location: Location,
});

export const makeFakeOffer = (defaultCity?: string): Offer => ({
  id: faker.random.alphaNumeric(20),
  title: faker.lorem.lines(),
  type: faker.lorem.word(),
  price: faker.datatype.number(500),
  city: {
    name: defaultCity ? defaultCity : faker.address.cityName(),
    location: Location,
  },
  location: Location,
  isFavorite: faker.datatype.boolean(),
  isPremium: faker.datatype.boolean(),
  rating: faker.datatype.number({ min: 1, max: 5 }),
  previewImage: faker.image.city(),
} as Offer);

export const makeFakeFullOffer = (): FullOffer => ({
  id: faker.random.alphaNumeric(20),
  title: faker.lorem.lines(),
  type: faker.lorem.word(),
  price: faker.datatype.number(500),
  city: makeFakeCity(),
  location: Location,
  isFavorite: faker.datatype.boolean(),
  isPremium: faker.datatype.boolean(),
  rating: faker.datatype.number({ min: 1, max: 5 }),
  description: faker.lorem.sentence(),
  bedrooms: faker.datatype.number({ min: 1, max: 5 }),
  goods: [
    faker.lorem.word()
  ],
  host: {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    avatarUrl: faker.internet.avatar(),
    isPro: faker.datatype.boolean()
  },
  images: [
    faker.image.imageUrl(),
    faker.image.imageUrl(),
    faker.image.imageUrl(),
    faker.image.imageUrl(),
    faker.image.imageUrl(),
    faker.image.imageUrl(),
  ],
  maxAdults: faker.datatype.number({ min: 1, max: 10 })
} as FullOffer);

export const makeFakeReview = (): Review => ({
  id: faker.random.alphaNumeric(20),
  comment: faker.lorem.text(60),
  date: String(new Date()),
  rating: faker.datatype.number({ min: 1, max: 5 }),
  user: {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    avatarUrl: faker.internet.avatar(),
    isPro: false,
  }
} as Review);

export const makeFakeFavorites = (): Offer => ({
  id: faker.random.alphaNumeric(20),
  title: faker.lorem.lines(),
  type: faker.lorem.word(),
  price: faker.datatype.number(500),
  city: City,
  location: Location,
  isFavorite: true,
  isPremium: faker.datatype.boolean(),
  rating: faker.datatype.number({ min: 1, max: 5 }),
  previewImage: faker.image.city(),
} as Offer);

export const makeFakeUserName = () => ({
  userName: faker.internet.email()
});
