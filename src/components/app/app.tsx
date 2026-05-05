import {Routes, Route} from 'react-router-dom';
import {MainScreen} from '../../pages/main-screen/main-screen';
import {LoginScreen} from '../../pages/login-screen/login-screen';
import {FavoritesScreen} from '../../pages/favorites-screen/favorites-screen';
import {OfferScreen} from '../../pages/offer-screen/offer-screen';
import {NotFoundScreen} from '../../pages/not-found-screen/not-found-screen';
import {AppRoute, AuthorizationStatus} from '../../const';
import {PrivateRoute} from '../private-route/private-route';
import {PublicRoute} from '../public-route/public-route';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {LoadingScreen} from '../loading-screen/loading-screen';
import {HistoryRouter} from '../history-router/history-router';
import browserHistory from '../../browser-history';
import {ErrorMessage} from '../error-message/error-message';
import {getOffersDataLoadingStatus} from '../../store/data-process/selectors';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {useEffect} from 'react';
import {fetchFavoriteAction} from '../../store/api-actions';

export function App(): JSX.Element {

  const dispatch = useAppDispatch();

  const isOffersDataLoading = useAppSelector(getOffersDataLoadingStatus);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);


  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteAction());
    }
  }, [authorizationStatus, dispatch]);


  if (isOffersDataLoading || authorizationStatus === AuthorizationStatus.Unknown) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <ErrorMessage />
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainScreen/>}
        />
        <Route
          path={AppRoute.Login}
          element={
            <PublicRoute>
              <LoginScreen />
            </PublicRoute>
          }
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <FavoritesScreen/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
          element={
            <OfferScreen/>
          }
        />
        <Route
          path="*"
          element={<NotFoundScreen/>}
        />
      </Routes>
    </HistoryRouter>
  );
}

