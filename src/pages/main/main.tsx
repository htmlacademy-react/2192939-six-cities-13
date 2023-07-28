import { Helmet } from 'react-helmet-async';
import { Offer } from '../../types/data-types';
import Header from '../../components/header';
import { AuthStatus, CITIES, StylesForMapMainPage } from '../../settings';
import CitiesList from '../../components/cities-list';
import Map from '../../components/map';
import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import { getCityOffers } from '../../utils/offers';
import classNames from 'classnames';
import PlaceListEmpty from '../../components/place-list-empty';
import Sorting from '../../components/sorting';
import PlaceList from '../../components/place-list';

type MainPageProps = {
  authStatus: AuthStatus;
};
export default function MainPage({ authStatus, }: MainPageProps): JSX.Element {

  const [activeCard, setActiveCard] = useState<Offer | undefined>(undefined);
  const offers = useAppSelector((store) => store.offers);
  const cityName = useAppSelector((store) => store.cityName);
  const cityOffers = getCityOffers(offers, cityName);

  function handleMouseEnter(cardId: string) {
    const currentPlace = offers.find((offer) => offer.id === cardId);
    setActiveCard(currentPlace);
  }

  function handleMouseLeave() {
    setActiveCard(undefined);
  }

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <Header authStatus={authStatus} />
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
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {cityOffers.length} places to stay in {cityName}
                </b>
                <Sorting />
                <PlaceList offers={cityOffers} type={'cities'}
                  onCardEnter={handleMouseEnter}
                  onCardLeave={handleMouseLeave}
                />
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map city={cityOffers[0].city} offers={cityOffers}
                    styles={StylesForMapMainPage} selectedPlace={activeCard}
                  />
                </section>
              </div>
            </div>}
        </div>
      </main>
    </div>
  );
}
