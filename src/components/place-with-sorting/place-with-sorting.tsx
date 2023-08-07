import PlaceList from '../place-list';
import Sorting from '../sorting';
import { Offers, SortingType } from '../../types/data-types';
import { PlacesCard } from '../../settings';
import { getSortedOffersBy } from '../../utils/offers';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSortingType } from '../../store/action';

type PlaceWithSortingProps = {
  cityOffers: Offers;
}

export default function PlaceWithSorting({ cityOffers }: PlaceWithSortingProps) {
  const dispatch = useAppDispatch();
  const typeSorting = useAppSelector((store) => store.sortingType);

  function handleChangeSorting(sortType: SortingType) {
    dispatch(setSortingType(sortType));
  }

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
