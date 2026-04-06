import { Offer } from '../types/offer';

export const offers: Offer[] = [
  {
    id: '1',
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment',
    price: 120,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3551493,
        longitude: 4.6738772,
        zoom: 10
      }
    },
    location: {
      latitude: 52.3551493,
      longitude: 4.6738772,
      zoom: 8
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.8,
    description: 'A quiet cozy and picturesque that hides behind a a river by the thames.',
    bedrooms: 3,
    goods: ['Wi-Fi', 'Washing machine', 'Towels', 'Heating', 'Coffee machine', 'Baby seat', 'Kitchen', 'Dishwasher', 'Cabel TV', 'Fridge'],
    host: {
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true
    },
    images: ['img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/apartment-03.jpg'],
    maxAdults: 4,
    previewImage: 'img/apartment-01.jpg'
  },
  {
    id: '2',
    title: 'Cozy room in the heart of Paris',
    type: 'room',
    price: 100,
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 10
      }
    },
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 8
    },
    isFavorite: true,
    isPremium: false,
    rating: 4.7,
    description: 'A historical building in the Latin Quarter.\nThis cozy room offers a authentic Parisian experience with a view of narrow charming streets.',
    bedrooms: 2,
    goods: ['Wi-Fi', 'Towels', 'Heating', 'Coffee machine', 'Cabel TV', 'Fridge'],
    host: {
      name: 'Claude',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: false
    },
    images: ['img/room.jpg'],
    maxAdults: 2,
    previewImage: 'img/room.jpg'
  },
  {
    id: '3',
    title: 'Luxury Hotel with Grand Place view',
    type: 'hotel',
    price: 250,
    city: {
      name: 'Brussels',
      location: {
        latitude: 50.846557,
        longitude: 4.351697,
        zoom: 10
      }
    },
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 8
    },
    isFavorite: false,
    isPremium: true,
    rating: 5.0,
    description: 'Experience the heart of Belgium in this premium hotel.\nHigh-class service and elegant interiors for a perfect stay.',
    bedrooms: 1,
    goods: ['Wi-Fi', 'Air conditioning', 'Minibar', 'Towels', 'Breakfast'],
    host: {
      name: 'Hotel Manager',
      avatarUrl: 'img/avatar.svg',
      isPro: true
    },
    images: ['img/apartment-02.jpg'],
    maxAdults: 2,
    previewImage: 'img/apartment-02.jpg'
  },
  {
    id: '4',
    title: 'Modern House in a quiet district',
    type: 'house',
    price: 180,
    city: {
      name: 'Dusseldorf',
      location: {
        latitude: 51.225402,
        longitude: 6.776314,
        zoom: 10
      }
    },
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 8
    },
    isFavorite: true,
    isPremium: false,
    rating: 3.9,
    description: 'Spacious modern house perfect for a family trip.\nGarden and private parking included.',
    bedrooms: 4,
    goods: ['Wi-Fi', 'Washing machine', 'Kitchen', 'Dishwasher', 'Fridge', 'Parking'],
    host: {
      name: 'Dieter',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false
    },
    images: ['img/apartment-03.jpg'],
    maxAdults: 6,
    previewImage: 'img/apartment-03.jpg'
  }
];
