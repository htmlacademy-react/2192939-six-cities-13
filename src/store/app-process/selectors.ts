import { NameSpace } from '../../settings';
import { Offer, SortingType } from '../../types/data-types';
import { State } from '../state';

export const getCityName = (store: State): string => store[NameSpace.App].cityName;

export const getSortingType = (store: State): SortingType => store[NameSpace.App].sortingType as SortingType;

export const getActiveCard = (store: State): Offer | undefined => store[NameSpace.App].activeCard;
