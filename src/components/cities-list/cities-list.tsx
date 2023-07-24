import { CITY_DEFAULT } from '../../settings';
import { Cities } from '../../types/offers';
import classNames from 'classnames';

type CitiesListProps = {
  cities: Cities;
};
export default function CitiesList({ cities }: CitiesListProps): JSX.Element {
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city, index) => (
          <li className="locations__item" key={crypto.randomUUID()}>
            <a
              className={classNames('locations__item-link', 'tabs__item', {
                'tabs__item--active': index === CITY_DEFAULT,
              })}
            >
              <span>{city}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
