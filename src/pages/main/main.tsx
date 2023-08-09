import { Helmet } from 'react-helmet-async';
import Header from '../../components/header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Cities from '../../components/cities';
import { getAuthStatus } from '../../store/user-process/selectors';
import { useEffect } from 'react';
import { AuthStatus } from '../../settings';
import { fetchFavoritesAction } from '../../store/api-actions';
import { getFavorites } from '../../store/app-data/selectors';
import { setFavoritesCount } from '../../store/app-process/app-process';

export default function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthStatus);
  const favorites = useAppSelector(getFavorites);

  useEffect(() => {
    let isMainPageMounted = true;

    if (isMainPageMounted && authStatus === AuthStatus.Auth) {
      dispatch(fetchFavoritesAction());
      dispatch(setFavoritesCount(favorites.length));
    }
    return () => {
      isMainPageMounted = false;
    };
  }, [authStatus, dispatch, favorites.length]);

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <Header authStatus={authStatus} />
      <Cities />
    </div>
  );
}
