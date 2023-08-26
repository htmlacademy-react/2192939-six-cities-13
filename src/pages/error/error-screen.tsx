import { useAppDispatch } from '../../hooks';
import { fetchOffersAction } from '../../store/api-actions';
import ErrorScreenStyles from './error-screen.module.css';

export default function ErrorScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className="page page--gray page--login">
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className={`login__title ${ErrorScreenStyles.cities__status}"`}>Failed to load data from server</h1>
            <button
              onClick={() => {
                dispatch(fetchOffersAction());
              }}
              type="button"
              className={ErrorScreenStyles.button__error}
            >
              To try one more time ...
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}
