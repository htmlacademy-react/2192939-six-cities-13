import { Cities } from '../../types/data-types';
import classNames from 'classnames';
import { MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectCityAction } from '../../store/action';
import { DEFAULT_SORTING } from '../../constants/settings';
type CitiesListProps = {
  cities: Cities;
  setTypeSorting: (value: string) => void;
};
export default function CitiesList({ cities, setTypeSorting }: CitiesListProps): JSX.Element {
  const selectedCity = useAppSelector((state) => state.cityName);
  const dispatch = useAppDispatch();

  const handleElementClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    if (!evt.currentTarget.textContent) {
      return;
    }
    dispatch(selectCityAction(evt.currentTarget.textContent));
    setTypeSorting(DEFAULT_SORTING);
  };

  return (
    <div className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => (
          <li className="locations__item" key={city} onClick={handleElementClick}>
            <a
              className={classNames('locations__item-link', 'tabs__item', {
                'tabs__item--active': city === selectedCity,
              })}
            >
              <span>{city}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
