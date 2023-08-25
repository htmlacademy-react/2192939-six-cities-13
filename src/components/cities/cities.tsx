import classNames from 'classnames';
import { CITIES, DEFAULT_CITY, PlacesCard, StylesForMapMainPage } from '../../settings';
import CitiesList from '../../components/cities-list';
import Map from '../../components/map';
import PlaceListEmpty from '../../components/place-list-empty';
import { useRef, useState, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getOffers, getSortingType, getCurrentCityName } from '../../store/app-data/selectors';
import Sorting from '../sorting';
import PlaceList from '../place-list';
import { getSortedOffersBy } from '../../utils/offers';
import { setSortingType } from '../../store/app-data/app-data';
import { SortingType } from '../../types/data-types';

export default function Cities(): JSX.Element {
  const [prevCity, setPrevCity] = useState(DEFAULT_CITY);
  const currentCityName = useAppSelector(getCurrentCityName);
  const scrollRef = useRef<HTMLDivElement>(null);
  const offers = useAppSelector(getOffers);
  const dispatch = useAppDispatch();
  const typeSorting = useAppSelector(getSortingType);

  const handleChangeSorting = useCallback((sortType: SortingType) => {
    dispatch(setSortingType(sortType));
  }, [dispatch]);

  useEffect(() => {
    if (prevCity !== currentCityName) {
      scrollRef.current?.scroll(0, 0);
      setPrevCity(currentCityName);
    }
  }, [currentCityName, prevCity]);

  const cityOffers = offers.filter((offer) => offer.city.name === currentCityName);

  return (
    <main className={classNames('page__main', 'page__main--index',
      { 'page__main--index-empty': !cityOffers.length })}
    >
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <CitiesList cities={CITIES} />
      </div>
      <div className="cities">
        {!cityOffers.length && <PlaceListEmpty />}
        {cityOffers.length &&
          <div className="cities__places-container container">
            <section className="cities__places places" ref={scrollRef}>
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {cityOffers.length} {`place${cityOffers.length === 1 ? '' : 's'}`} to stay in {currentCityName}
              </b>
              <Sorting onChangeSorting={handleChangeSorting} typeSorting={typeSorting} />
              <PlaceList
                offers={getSortedOffersBy(cityOffers, typeSorting)}
                type={PlacesCard.Cities}
              />
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
