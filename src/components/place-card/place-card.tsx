import { Link, useNavigate } from 'react-router-dom';
import { Offer } from '../../types/offer';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setFavoriteStatusAction } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user-process/selectors';


type PlaceCardProps = {
  offer: Offer;
  onMouseEnter?: (id: string) => void;
  onMouseLeave?: () => void;
  variant: 'cities' | 'favorites' | 'near-places'; // Переключатель стилей
};

export function PlaceCard({ offer, onMouseEnter, onMouseLeave, variant }: PlaceCardProps): JSX.Element {
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
      status: offer.isFavorite ? 0 : 1
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
            width={isFavorites ? '150' : '260'}
            height={isFavorites ? '110' : '200'}
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
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${Math.round(offer.rating) * 20}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={AppRoute.Offer.replace(':id', offer.id)}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

