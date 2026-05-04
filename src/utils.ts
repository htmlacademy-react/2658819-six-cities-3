import { Offer } from './types/offer';
import { SortType } from './const';

export const sortOffers = (offers: Offer[], type: SortType): Offer[] => {
  switch (type) {
    case SortType.LowToHigh:
      return [...offers].sort((a, b) => a.price - b.price);
    case SortType.HighToLow:
      return [...offers].sort((a, b) => b.price - a.price);
    case SortType.TopRated:
      return [...offers].sort((a, b) => b.rating - a.rating);
    default:
      return [...offers];
  }
};
