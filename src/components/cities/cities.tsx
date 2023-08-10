import classNames from 'classnames';
import { CITIES, StylesForMapMainPage } from '../../settings';
import CitiesList from '../../components/cities-list';
import Map from '../../components/map';
import PlaceListEmpty from '../../components/place-list-empty';
import PlaceWithSorting from '../place-with-sorting';
import { useRef } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { useAppSelector } from '../../hooks';
import { getCityName } from '../../store/app-process/selectors';
import { getOffers } from '../../store/app-data/selectors';

export default function Cities(): JSX.Element {

  const cityName = useAppSelector(getCityName);
  const scrollRef = useRef<HTMLDivElement>(null);

  const cityOffersSelector = createSelector(
    getOffers,
    (offers) => offers.filter((offer) => offer.city.name === cityName)
  );
  const cityOffers = useAppSelector(cityOffersSelector);

  return (
    <main className={classNames('page__main', 'page__main--index',
      { 'page__main--index-empty': !cityOffers.length })}
    >
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <CitiesList cities={CITIES} />
      </div>
      <div className="cities">
        {!cityOffers.length &&
          <PlaceListEmpty />}
        {cityOffers.length &&
          <div className="cities__places-container container">
            <section className="cities__places places" ref={scrollRef}>
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {cityOffers.length} places to stay in {cityName}
              </b>
              <PlaceWithSorting cityOffers={cityOffers} />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map city={cityOffers[0].city} offers={cityOffers}
                  styles={StylesForMapMainPage}
                />
              </section>
            </div>
          </div>}
      </div>
    </main>
  );
}
