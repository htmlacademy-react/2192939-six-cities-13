import classNames from 'classnames';
import { FullOffer, Offer, PlaceCardType } from '../../types/data-types';
import PlaceCard from '../place-card';
import { PlacesCard } from '../../settings';

type PlaceListProps = {
  offers: (Offer | FullOffer)[];
  type: PlaceCardType;
}

export default function PlaceList({ offers, type }: PlaceListProps): JSX.Element {
  return (
    <div className={classNames(
      { 'cities__places-list places__list tabs__content': type === PlacesCard.Cities },
      { 'near-places__list places__list': type === PlacesCard.NearPlaces },
      { 'favorites__places': type === PlacesCard.Favorites })}
    >
      {
        offers.map((offer) => (
          <PlaceCard key={offer.id} offer={offer} type={type} data-testid='placeCardTestId' />
        ))
      }
    </div >

  );
}
