import { Layout } from '../../components/layout/layout';
import {FavoritesList} from '../../components/favorites-list/favorites-list';
import { useAppSelector } from '../../hooks';


function FavoritsScreen(): JSX.Element {
  const allOffers = useAppSelector((state) => state.offers);
  const favoriteOffers = allOffers.filter((offer) => offer.isFavorite);

  return (
    <Layout hasFooter extraClass={favoriteOffers.length === 0 ? 'page--favorites-empty' : ''}>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoritesList offers={favoriteOffers}/>
          </section>
        </div>
      </main>
    </Layout>
  );
}

export default FavoritsScreen;
