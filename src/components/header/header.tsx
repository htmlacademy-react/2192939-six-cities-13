import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute, AuthStatus } from '../../settings';
import { fetchOffersAction, logoutAction } from '../../store/api-actions';
import { getFavorites } from '../../store/app-data/selectors';
import { getAuthStatus, getUserName } from '../../store/user-process/selectors';
import LogoLeft from '../logo-left';
import { Link, useNavigate } from 'react-router-dom';

export default function Header(): JSX.Element {
  const userName = useAppSelector(getUserName);
  const authStatus = useAppSelector(getAuthStatus);
  const favoritesCount = useAppSelector(getFavorites).length;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandle = (): void => {
    dispatch(logoutAction());
    dispatch(fetchOffersAction());
    if (authStatus === AuthStatus.NoAuth) {
      navigate(AppRoute.Login);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <LogoLeft />
          <nav className="header__nav">
            <ul className="header__nav-list">
              {authStatus === AuthStatus.Auth ? (
                <>
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to={AppRoute.Favorites}
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__user-name user__name">
                        {userName}
                      </span>
                      <span className="header__favorite-count">{favoritesCount}</span>
                    </Link>
                  </li>
                  <li className="header__nav-item" >
                    <a className="header__nav-link" onClick={logoutHandle}>
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </>
              ) : (
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={AppRoute.Login}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
