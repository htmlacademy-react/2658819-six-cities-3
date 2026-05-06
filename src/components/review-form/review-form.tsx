import {useState, ChangeEvent, Fragment, FormEvent} from 'react';
import {REVIEW_SYMBOL_LENGTH, RATING_MAP, RATINGS, STAR_SIZE} from '../../const.ts';
import {useParams} from 'react-router-dom';
import {useAppDispatch} from '../../hooks';
import {sendCommentAction} from '../../store/api-actions';


export function ReviewForm(): JSX.Element {

  const {id} = useParams();
  const dispatch = useAppDispatch();
  const [isSending, setIsSending] = useState(false);

  const [formData, setFormData] = useState({
    review: '',
    rating: 0,
  });

  const handleFieldChange = (evt: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: value});
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (id && formData.rating !== 0 && formData.review.length >= REVIEW_SYMBOL_LENGTH.Min) {
      setIsSending(true);

      dispatch(sendCommentAction({
        id,
        comment: formData.review,
        rating: Number(formData.rating)
      }))
        .unwrap()
        .then(() => {
          setFormData({review: '', rating: 0});
        })
        .catch(() => {
        })
        .finally(() => {
          setIsSending(false);
        });
    }
  };

  return (
    <form
      className="reviews__form form"
      onSubmit={handleFormSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RATINGS.map((score) => (
          <Fragment key={score}>
            <input
              className="form__rating-input visually-hidden"
              id={`${score}-stars`}
              name="rating"
              value={score.toString()}
              type="radio"
              onChange={handleFieldChange}
              checked={Number(formData.rating) === score}
              disabled={isSending}
            />
            <label
              htmlFor={`${score}-stars`}
              className="reviews__rating-label form__rating-label"
              title={RATING_MAP[score.toString() as keyof typeof RATING_MAP]}
            >
              <svg className="form__star-image" width={STAR_SIZE.Width} height={STAR_SIZE.Height}>
                <use xlinkHref="#icon-star"/>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.review}
        onChange={handleFieldChange}
        disabled={isSending}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">{REVIEW_SYMBOL_LENGTH.Min} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={
            isSending ||
            Number(formData.rating) === 0 ||
            formData.review.length < REVIEW_SYMBOL_LENGTH.Min ||
            formData.review.length > REVIEW_SYMBOL_LENGTH.Max
          }
        >
          Submit
        </button>
      </div>
    </form>
  );
}
