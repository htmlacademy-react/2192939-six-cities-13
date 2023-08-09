import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute, AuthStatus } from '../../settings';
import { logoutAction } from '../../store/api-actions';
import { getUserName } from '../../store/user-process/selectors';
import LogoLeft from '../logo-left';
import { Link } from 'react-router-dom';

type HeaderProps = {
  authStatus?: AuthStatus;
};

export default function Header({
  authStatus = AuthStatus.Auth,
}: HeaderProps): JSX.Element {
  const userName = useAppSelector(getUserName);
  const dispatch = useAppDispatch();

  const logoutHandle = () => {
    dispatch(logoutAction());
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
                      <span className="header__favorite-count">3</span>
                    </Link>
                  </li>
                  <li className="header__nav-item" >
                    <Link className="header__nav-link" to={AppRoute.Root} onClick={logoutHandle}>
                      <span className="header__signout">Sign out</span>
                    </Link>
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
