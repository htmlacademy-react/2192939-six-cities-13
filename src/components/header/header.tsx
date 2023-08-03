import { useAppSelector } from '../../hooks';
import { AppRoute, AuthStatus } from '../../settings';
import LogoLeft from '../logo-left';
import { Link } from 'react-router-dom';

type HeaderProps = {
  authStatus?: AuthStatus;
};

export default function Header({
  authStatus = AuthStatus.Auth,
}: HeaderProps): JSX.Element {
  const userName = useAppSelector((state) => state.userName);
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
                      <span className="header__favorite-count">3</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <a className="header__nav-link" href="#">
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
