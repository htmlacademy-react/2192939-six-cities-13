import { Helmet } from 'react-helmet-async';
import { FormEvent, useEffect, useRef } from 'react';
import LogoLeft from '../../components/logo-left';
import { loginAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute, AuthStatus, CITIES, DEFAULT_CITY, Status } from '../../settings';
import { Link } from 'react-router-dom';
import { getRandomCity } from '../../utils/offers';
import { selectCityAction } from '../../store/app-data/app-data';
import { getAuthStatus, getLoginStatus } from '../../store/user-process/selectors';
import { setLoginStatus } from '../../store/user-process/user-process';
import { redirectToRoute } from '../../store/action';


export default function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const regex = /^(?=.*\d)(?=.*[a-z])\S*$/i;
  const randomCity = getRandomCity(CITIES);
  const loginStatus = useAppSelector(getLoginStatus);
  const authStatus = useAppSelector(getAuthStatus);

  useEffect(() => {
    if (authStatus === AuthStatus.Auth) {
      dispatch(redirectToRoute(AppRoute.Root));
    }
  }, [authStatus, dispatch]);

  useEffect(() => {
    dispatch(selectCityAction(randomCity));
  });

  useEffect(() => {
    if (loginStatus === Status.Success && loginRef.current && passwordRef.current) {
      dispatch(setLoginStatus(Status.Idle));
      loginRef.current.value = '';
      passwordRef.current.value = '';
      dispatch(redirectToRoute(AppRoute.Root));
    }
  }, [dispatch, loginStatus]);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current && passwordRef.current) {
      if (!regex.test(passwordRef.current.value)) {
        return;
      }

      dispatch(selectCityAction(DEFAULT_CITY));

      dispatch(loginAction({
        login: loginRef.current.value,
        password: passwordRef.current.value
      }));
      dispatch(redirectToRoute(AppRoute.Root));
    }
  };

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>6 cities: authorization</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <LogoLeft />
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  ref={loginRef}
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  data-testid='loginElement'
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  ref={passwordRef}
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  data-testid='passwordElement'
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Root}>
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main >
    </div >
  );
}
