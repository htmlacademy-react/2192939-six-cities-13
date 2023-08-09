export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};
export type City = {
  name: string;
  location: Location;
};

export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};

export type Offers = Offer[];

export type FullOffer = Omit<Offer, 'previewImage'> & {
  description: string;
  images: string[];
  goods: string[];
  host: {
    isPro: boolean;
    name: string;
    avatarUrl: string;
  };
  bedrooms: number;
  maxAdults: number;
};

export type Review = {
  id: string;
  comment: string;
  date: string;
  rating: number;
  user: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
};

export type Reviews = Review[];

export type StylesForMap = {
  width: string;
  height: string;
  margin?: string;
};

export type TypeCard = {
  Cities: 'cities';
  NearPlaces: 'near-places';
  Favorites: 'favorites';
};

export type SortingType =
  | 'popular'
  | 'priceToHigh'
  | 'priceToLow'
  | 'raitedFirst';

export type PlaceCardType = 'cities' | 'near-places' | 'favorites';

export type Cities = string[]
