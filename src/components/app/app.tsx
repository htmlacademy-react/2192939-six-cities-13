import { Routes, Route } from 'react-router-dom';
import MainPage from '../../pages/main';
import LoginPage from '../../pages/login';
import FavoritesPage from '../../pages/favorites';
import OfferPage from '../../pages/offer';
import Page404 from '../../pages/404';
import { AppRoute } from '../../settings';
import PrivateRoute from '../private-route';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from '../scroll-to-top';
import { useAppSelector } from '../../hooks';
import Loader from '../loader';
import browserHistory from '../../browser-history';
import HistoryRouter from '../history-route';

export default function App(): JSX.Element {
  const isOffersDataLoading = useAppSelector((store) => store.isOffersDataLoading);
  const authStatus = useAppSelector((store) => store.authStatus);

  if (isOffersDataLoading) {
    return (
      <Loader />
    );
  }
  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
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
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.Offer}/:id`}
            element={
              <OfferPage authStatus={authStatus} />
            }
          />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}
