import {useEffect} from 'react';
import {Layout} from '../../components/layout/layout';
import {FavoritesList} from '../../components/favorites-list/favorites-list';
import {FavoritesEmpty} from '../../components/favorites-empty/favorites-empty';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchFavoriteAction} from '../../store/api-actions';
import {getFavoriteOffers} from '../../store/data-process/selectors';

export function FavoritesScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const favoriteOffers = useAppSelector(getFavoriteOffers);

  useEffect(() => {
    dispatch(fetchFavoriteAction());
  }, [dispatch]);

  const isEmpty = favoriteOffers.length === 0;

  return (
    <Layout
      hasFooter
      extraClass={isEmpty ? 'page--favorites-empty' : ''}
    >
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {isEmpty ? (
            <FavoritesEmpty/>
          ) : (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <FavoritesList offers={favoriteOffers}/>
            </section>
          )}
        </div>
      </main>
    </Layout>
  );
}

