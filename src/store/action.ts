import {createAction} from '@reduxjs/toolkit';
import { SortType } from '../const';

export const changeCity = createAction<{city: string}>('city/changeCity');

export const setOffers = createAction('city/setOffers');

export const changeSortType = createAction<{type: SortType}>('offers/changeSortType');
