import { Helmet } from 'react-helmet-async';
import Header from '../../components/header';
import { Link } from 'react-router-dom';
import PlaceList from '../../components/place-list';
import { CITIES, PlacesCard } from '../../settings';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFavorites, getIsFavoritesLoading } from '../../store/app-data/selectors';
import FavoritesEmpty from '../../components/favorites-empty';
import { fetchFavoritesAction } from '../../store/api-actions';
import { useEffect } from 'react';
import Loader from '../../components/loader';

export default function FavoritesPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const favoriteOffers = useAppSelector(getFavorites);
  const favoritesCount = favoriteOffers.length;
  const isFavoritesLoading = useAppSelector(getIsFavoritesLoading);

  useEffect(() => {
    let isOfferPageMounted = true;

    if (isOfferPageMounted) {
      dispatch(fetchFavoritesAction());
    }

    return () => {
      isOfferPageMounted = false;
    };
  }, [dispatch]);

  if (isFavoritesLoading) {
    return (
      <Loader />
    );
  }

  if (!favoritesCount) {
    return (
      <FavoritesEmpty />
    );
  }
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
