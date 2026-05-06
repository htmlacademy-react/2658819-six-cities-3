import {Offer} from '../../types/offer';
import {PlaceCard} from '../place-card/place-card';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

type FavoritesListProps = {
  offers: Offer[];
};

export function FavoritesList({offers}: FavoritesListProps): JSX.Element {

  const favoriteCities = Array.from(new Set(offers.map((offer) => offer.city.name)));

  return (
    <ul className="favorites__list">
      {favoriteCities.map((cityName) => (
        <li key={cityName} className="favorites__locations-items">
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Main}>
                <span>{cityName}</span>
              </Link>
            </div>
          </div>
          <div className="favorites__places">
            {offers
              .filter((offer) => offer.city.name === cityName)
              .map((offer) => (
                <PlaceCard
                  key={offer.id}
                  offer={offer}
                  variant="favorites"
                />
              ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
