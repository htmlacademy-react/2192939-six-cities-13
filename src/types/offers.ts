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

export type FullOffer = {
  id: string;
  title: string;
  description: string;
  type: string;
  price: number;
  images: string[];
  city: City;
  location: Location;
  goods: string[];
  host: {
    isPro: boolean;
    name: string;
    avatarUrl: string;
  };
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  bedrooms: number;
  maxAdults: number;
};

export type FullOffers = FullOffer[];

export type Review = {
  id: string;
  review: {
    id: string;
    comment: string;
    date: string;
    rating: number;
    user: {
      name: string;
      avatarUrl: string;
      isPro: boolean;
    };
  }[];
};

export type Reviews = Review[];

export type ReviewCardType = {
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

export type Cities = string[];
