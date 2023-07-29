import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../../pages/main';
import LoginPage from '../../pages/login';
import FavoritesPage from '../../pages/favorites';
import OfferPage from '../../pages/offer';
import Page404 from '../../pages/404';
import { AppRoute, AuthStatus } from '../../constants/settings';
import PrivateRoute from '../private-route';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from '../scroll-to-top';
import { FullOffers, Offers, Reviews } from '../../types/data-types';
import { useDispatch } from 'react-redux';
import { loadOffersAction } from '../../store/action';

type AppProps = {
  offers: Offers;
  fullOffers: FullOffers;
  reviewsList: Reviews;
  authStatus: AuthStatus;
};
export default function App({
  offers,
  fullOffers,
  reviewsList,
  authStatus = AuthStatus.Auth,
}: AppProps): JSX.Element {

  const dispatch = useDispatch();

  dispatch(loadOffersAction(offers));

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<MainPage authStatus={authStatus} />}
          />
          <Route path={AppRoute.Login} element={<LoginPage />} />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authStatus={authStatus}>
                <FavoritesPage offers={offers} />
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.Offer}/:id`}
            element={
              <OfferPage
                offers={offers}
                fullOffers={fullOffers}
                reviewsList={reviewsList}
                authStatus={authStatus}
              />
            }
          />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
