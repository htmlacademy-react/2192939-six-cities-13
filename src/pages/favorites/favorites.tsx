import { Helmet } from 'react-helmet-async';
import { Offers } from '../../types/data-types';
import Header from '../../components/header';
import PlaceCard from '../../components/place-card';
import { TypeCard } from '../../settings';
import { Link } from 'react-router-dom';

type FavoritesPageProps = {
  offers: Offers;
};
export default function FavoritesPage({
  offers,
}: FavoritesPageProps): JSX.Element {
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
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Amsterdam</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  {offers.map(
                    (offer) =>
                      offer.isFavorite && (
                        <PlaceCard key={offer.id} offer={offer} type={TypeCard.Favorites} />
                      )
                  )}
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>
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
    </div>
  );
}
