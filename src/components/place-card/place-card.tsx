import {Link, useNavigate} from 'react-router-dom';
import {Offer} from '../../types/offer';
import {
  AppRoute,
  AuthorizationStatus,
  RATING_COEFFICIENT,
  FavoriteStatus,
  IMAGE_SIZE,
  BOOKMARK_SIZE,
  APARTMENT_TYPES
} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {setFavoriteStatusAction} from '../../store/api-actions';
import {getAuthorizationStatus} from '../../store/user-process/selectors';


type PlaceCardProps = {
  offer: Offer;
  onMouseEnter?: (id: string) => void;
  onMouseLeave?: () => void;
  variant: 'cities' | 'favorites' | 'near-places';
};

export function PlaceCard({offer, onMouseEnter, onMouseLeave, variant}: PlaceCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authStatus = useAppSelector(getAuthorizationStatus);

  let cardClass = 'cities__card';
  let imageWrapperClass = 'cities__image-wrapper';

  if (variant === 'favorites') {
    cardClass = 'favorites__card';
    imageWrapperClass = 'favorites__image-wrapper';
  } else if (variant === 'near-places') {
    cardClass = 'near-places__card';
    imageWrapperClass = 'near-places__image-wrapper';
  }

  const handleBookmarkClick = () => {
    if (authStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }

    dispatch(setFavoriteStatusAction({
      id: offer.id,
      status: offer.isFavorite ? FavoriteStatus.Remove : FavoriteStatus.Add
    }));
  };

  const isFavorites = variant === 'favorites';
  return (
    <article
      className={`${cardClass} place-card`}
      onMouseEnter={() => onMouseEnter?.(offer.id)}
      onMouseLeave={() => onMouseLeave?.()}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${imageWrapperClass} place-card__image-wrapper`}>
        <Link to={`${AppRoute.Offer.replace(':id', offer.id)}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={isFavorites ? IMAGE_SIZE.Favorite.Width : IMAGE_SIZE.Standard.Width}
            height={isFavorites ? IMAGE_SIZE.Favorite.Height : IMAGE_SIZE.Standard.Height}
            alt={offer.title}
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${offer.isFavorite ? 'place-card__bookmark-button--active' : ''}`}
            type="button"
            onClick={handleBookmarkClick}
          >
            <svg
              className="place-card__bookmark-icon"
              width={BOOKMARK_SIZE.Card.Width}
              height={BOOKMARK_SIZE.Card.Height}
            >
              <use xlinkHref="#icon-bookmark"/>
            </svg>
            <span className="visually-hidden">{offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${Math.round(offer.rating) * RATING_COEFFICIENT}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={AppRoute.Offer.replace(':id', offer.id)}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{APARTMENT_TYPES[offer.type]}</p>
      </div>
    </article>
  );
}

