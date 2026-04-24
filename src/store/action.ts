import {createAction} from '@reduxjs/toolkit';
import {SortType, AuthorizationStatus, AppRoute} from '../const';
import {Offer} from '../types/offer';

export const changeCity = createAction<{city: string}>('city/changeCity');

export const setOffers = createAction<Offer[]>('city/setOffers');

export const changeSortType = createAction<{type: SortType}>('offers/changeSortType');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const redirectToRoute = createAction<AppRoute>('user/redirectToRoute');

export const setUserEmail = createAction<string | null>('user/setUserEmail');

