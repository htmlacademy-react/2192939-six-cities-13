import { MouseEvent, useState } from 'react';
import { SortingType } from '../types/data-types';

export default function useSorting({ onChangeSorting }: {
  onChangeSorting: (value: SortingType) => void;
}): [boolean, () => void, (evt: MouseEvent<HTMLSpanElement>) => void] {
  const [changeSorting, setChangeSorting] = useState(false);


  const handleChangeSorting = (): void => {
    setChangeSorting(!changeSorting);
  };

  const handleTypeSortingClick = (evt: MouseEvent<HTMLSpanElement>): void => {
    evt.preventDefault();
    if (!evt.currentTarget.dataset.sorttype) {
      return;
    }
    onChangeSorting(evt.currentTarget.dataset.sorttype as SortingType);
    setChangeSorting(!changeSorting);
  };

  return [changeSorting, handleChangeSorting, handleTypeSortingClick];
}
