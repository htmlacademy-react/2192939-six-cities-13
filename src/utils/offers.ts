import { Offers } from '../types/data-types';

export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function getCityOffers(offers: Offers, cityName: string) {
  return offers.filter((offer) => offer.city.name === cityName);
}
