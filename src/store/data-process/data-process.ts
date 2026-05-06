import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {DataProcess} from '../../types/state';
import {
  fetchOffersAction,
  fetchOfferAction,
  fetchNearbyOffersAction,
  fetchReviewsAction,
  sendCommentAction,
  fetchFavoriteAction,
  setFavoriteStatusAction,
  logoutAction
} from '../api-actions';


const initialState: DataProcess = {
  offers: [],
  offer: null,
  nearbyOffers: [],
  reviews: [],
  isOffersDataLoading: false,
  hasError: false,
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
        state.hasError = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
        state.hasError = true;
      })
      .addCase(fetchOfferAction.pending, (state) => {
        state.hasError = false;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.hasError = false;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.hasError = true;
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

        state.offers = state.offers.map((offer) => {
          const isFavorite = action.payload.some((favoriteOffer) => favoriteOffer.id === offer.id);
          return {...offer, isFavorite};
        });
        state.nearbyOffers = state.nearbyOffers.map((nearbyOffer) => {
          const isFavorite = action.payload.some((favoriteOffer) => favoriteOffer.id === nearbyOffer.id);
          return {...nearbyOffer, isFavorite};
        });
      })
      .addCase(setFavoriteStatusAction.fulfilled, (state, action) => {
        const updatedOffer = action.payload;

        state.offers = state.offers.map((offer) =>
          offer.id === updatedOffer.id ? updatedOffer : offer
        );

        state.nearbyOffers = state.nearbyOffers.map((nearbyOffer) =>
          nearbyOffer.id === updatedOffer.id ? updatedOffer : nearbyOffer
        );

        if (updatedOffer.isFavorite) {
          state.favorites.push(updatedOffer);
        } else {
          state.favorites = state.favorites.filter((offer) => offer.id !== updatedOffer.id);
        }

        if (state.offer && state.offer.id === updatedOffer.id) {
          state.offer.isFavorite = updatedOffer.isFavorite;
        }
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.favorites = [];
        state.offers = state.offers.map((offer) => ({...offer, isFavorite: false}));
        state.nearbyOffers = state.nearbyOffers.map((offer) => ({...offer, isFavorite: false}));
        if (state.offer) {
          state.offer.isFavorite = false;
        }
      });
  }
});

export const {setError} = dataProcess.actions;
