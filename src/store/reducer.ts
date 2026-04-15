import {createReducer} from '@reduxjs/toolkit';
import {changeCity, setOffers, changeSortType} from './action';
import {offers} from '../mocks/offers';
import {AuthorizationStatus, SortType} from '../const';
import {Offer} from '../types/offer';

type InitialState = {
  city: string;
  offers: Offer[];
  sortType: SortType;
  authorizationStatus: AuthorizationStatus;
};

const initialState: InitialState = {
  city: 'Paris', // Начальный город по ТЗ — Париж
  offers: offers,
  authorizationStatus: AuthorizationStatus.NoAuth,
  sortType: SortType.Popular,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeSortType, (state, action) => {
      state.sortType = action.payload.type;
    })
    .addCase(changeCity, (state, action) => {
      state.city = action.payload.city;
    })
    .addCase(setOffers, (state) => {
      state.offers = offers;
    });
});

