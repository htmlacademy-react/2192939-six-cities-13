import { Offers } from '../types/data-types';

export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function getCityOffers(offers: Offers, cityName: string) {
  return offers.filter((offer) => offer.city.name === cityName);
}

export function getSortedOffersBy(offers: Offers, sortType: string) {
  switch (sortType) {
    case 'priceToHigh':
      return offers.map((offer) => offer).sort((a, b) => a.price - b.price);
    case 'priceToLow':
      return offers.map((offer) => offer).sort((a, b) => b.price - a.price);
    case 'raitedFirst':
      return offers.map((offer) => offer).sort((a, b) => b.rating - a.rating);
    default:
      return offers;
  }
}
