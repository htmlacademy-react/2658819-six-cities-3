import {Review} from '../../types/review';
import {ReviewItem} from '../review-item/review-item';
import {MAX_REVIEWS_COUNT} from '../../const';

type ReviewListProps = {
  reviews: Review[];
};

export function ReviewList({reviews}: ReviewListProps): JSX.Element {
  const sortedReviews = Array.isArray(reviews)
    ? [...reviews]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, MAX_REVIEWS_COUNT)
    : [];

  return (
    <>
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>

      <ul className="reviews__list">
        {sortedReviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </ul>
    </>
  );
}
