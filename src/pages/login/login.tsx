import { Helmet } from 'react-helmet-async';
import { FormEvent, useEffect, useRef } from 'react';
import LogoLeft from '../../components/logo-left';
import { loginAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks';
import { AppRoute, CITIES, DEFAULT_CITY } from '../../settings';
import { selectCityAction } from '../../store/app-process/app-process';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getRandomCity } from '../../utils/offers';


export default function LoginPage(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const regex = /^(?=.*\d)(?=.*[a-z])\S*$/i;
  const randomCity = getRandomCity(CITIES);

  const dispatch = useAppDispatch();

  useEffect(() => {
    let isLoginMounted = true;

    if (isLoginMounted) {
      dispatch(selectCityAction(randomCity));
    }

    return () => {
      isLoginMounted = false;
    };
  });

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      if (!regex.test(passwordRef.current.value)) {
        toast.warn('The password must have at least one letter and one symbol and no spaces');
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
