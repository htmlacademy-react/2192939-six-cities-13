import { Routes, Route } from 'react-router-dom';
import MainPage from '../../pages/main';
import LoginPage from '../../pages/login';
import FavoritesPage from '../../pages/favorites';
import OfferPage from '../../pages/offer';
import Page404 from '../../pages/404';
import { AppRoute, AuthStatus } from '../../settings';
import PrivateRoute from '../private-route';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from '../scroll-to-top';
import { useAppSelector } from '../../hooks';
import Loader from '../loader';
import browserHistory from '../../browser-history';
import HistoryRouter from '../history-route';
import { getErrorStatus, getIsOffersDataLoading } from '../../store/app-data/selectors';
import { getAuthStatus } from '../../store/user-process/selectors';
import ErrorScreen from '../../pages/error';

export default function App(): JSX.Element {
  const isOffersDataLoading = useAppSelector(getIsOffersDataLoading);
  const authStatus = useAppSelector(getAuthStatus);
  const hasError = useAppSelector(getErrorStatus);

  if (authStatus === AuthStatus.Unknown || isOffersDataLoading) {
    return (
      <Loader />
    );
  }

  if (hasError) {
    return (
      <ErrorScreen />
    );
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <ScrollToTop />
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<MainPage />}
          />
          <Route path={AppRoute.Login} element={<LoginPage />} />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.Offer}/:id`}
            element={
              <OfferPage />
            }
          />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}
