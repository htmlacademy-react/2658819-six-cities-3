
export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  NotFound = '/404',
}

export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Favorite = '/favorite',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const RATING_COEFFICIENT = 20;

export enum FavoriteStatus {
  Add = 1,
  Remove = 0,
}

export const UserAvatarSize = {
  Width: 54,
  Height: 54,
} as const;

export const HostAvatarSize = {
  Width: 74,
  Height: 74,
} as const;

export const LogoSize = {
  Header: {
    Width: 81,
    Height: 41,
  },
  Footer: {
    Width: 64,
    Height: 33,
  },
} as const;

export const ImageSize = {
  Standard: {
    Width: 260,
    Height: 200,
  },
  Favorite: {
    Width: 150,
    Height: 110,
  },
} as const;

export const BookmarkSize = {
  Card: {
    Width: 18,
    Height: 19,
  },
  Offer: {
    Width: 31,
    Height: 33,
  },
} as const;

export const ReviewSymbolLength = {
  Min: 50,
  Max: 300,
} as const;

export const StarSize = {
  Width: 37,
  Height: 33,
} as const;

export const RATINGS = [5, 4, 3, 2, 1];

export const ratingMap = {
  '5': 'perfect',
  '4': 'good',
  '3': 'not bad',
  '2': 'badly',
  '1': 'terribly',
} as const;

export const URL_MARKER_DEFAULT = '/img/pin.svg';
export const URL_MARKER_CURRENT = '/img/pin-active.svg';
export const MarkerSize = {
  Width: 27,
  Height: 39,
  AnchorWidth: 13.5,
  AnchorHeight: 39,
} as const;
export const MIN_MAP_HEIGHT = '500px';

export const CITIES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf'
] as const;

export enum SortType {
  Popular = 'Popular',
  LowToHigh = 'Price: low to high',
  HighToLow = 'Price: high to low',
  TopRated = 'Top rated first',
}

export const BACKEND_URL = 'https://15.design.htmlacademy.pro/six-cities';
export const REQUEST_TIMEOUT = 5000;

export const AUTH_TOKEN_KEY_NAME = 'six-cities-token';

export enum StatusCodes {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  CONFLICT = 409,
}

export const MAX_REVIEWS_COUNT = 10;

export const MAX_NEARBY_OFFERS_COUNT = 3;

export const MAX_OFFER_IMAGE_COUNT = 6;

export enum NameSpace {
  Data = 'DATA',
  User = 'USER',
  Process = 'PROCESS',
}

export const TIMEOUT_SHOW_ERROR = 2000;

export const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[0-9]).+$/i;

export const MAP_TILE_LAYER = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
export const MAP_COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
