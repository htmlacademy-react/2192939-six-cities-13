import classNames from 'classnames';
import { MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { DEFAULT_SORTING } from '../../settings';
import { getCurrentCityName } from '../../store/app-data/selectors';
import { selectCityAction, setSortingType } from '../../store/app-data/app-data';

type CitiesListProps = {
  cities: string[];
};

export default function CitiesList({ cities }: CitiesListProps): JSX.Element {
  const selectedCity = useAppSelector(getCurrentCityName);
  const dispatch = useAppDispatch();

  const handleElementClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    if (!evt.currentTarget.textContent) {
      return;
    }
    dispatch(selectCityAction(evt.currentTarget.textContent));
    dispatch(setSortingType(DEFAULT_SORTING));
  };

  return (
    <div className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => (
          <li className="locations__item" key={city} onClick={handleElementClick}>
            <a
              className={classNames(
                'locations__item-link',
                'tabs__item',
                { 'tabs__item--active': city === selectedCity, })}
            >
              <span data-testid='cityNameElement'>{city}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
