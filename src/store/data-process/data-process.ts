import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {DataProcess} from '../../types/state';
import {fetchOffersAction, fetchOfferAction, fetchNearbyOffersAction, fetchReviewsAction, sendCommentAction, fetchFavoriteAction, setFavoriteStatusAction} from '../api-actions';


const initialState: DataProcess = {
  offers: [],
  offer: null,
  nearbyOffers: [],
  reviews: [],
  isOffersDataLoading: false,
  error: null,
  favorites: [],
};

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(sendCommentAction.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
      })
      .addCase(fetchFavoriteAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(setFavoriteStatusAction.fulfilled, (state, action) => {
        const updatedOffer = action.payload;

        state.offers = state.offers.map((offer) =>
          offer.id === updatedOffer.id ? updatedOffer : offer
        );

        if (updatedOffer.isFavorite) {
          // Если добавили в избранное — пушим в массив favorites
          state.favorites.push(updatedOffer);
        } else {
          // Если удалили — фильтруем массив favorites, убирая этот отель
          state.favorites = state.favorites.filter((offer) => offer.id !== updatedOffer.id);
        }

        if (state.offer && state.offer.id === updatedOffer.id) {
          state.offer.isFavorite = updatedOffer.isFavorite;
        }
      });
  }
});

export const {setError} = dataProcess.actions;
