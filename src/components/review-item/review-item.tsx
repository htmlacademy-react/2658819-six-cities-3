import {Review} from '../../types/review';
import {RATING_COEFFICIENT, USER_AVATAR_SIZE} from '../../const';

type ReviewItemProps = {
  review: Review;
};

export function ReviewItem({review}: ReviewItemProps): JSX.Element {
  const {user, rating, comment, date} = review;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={user.avatarUrl}
            width={USER_AVATAR_SIZE.Width}
            height={USER_AVATAR_SIZE.Height}
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${Math.round(rating) * RATING_COEFFICIENT}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime={date}>
          {new Date(date).toLocaleString('en-US', {month: 'long', year: 'numeric'})}
        </time>
      </div>
    </li>
  );
}
