import { useAppDispatch } from '../../hooks';
import { fetchOffersAction } from '../../store/api-actions';
import './styles.css';

export default function ErrorScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className="page page--gray page--login">
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title cities__status--error">Failed to load data from server</h1>
            <button
              onClick={() => {
                dispatch(fetchOffersAction());
              }}
              type="button"
              className='button__error'
            >
              To try one more time ...
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}
