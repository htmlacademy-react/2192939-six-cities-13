import { City, FullOffer, Location, Offer, Review } from '../types/data-types';
import faker from 'faker';

const Location: Location = {
  latitude: Number(faker.address.latitude()),
  longitude: Number(faker.address.longitude()),
  zoom: faker.datatype.number({ min: 10, max: 15 }),
};

const City: City = {
  name: faker.address.cityName(),
  location: Location,
};

export const makeFakeOffer = (): Offer => ({
  id: faker.random.alphaNumeric(20),
  title: faker.lorem.lines(),
  type: faker.lorem.word(),
  price: faker.datatype.number(500),
  city: City,
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
  city: City,
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
