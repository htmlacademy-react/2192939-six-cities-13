import { useAppDispatch } from '../../hooks';
import { fetchOffersAction } from '../../store/api-actions';
import './styles.css';

export default function ErrorScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className="cities__places-container cities__places-container--empty container">
      <div className="cities__status-wrapper tabs__content">
        <b className="cities__status cities__status--error" >Failed to load data from server</b>
        <button
          onClick={() => {
            dispatch(fetchOffersAction());
          }}
          type="button"
          className='button__error'
        >
          To try one more time ...
        </button>
      </div>
    </div>
  );
}
