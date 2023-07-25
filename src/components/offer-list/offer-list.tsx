import { Offers } from '../../types/types';
import OfferCard from '../offer-card';

type OfferListProps = {
  offers: Offers;
};
export default function OfferList({ offers }: OfferListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard key={offer.id} offer={offer} />
      ))}
    </div>
  );
}
