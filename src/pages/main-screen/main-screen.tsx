import {Layout} from '../../components/layout/layout';
import {Offer} from '../../types/offer';
import {PlacesList} from '../../components/places-list/places-list';
import { Map } from '../../components/map/map';
import { useState } from 'react';
import {CITIES} from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { changeCity } from '../../store/action';
import { Sorting } from '../../components/sorting/sorting';
import { sortOffers } from '../../utils';


function MainScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  const activeCityName = useAppSelector((state) => state.city);
  const allOffers = useAppSelector((state) => state.offers);
  const activeSortType = useAppSelector((state) => state.sortType);
  const offers = allOffers.filter((offer) => offer.city.name === activeCityName);

  const sortedOffers = sortOffers(offers, activeSortType);

  const city = offers.length > 0 ? offers[0].city : allOffers[0].city;
  const offersCount = offers.length;

  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  const handleCardMouseEnter = (id: string) => {
    const currentOffer = offers.find((offer) => offer.id === id);
    setSelectedOffer(currentOffer || null);
    // console.log(`Активная карточка: ${id}`);
  };

  const handleCardMouseLeave = () => {
    setSelectedOffer(null);
  };

  return (
    <Layout extraClass="page--gray page--main">
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {CITIES.map((cityName) => (
                <li key={cityName} className="locations__item">
                  <a
                    className={`locations__item-link tabs__item ${cityName === activeCityName ? 'tabs__item--active' : ''}`}
                    href="#"
                    onClick={(evt) => {
                      evt.preventDefault();
                      dispatch(changeCity({city: cityName}));
                    }}
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
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {offersCount} {offersCount === 1 ? 'place' : 'places'} to stay in {activeCityName}
              </b>
              <Sorting />
              <PlacesList
                offers={sortedOffers}
                onMouseEnter={handleCardMouseEnter}
                onMouseLeave={handleCardMouseLeave}
              />
            </section>
            <div className="cities__right-section">
              <Map
                city={city}
                offers={offers}
                selectedOffer={selectedOffer}
                className="cities__map"
              />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default MainScreen;
