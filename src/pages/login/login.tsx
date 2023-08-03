import { Helmet } from 'react-helmet-async';
import { ChangeEventHandler, FormEvent, useRef, useState, } from 'react';
import LogoLeft from '../../components/logo-left';
import { useNavigate } from 'react-router-dom';
import { loginAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks';
import { AppRoute, CITIES } from '../../settings';
import { Cities } from '../../types/data-types';
import { selectCityAction } from '../../store/action';
import { Link } from 'react-router-dom';

function randomInteger(min: number, max: number): number {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

function getRandomCity(cities: Cities): string {
  const index = randomInteger(0, cities.length - 1);

  return cities[index];
}

export default function LoginPage(): JSX.Element {
  const [isCorrectPassword, setIsCorrectPassword] = useState<boolean>(false);
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const regex = /^(?=.*\d)(?=.*[a-z])\S*$/i;
  const randomCity = getRandomCity(CITIES);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  dispatch(selectCityAction(randomCity));

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      dispatch(loginAction({
        login: loginRef.current.value,
        password: passwordRef.current.value
      }));

      navigate(AppRoute.Root);
    }
  };


  const handleInputPassword: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }): void => {
    if (regex.test(target.value)) {
      setIsCorrectPassword(true);
    } else {
      setIsCorrectPassword(false);
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
                  onChange={handleInputPassword}
                />
                {!isCorrectPassword &&
                  <p style={{ 'color': 'red', 'marginTop': -24 }}>The password must have at least one letter and one symbol and no spaces</p>}
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
