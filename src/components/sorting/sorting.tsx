import classNames from 'classnames';
import { useState } from 'react';
import { SORTING_MAPS } from '../../settings';
import { UIEvent } from 'react';

type SortingProps = {
  onChangeSorting: (value: string) => void;
  typeSorting: string;
}

export default function Sorting({ onChangeSorting, typeSorting }: SortingProps): JSX.Element {
  const [changeSorting, setChangeSorting] = useState(false);


  const handleChangeSorting = () => {
    setChangeSorting(!changeSorting);
  };

  const handleTypeSortingClick = (evt: UIEvent<HTMLElement>): void => {
    evt.preventDefault();
    if (!evt.currentTarget.dataset.sorttype) {
      return;
    }
    onChangeSorting(evt.currentTarget.dataset.sorttype);
    setChangeSorting(!changeSorting);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span> </span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleChangeSorting}>
        {SORTING_MAPS.find((sortingMap) => sortingMap.type === typeSorting)?.title}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={classNames(
        'places__options places__options--custom',
        { 'places__options--opened': changeSorting }
      )}
      >
        {SORTING_MAPS.map((sortingMap) => (
          <li className={classNames(
            'places__option',
            { 'places__option--active': typeSorting === sortingMap.type }
          )} tabIndex={0} key={sortingMap.type} data-sorttype={sortingMap.type} onClick={handleTypeSortingClick}
          >
            {sortingMap.title}
          </li>
        ))}
      </ul>
    </form>
  );
}
