import { Offers, SortingType } from '../types/data-types';

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
