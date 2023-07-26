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

export type FullOffers = FullOffer[];

export type ReviewCardType = {
  id: string;
  comment: string;
  date: Date;
  rating: number;
  user: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
};

export type Review = {
  id: string;
  review: ReviewCardType[];
};

export type Reviews = Review[];

export type Cities = string[];

export type StylesForMap = {
  width: string;
  height: string;
  margin?: string;
};

export type TypeCard = {
  Cities: string;
  NearPlaces: string;
};
