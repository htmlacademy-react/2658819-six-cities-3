import {Link} from 'react-router-dom';
import {AppRoute, LOGO_SIZE} from '../../const';

export function Footer(): JSX.Element {
  return (
    <footer className="footer container">
      <Link className="footer__logo-link" to={AppRoute.Main}>
        <img
          className="footer__logo"
          src="/img/logo.svg"
          alt="6 cities logo"
          width={LOGO_SIZE.Footer.Width}
          height={LOGO_SIZE.Footer.Height}
        />
      </Link>
    </footer>
  );
}
