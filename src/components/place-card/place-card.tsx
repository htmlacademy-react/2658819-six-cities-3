import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import { AppRoute } from '../../const';

type PlaceCardProps = {
  offer: Offer;
  onMouseEnter?: (id: string) => void;
  onMouseLeave?: () => void;
  variant: 'cities' | 'favorites' | 'near-places'; // Переключатель стилей
};

export function PlaceCard({ offer, onMouseEnter, onMouseLeave, variant }: PlaceCardProps): JSX.Element {

  const isFavorites = variant === 'favorites';
  return (
    <article
      className={`${isFavorites ? 'favorites__card' : 'cities__card'} place-card`}
      onMouseEnter={() => onMouseEnter?.(offer.id)}
      onMouseLeave={() => onMouseLeave?.()}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${isFavorites ? 'favorites__image-wrapper' : 'cities__image-wrapper'} place-card__image-wrapper`}>
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
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
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

