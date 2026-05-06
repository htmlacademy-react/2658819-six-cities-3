import {Link, useLocation} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, LOGO_SIZE} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {logoutAction} from '../../store/api-actions';
import {getAuthorizationStatus, getUserEmail} from '../../store/user-process/selectors';
import {getFavoriteCount} from '../../store/data-process/selectors';

type HeaderProps = {
  hasNavigation?: boolean;
};

export function Header({hasNavigation = true}: HeaderProps): JSX.Element {
  const {pathname} = useLocation();

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userEmail = useAppSelector(getUserEmail);
  const favoriteCount = useAppSelector(getFavoriteCount);

  const dispatch = useAppDispatch();

  const handleLogoutClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  const isMainPage = pathname === (AppRoute.Main as string);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              className={`header__logo-link ${isMainPage ? 'header__logo-link--active' : ''}`}
              to={AppRoute.Main}
            >
              <img
                className="header__logo"
                src="/img/logo.svg"
                alt="6 cities logo"
                width={LOGO_SIZE.Header.Width}
                height={LOGO_SIZE.Header.Height}
              />
            </Link>
          </div>
          {hasNavigation && (
            <nav className="header__nav">
              <ul className="header__nav-list">
                {authorizationStatus === AuthorizationStatus.Auth ? (
                  <>
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                        <div className="header__avatar-wrapper user__avatar-wrapper"/>
                        <span className="header__user-name user__name">{userEmail}</span>
                        <span className="header__favorite-count">{favoriteCount}</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <a
                        className="header__nav-link"
                        href="#"
                        onClick={handleLogoutClick}
                      >
                        <span className="header__signout">Sign out</span>
                      </a>
                    </li>
                  </>
                ) : (
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
