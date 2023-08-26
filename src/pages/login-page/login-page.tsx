import { Helmet } from 'react-helmet-async';
import { FormEvent, useEffect, useRef, useState } from 'react';
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
import loginStyles from './login-page.module.css';


export default function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const regexPassword = /^(?=.*\d)(?=.*[a-z])\S*$/i;
  const regexLogin = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
  const randomCity = getRandomCity(CITIES);
  const loginStatus = useAppSelector(getLoginStatus);
  const authStatus = useAppSelector(getAuthStatus);
  const [isCorrectLogin, setIsCorrectLogin] = useState(true);
  const [isCorrectPassword, setIsCorrectPassword] = useState(true);

  useEffect(() => {
    if (authStatus === AuthStatus.Auth) {
      dispatch(redirectToRoute(AppRoute.Root));
    }
  }, [authStatus, dispatch]);

  const handleButtonClick = () => {
    dispatch(selectCityAction(randomCity));
  };

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
    setIsCorrectLogin(true);
    setIsCorrectPassword(true);

    if (loginRef.current && passwordRef.current) {
      if (!regexPassword.test(passwordRef.current.value)) {
        setIsCorrectPassword(false);
        return;
      }

      if (!regexLogin.test(loginRef.current.value)) {
        setIsCorrectLogin(false);
        return;
      }


      dispatch(selectCityAction(DEFAULT_CITY));

      dispatch(loginAction({
        login: loginRef.current.value,
        password: passwordRef.current.value
      }));
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
                {!isCorrectLogin && <p className={loginStyles.login__error}>Enter a valid email</p>}
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
                {!isCorrectPassword &&
                  <p className={loginStyles.password__error}>
                    At least 1 letter and 1 number without spaces
                  </p>}
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
              <Link className="locations__item-link" to={AppRoute.Root} onClick={handleButtonClick}>
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main >
    </div >
  );
}
