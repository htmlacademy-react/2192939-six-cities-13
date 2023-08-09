import { Helmet } from 'react-helmet-async';
import Header from '../../components/header';
import { Link } from 'react-router-dom';
import PlaceList from '../../components/place-list';
import { CITIES, PlacesCard } from '../../settings';
import { useAppSelector } from '../../hooks';
import { getOffers } from '../../store/app-data/selectors';

export default function FavoritesPage(): JSX.Element {

  const offers = useAppSelector(getOffers);

  const favoriteOffers = offers.filter((offer) => offer.isFavorite);
  return (
    <div className="page">
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {CITIES.map((city) => {
                const cityFavoriteOffers = favoriteOffers.filter((offer) => offer.city.name === city);
                return (
                  cityFavoriteOffers.length ?
                    <li className="favorites__locations-items" key={city} >
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <a className="locations__item-link" href="#">
                            <span>{city}</span>
                          </a>
                        </div>
                      </div>
                      <PlaceList offers={cityFavoriteOffers} type={PlacesCard.Favorites} />
                    </li> : null
                );
              })}
            </ul>
          </section>
        </div>
      </main >
      <footer className="footer container">
        <Link className="footer__logo-link" to="/">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </Link>
      </footer>
    </div >
  );
}
