import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace, CITIES, SortType} from '../../const';
import {AppProcess} from '../../types/state';

const initialState: AppProcess = {
  city: CITIES[0],
  sortingType: SortType.Popular,
};

export const appProcess = createSlice({
  name: NameSpace.Process,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<{city: string}>) => {
      state.city = action.payload.city;
    },
    changeSorting: (state, action: PayloadAction<{sortingType: SortType}>) => {
      state.sortingType = action.payload.sortingType;
    },
  },
});

export const {changeCity, changeSorting} = appProcess.actions;
