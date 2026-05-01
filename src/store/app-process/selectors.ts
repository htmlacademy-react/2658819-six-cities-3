import {NameSpace, SortType} from '../../const';
import {State} from '../../types/state';

export const getCity = (state: State): string => state[NameSpace.Process].city;

export const getSortingType = (state: State): SortType => state[NameSpace.Process].sortingType;
