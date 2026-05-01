import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.ts';

export function NotFoundScreen(): JSX.Element {
  return (
    <section className="not-found">
      <h1>404 Not Found</h1>
      <Link to={AppRoute.Main}>Вернуться на главную</Link>
    </section>
  );
}

