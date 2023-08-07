import classNames from 'classnames';
import { SORTING_MAPS } from '../../settings';
import { SortingType } from '../../types/data-types';
import useSorting from '../../hooks/use-sorting';

type SortingProps = {
  onChangeSorting: (value: SortingType) => void;
  typeSorting: SortingType;
}

export default function Sorting({ onChangeSorting, typeSorting }: SortingProps): JSX.Element {
  const [changeSorting, handleChangeSorting, handleTypeSortingClick] = useSorting({ onChangeSorting });

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
          <li
            className={classNames(
              'places__option',
              { 'places__option--active': typeSorting === sortingMap.type }
            )}
            tabIndex={0}
            key={sortingMap.type}
            data-sorttype={sortingMap.type}
            onClick={handleTypeSortingClick}
          >
            {sortingMap.title}
          </li>
        ))}
      </ul>
    </form>
  );
}
