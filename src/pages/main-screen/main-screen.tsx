import {Layout} from '../../components/layout/layout';
import {Offer} from '../../types/offer';
import {PlacesList} from '../../components/places-list/places-list';
import {Map} from '../../components/map/map';
import {useState} from 'react';
import {CITIES} from '../../const';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {changeCity} from '../../store/app-process/app-process';
import {Sorting} from '../../components/sorting/sorting';
import {sortOffers} from '../../utils';
import {getOffers, getOffersDataLoadingStatus, getOfferErrorStatus} from '../../store/data-process/selectors';
import {getCity, getSortingType} from '../../store/app-process/selectors';
import {LoadingScreen} from '../../components/loading-screen/loading-screen';
import {MainEmpty} from '../../components/main-empty/main-empty';


export function MainScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  const activeCityName = useAppSelector(getCity);
  const allOffers = useAppSelector(getOffers);
  const activeSortType = useAppSelector(getSortingType);

  const isOffersDataLoading = useAppSelector(getOffersDataLoadingStatus);
  const hasError = useAppSelector(getOfferErrorStatus);

  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  if (isOffersDataLoading) {
    return <LoadingScreen/>;
  }
  if (hasError) {
    return (
      <Layout>
        <div className="container">
          <h1 style={{marginTop: '50px', textAlign: 'center'}}>
            Server is unavailable. Please try again later.
          </h1>
        </div>
      </Layout>
    );
  }

  const handleCityClick = (event: React.MouseEvent<HTMLAnchorElement>, cityName: string) => {
    event.preventDefault();
    dispatch(changeCity({city: cityName}));
  };
  const offers = allOffers.filter((offer) => offer.city.name === activeCityName);
  const sortedOffers = sortOffers(offers, activeSortType);
  const offersCount = offers.length;
  const isEmpty = offers.length === 0;

  const city = !isEmpty ? offers[0].city : allOffers[0].city;

  const handleCardMouseEnter = (id: string) => {
    const currentOffer = offers.find((offer) => offer.id === id);
    setSelectedOffer(currentOffer || null);
  };

  const handleCardMouseLeave = () => {
    setSelectedOffer(null);
  };

  return (
    <Layout extraClass={`page--gray page--main ${isEmpty ? 'page--index-empty' : ''}`}>
      <main className={`page__main page__main--index ${isEmpty ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {CITIES.map((cityName) => (
                <li key={cityName} className="locations__item">
                  <a
                    className={`locations__item-link tabs__item ${cityName === activeCityName ? 'tabs__item--active' : ''}`}
                    href="#"
                    onClick={(event) => handleCityClick(event, cityName)}
                  >
                    <span>{cityName}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            {isEmpty ? (
              <MainEmpty city={activeCityName}/>
            ) : (
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {offersCount} {offersCount === 1 ? 'place' : 'places'} to stay in {activeCityName}
                </b>
                <Sorting/>
                <PlacesList
                  offers={sortedOffers}
                  onMouseEnter={handleCardMouseEnter}
                  onMouseLeave={handleCardMouseLeave}
                />
              </section>
            )}
            <div className={`cities__right-section ${isEmpty ? 'cities__right-section--empty' : ''}`}>
              {!isEmpty && (
                <Map
                  city={city}
                  offers={offers}
                  selectedOffer={selectedOffer}
                  className="cities__map"
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

