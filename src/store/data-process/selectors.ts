import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {Offer, FullOffer} from '../../types/offer';
import {Review} from '../../types/review';

export const getOffers = (state: State): Offer[] => state[NameSpace.Data].offers;
export const getOffer = (state: State): FullOffer | null => state[NameSpace.Data].offer;
export const getNearbyOffers = (state: State): Offer[] => state[NameSpace.Data].nearbyOffers;
export const getReviews = (state: State): Review[] => state[NameSpace.Data].reviews;
export const getOffersDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isOffersDataLoading;
export const getErrorStatus = (state: State): string | null => state[NameSpace.Data].error;
export const getFavoriteOffers = (state: State) => state[NameSpace.Data].favorites;
export const getFavoriteCount = (state: State): number => state[NameSpace.Data].favorites.length;
