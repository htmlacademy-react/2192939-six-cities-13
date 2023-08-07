import { MouseEvent, useState } from 'react';
import { SortingType } from '../types/data-types';

type UseSettingProps = {
  onChangeSorting: (value: SortingType) => void;
}

export default function useSorting({ onChangeSorting }: UseSettingProps):
  [boolean, () => void, (evt: MouseEvent<HTMLSpanElement>) => void] {
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
