import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../../pages/main';
import LoginPage from '../../pages/login';
import FavoritesPage from '../../pages/favorites';
import OfferPage from '../../pages/offer';
import Page404 from '../../pages/404';
import { AppRoute, AuthStatus } from '../../settings';
import PrivateRoute from '../private-route';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from '../scroll-to-top';
import { TOffers } from '../../types/offers';

type TAppProps = {
  offers: TOffers;
  authStatus: AuthStatus;
};
export default function App({
  offers,
  authStatus = AuthStatus.Auth,
}: TAppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<MainPage offers={offers} authStatus={authStatus} />}
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
            path={AppRoute.OfferId}
            element={<OfferPage authStatus={authStatus} />}
          />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
