import classNames from 'classnames';
import { Offers } from '../../types/data-types';
import PlaceCard from '../place-card';
import { useRef, useEffect } from 'react';

type PlaceListProps = {
  offers: Offers;
  type: 'cities' | 'near-places' | 'favorites';
  onCardEnter?: (cardId: string) => void;
  onCardLeave?: () => void;

}

export default function PlaceList({ offers, type, onCardEnter, onCardLeave }: PlaceListProps): JSX.Element {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(
    () => {
      elementRef.current?.scrollTo(0, 0);
    }
  );

  return (
    <div className={classNames(
      { 'cities__places-list places__list tabs__content': type === 'cities' },
      { 'near-places__list places__list': type === 'near-places' },
      { 'favorites__places': type === 'favorites' })} ref={elementRef}
    >
      {
        offers.map((offer) => (
          <PlaceCard key={offer.id} offer={offer} type={type}
            onCardEnter={onCardEnter}
            onCardLeave={onCardLeave}
          />
        ))
      }
    </div >

  );
}
