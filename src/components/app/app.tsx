import { Routes, Route } from 'react-router-dom';
import MainPage from '../../pages/main-page';
import LoginPage from '../../pages/login-page';
import FavoritesPage from '../../pages/favorites-page';
import OfferPage from '../../pages/offer-page';
import Page404 from '../../pages/page404';
import { AppRoute, AuthStatus } from '../../settings';
import PrivateRoute from '../private-route';
import { HelmetProvider } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Loader from '../loader';
import { getErrorStatus } from '../../store/app-data/selectors';
import { getAuthStatus } from '../../store/user-process/selectors';
import ErrorScreen from '../../pages/error-screen';
import { useEffect } from 'react';
import { fetchFavoritesAction, fetchOffersAction } from '../../store/api-actions';

export default function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthStatus);
  const hasError = useAppSelector(getErrorStatus);

  useEffect(() => {
    dispatch(fetchOffersAction());
    if (authStatus === AuthStatus.Auth) {
      dispatch(fetchFavoritesAction());
    }
  }, [authStatus, dispatch]);


  if (authStatus === AuthStatus.Unknown) {
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
      <Routes>
        <Route path={AppRoute.Root} element={<MainPage />} />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute >
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route path={`${AppRoute.Offer}/:id`} element={<OfferPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </HelmetProvider>
  );
}
