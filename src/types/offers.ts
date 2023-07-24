export type TLocation = {
  latitude: number;
  longitude: number;
  zoom: number;
};
export type TCity = {
  name: string;
  location: TLocation;
};

export type TOffer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: TCity;
  location: TLocation;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};

export type TOffers = TOffer[];

export type TFullOffer = {
  id: string;
  title: string;
  description: string;
  type: string;
  price: number;
  images: string[];
  city: TCity;
  location: TLocation;
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

export type TFullOffers = TFullOffer[];

export type TReview = {
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

export type TReviews = TReview[];

export type TReviewCard = {
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

export type TCities = string[];
