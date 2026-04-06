import { Layout } from '../../components/layout/layout';
import {Review} from '../../types/review';
import {ReviewForm} from '../../components/review-form/review-form';
import {ReviewList} from '../../components/review-list/review-list';
import {PlaceCard} from '../../components/place-card/place-card';
import {Offer} from '../../types/offer';
import {useParams} from 'react-router-dom';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { AuthorizationStatus } from '../../const';

type OfferScreenProps = {
  reviews: Review[];
  offers: Offer[];
  authorizationStatus: AuthorizationStatus;
}

function OfferScreen({offers, reviews, authorizationStatus}: OfferScreenProps): JSX.Element {

  const {id} = useParams();

  const currentOffer = offers.find((item) => item.id === id);

  if (!currentOffer) {
    return <NotFoundScreen/>;
  }

  return (
    <Layout>
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer.images.slice(0, 6).map((image) => (
                <div key={image} className="offer__image-wrapper">
                  <img className="offer__image" src={image} alt={currentOffer.type} />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              <div className="offer__mark">
                <span>Premium</span>
              </div>
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {currentOffer.title}
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: '80%'}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">4.8</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {currentOffer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {currentOffer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {currentOffer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {currentOffer.goods.map((item) => (
                    <li key={item} className="offer__inside-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper ${currentOffer.host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                    <img
                      className="offer__avatar user__avatar"
                      src={currentOffer.host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">
                    {currentOffer.host.name}
                  </span>
                  {currentOffer.host.isPro && (
                    <span className="offer__user-status">
                      Pro
                    </span>
                  )}
                </div>
                <div className="offer__description">
                  {currentOffer.description.split('\n').map((line) => (
                    <p key={line} className="offer__text">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot;
                  <span
                    className="reviews__amount"
                  >{reviews.length}
                  </span>
                </h2>
                <ReviewList reviews={reviews} />
                {authorizationStatus === AuthorizationStatus.Auth && <ReviewForm />}
              </section>
            </div>
          </div>
          <section className="offer__map map"></section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <div className="near-places__list places__list">
                {offers
                  .filter((offer) => offer.id !== currentOffer.id)
                  .slice(0, 3).map((nearOffer) => (
                    <PlaceCard
                      key={nearOffer.id}
                      offer={nearOffer}
                      variant="cities"
                    />
                  ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}

export default OfferScreen;
