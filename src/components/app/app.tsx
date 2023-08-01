import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../../pages/main';
// import LoginPage from '../../pages/login';
// import FavoritesPage from '../../pages/favorites';
// import OfferPage from '../../pages/offer';
import Page404 from '../../pages/404';
import { AppRoute, AuthStatus } from '../../settings';
// import PrivateRoute from '../private-route';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from '../scroll-to-top';
import { useAppSelector } from '../../hooks';
// import { useDispatch } from 'react-redux';
// import { loadOffersAction } from '../../store/action';
import Loader from '../loader';

export default function App(): JSX.Element {
  const isOffersDataLoading = useAppSelector((store) => store.isOffersDataLoading);

  if (isOffersDataLoading) {
    return (
      <Loader />
    );
  }
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<MainPage authStatus={AuthStatus.Auth} />}
          />
          {/* <Route path={AppRoute.Login} element={<LoginPage />} />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authStatus={AuthStatus.Auth}>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.Offer}/:id`}
            element={
              <OfferPage />
            }
          /> */}
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
