import { store } from '../store';
import {AuthorizationStatus, SortType} from '../const';
import {Offer, FullOffer} from './offer';
import {Review} from './review';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userEmail: string | null;
};

export type DataProcess = {
  offers: Offer[];
  offer: FullOffer | null;
  nearbyOffers: Offer[];
  reviews: Review[];
  isOffersDataLoading: boolean;
  error: string | null;
  favorites: Offer[];
};

export type AppProcess = {
  city: string;
  sortingType: SortType;
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
