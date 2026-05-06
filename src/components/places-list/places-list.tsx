import {Offer} from '../../types/offer';
import {PlaceCard} from '../place-card/place-card';

type PlacesListProps = {
  offers: Offer[];
  onMouseEnter: (id: string) => void;
  onMouseLeave: () => void;
};

export function PlacesList({offers, onMouseEnter, onMouseLeave}: PlacesListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          variant="cities"
        />
      ))}
    </div>
  );
}
