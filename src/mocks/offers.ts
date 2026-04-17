import {Offer} from '../types/offer';

export const offers: Offer[] = [
  {
    id: '1',
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment',
    price: 120,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        zoom: 10
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 8
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.8,
    previewImage: 'img/apartment-01.jpg'
  },
  {
    id: '11',
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment',
    price: 100,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        zoom: 10
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 8
    },
    isFavorite: false,
    isPremium: true,
    rating: 3.8,
    previewImage: 'img/apartment-02.jpg'
  },
  {
    id: '111',
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment',
    price: 90,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        zoom: 10
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 8
    },
    isFavorite: true,
    isPremium: false,
    rating: 4.9,
    previewImage: 'img/apartment-03.jpg'
  },
  {
    id: '2',
    title: 'Cozy room in the heart of Paris',
    type: 'room',
    price: 100,
    city: {
      name: 'Paris',
      location: {
        latitude: 52.3609553943508,
        longitude: 4.85309666406198,
        zoom: 10
      }
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 8
    },
    isFavorite: true,
    isPremium: false,
    rating: 4.7,
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
        latitude: 52.3909553943508,
        longitude: 4.929309666406198,
        zoom: 10
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 8
    },
    isFavorite: false,
    isPremium: true,
    rating: 5.0,
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
        latitude: 52.3809553943508,
        longitude: 4.939309666406198,
        zoom: 10
      }
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 8
    },
    isFavorite: true,
    isPremium: false,
    rating: 3.9,
    previewImage: 'img/apartment-03.jpg'
  }
];
