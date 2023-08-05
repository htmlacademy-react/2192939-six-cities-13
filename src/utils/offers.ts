import { MAX_QUANTITY_REVIEWS } from '../settings';
import {
  Cities,
  Offers,
  Review,
  Reviews,
  SortingType,
} from '../types/data-types';

export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function getCityOffers(offers: Offers, cityName: string) {
  return offers.filter((offer) => offer.city.name === cityName);
}

export function getSortedOffersBy(offers: Offers, sortType: SortingType) {
  switch (sortType) {
    case 'priceToHigh':
      return offers.slice().sort((a, b) => a.price - b.price);
    case 'priceToLow':
      return offers.slice().sort((a, b) => b.price - a.price);
    case 'raitedFirst':
      return offers.slice().sort((a, b) => b.rating - a.rating);
    default:
      return offers;
  }
}

export function randomInteger(min: number, max: number): number {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

export function getRandomCity(cities: Cities): string {
  const index = randomInteger(0, cities.length - 1);

  return cities[index];
}

export function nearByCities(offers: Offers): Offers {
  const nearByOffers = new Set();
  while (nearByOffers.size < 3) {
    nearByOffers.add(offers[randomInteger(0, offers.length - 1)]);
  }
  return Array.from(nearByOffers) as Offers;
}

function compare(a: Review, b: Review) {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  return Number(dateA) - Number(dateB);
}

export function sortReviewByDate(reviews: Reviews): Reviews {
  return reviews.slice().sort(compare).slice(0, MAX_QUANTITY_REVIEWS);
}
