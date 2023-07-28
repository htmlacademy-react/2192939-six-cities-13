import { Helmet } from 'react-helmet-async';
import { Offers, Offer } from '../../types/data-types';
import Header from '../../components/header';
import { AuthStatus, CITIES, StylesForMapMainPage } from '../../settings';
import CitiesList from '../../components/cities-list';
import Map from '../../components/map';
import PlaceCard from '../../components/place-card';
import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import { getCityOffers } from '../../utils/offers';
import classNames from 'classnames';

type MainPageProps = {
  offers: Offers;
  authStatus: AuthStatus;
};
export default function MainPage({
  offers,
  authStatus,
}: MainPageProps): JSX.Element {
  const [activeCard, setActiveCard] = useState<Offer | undefined>(undefined);


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
            <div className="cities__places-container cities__places-container--empty container">
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
                </div>
              </section>
              <div className="cities__right-section"></div>
            </div>}
          {cityOffers.length &&
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {cityOffers.length} places to stay in {cityName}
                </b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  <span> </span>
                  <span className="places__sorting-type" tabIndex={0}>
                    Popular
                    <svg className="places__sorting-arrow" width={7} height={4}>
                      <use xlinkHref="#icon-arrow-select" />
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom places__options--opened">
                    <li
                      className="places__option places__option--active"
                      tabIndex={0}
                    >
                      Popular
                    </li>
                    <li className="places__option" tabIndex={0}>
                      Price: low to high
                    </li>
                    <li className="places__option" tabIndex={0}>
                      Price: high to low
                    </li>
                    <li className="places__option" tabIndex={0}>
                      Top rated first
                    </li>
                  </ul>
                </form>
                <div className="cities__places-list places__list tabs__content" >
                  {
                    cityOffers.map((offer) => (
                      <PlaceCard key={offer.id} offer={offer} type={'cities'}
                        onCardEnter={handleMouseEnter}
                        onCardLeave={handleMouseLeave}
                      />
                    ))
                  }
                </div >
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map city={cityOffers[0].city} offers={cityOffers} styles={StylesForMapMainPage} selectedPlace={activeCard} />
                </section>
              </div>
            </div>}
        </div>
      </main>
    </div>
  );
}
