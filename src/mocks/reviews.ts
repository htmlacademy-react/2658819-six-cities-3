import { Review } from '../types/review';

export const reviews: Review[] = [
  {
    id: '1',
    date: '2019-04-24',
    user: {
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false
    },
    comment: 'A quiet cozy and picturesque that hides behind a a river on the bank.',
    rating: 4
  },
  {
    id: '2',
    date: '2022-12-29',
    user: {
      name: 'Kate',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true
    },
    comment: 'Nice room, great views of Paris.',
    rating: 5
  },
  {
    id: '3',
    date: '2024-08-01',
    user: {
      name: 'Ratibor',
      avatarUrl: 'img/avatar.svg',
      isPro: false
    },
    comment: 'Everything is thought out down to the last detail. The cleanliness is impeccable, the restaurant is superb!',
    rating: 5
  }
];
