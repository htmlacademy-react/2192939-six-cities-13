import PlaceList from '../place-list';
import Sorting from '../sorting';
import { Offers, SortingType } from '../../types/data-types';
import { PlacesCard } from '../../settings';
import { getSortedOffersBy } from '../../utils/offers';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSortingType } from '../../store/action';
import { useCallback } from 'react';


type PlaceWithSortingProps = {
  cityOffers: Offers;
}

export default function PlaceWithSorting({ cityOffers }: PlaceWithSortingProps) {
  const dispatch = useAppDispatch();
  const typeSorting = useAppSelector((store) => store.sortingType);

  const handleChangeSorting = useCallback((sortType: SortingType) => {
    dispatch(setSortingType(sortType));
  }, [dispatch]);

  return (
    <>
      <Sorting onChangeSorting={handleChangeSorting} typeSorting={typeSorting} />
      <PlaceList
        offers={getSortedOffersBy(cityOffers, typeSorting)}
        type={PlacesCard.Cities}
      />
    </>
  );
}
