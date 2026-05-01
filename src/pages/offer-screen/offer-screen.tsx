import {Layout} from '../../components/layout/layout';
import {ReviewForm} from '../../components/review-form/review-form';
import {ReviewList} from '../../components/review-list/review-list';
import {PlaceCard} from '../../components/place-card/place-card';
import {useParams, useNavigate} from 'react-router-dom';
import {AuthorizationStatus, AppRoute} from '../../const';
import {Map} from '../../components/map/map';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useEffect} from 'react';
import { fetchOfferAction, fetchNearbyOffersAction, fetchReviewsAction, setFavoriteStatusAction } from '../../store/api-actions';
import {LoadingScreen} from '../../components/loading-screen/loading-screen';
import { getOffer, getReviews, getNearbyOffers } from '../../store/data-process/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';


export function OfferScreen(): JSX.Element {

  const {id} = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentOffer = useAppSelector(getOffer);
  const reviews = useAppSelector(getReviews);
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferAction(id));
      dispatch(fetchNearbyOffersAction(id));
      dispatch(fetchReviewsAction(id));
    }
  }, [id, dispatch]);

  const handleBookmarkClick = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }

    if (currentOffer) {
      dispatch(setFavoriteStatusAction({
        id: currentOffer.id,
        status: currentOffer.isFavorite ? 0 : 1,
      }));
    }
  };

  if (!currentOffer) {
    return <LoadingScreen/>;
  }

  const city = currentOffer.city;
  const nearbyOffersToRender = nearbyOffers.slice(0, 3);
  const mapOffers = [...nearbyOffersToRender, currentOffer];

  return (
    <Layout>
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer.images.slice(0, 6).map((image) => (
                <div key={image} className="offer__image-wrapper">
                  <img className="offer__image" src={image} alt={currentOffer.type}/>
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
                <button
                  className={`offer__bookmark-button button ${currentOffer.isFavorite ? 'offer__bookmark-button--active' : ''}`}
                  type="button"
                  onClick={handleBookmarkClick}
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"/>
                  </svg>
                  <span className="visually-hidden">{currentOffer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${Math.round(currentOffer.rating) * 20}%`}}/>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
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
                  <p className="offer__text">
                    {currentOffer.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <ReviewList reviews={reviews}/>
                {authorizationStatus === AuthorizationStatus.Auth && <ReviewForm/>}
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map
              city={city}
              offers={mapOffers}
              selectedOffer={currentOffer}
              className="offer__map"
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <div className="near-places__list places__list">
                {nearbyOffersToRender.map((nearOffer) => (
                  <PlaceCard
                    key={nearOffer.id}
                    offer={nearOffer}
                    variant="near-places"
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

