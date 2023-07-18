import { TOffers } from '../../types/offers';
import OfferCard from '../offer-card';

type TOfferList = {
  offers: TOffers;
};
export default function OfferList({ offers }: TOfferList): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard key={offer.id} offer={offer} />
      ))}
    </div>
  );
}
