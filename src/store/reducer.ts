import {createReducer} from '@reduxjs/toolkit';
import {changeCity, setOffers, changeSortType, setOffersDataLoadingStatus, requireAuthorization, setUserEmail} from './action';
import {AuthorizationStatus, SortType} from '../const';
import {Offer} from '../types/offer';

type InitialState = {
  city: string;
  offers: Offer[];
  sortType: SortType;
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;
  userEmail: string | null;
};

const initialState: InitialState = {
  city: 'Paris', // Начальный город по ТЗ — Париж
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  sortType: SortType.Popular,
  isOffersDataLoading: false,
  userEmail: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeSortType, (state, action) => {
      state.sortType = action.payload.type;
    })
    .addCase(changeCity, (state, action) => {
      state.city = action.payload.city;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserEmail, (state, action) => {
      state.userEmail = action.payload;
    });
});

