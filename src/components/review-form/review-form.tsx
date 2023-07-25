import { ChangeEventHandler, useState, Fragment } from 'react';
import {
  EMPTY_RATING,
  MAX_LENGTH_REVIEW_TEXT,
  MIN_LENGTH_REVIEW_TEXT,
  ratingMap,
} from '../../settings';

export default function ReviewForm(): JSX.Element {
  const [rating, setRating] = useState('0');
  const [review, setReview] = useState('');

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }): void => {
    setRating(target.value);
  };
  const handleTexAreaChange: ChangeEventHandler<HTMLTextAreaElement> = ({
    target,
  }): void => {
    setReview(target.value);
  };

  const isReview = rating !== EMPTY_RATING
    && review.length >= MIN_LENGTH_REVIEW_TEXT
    && review.length <= MAX_LENGTH_REVIEW_TEXT;
  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {Object.entries(ratingMap)
          .reverse()
          .map(([score, title]) => (
            <Fragment key={score}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={score}
                id={`${score}-stars`}
                type="radio"
                checked={rating === score}
                onChange={handleInputChange}
              />
              <label
                htmlFor={`${score}-stars`}
                className="reviews__rating-label form__rating-label"
                title={title}
              >
                <svg className="form__star-image" width={37} height={33}>
                  <use xlinkHref="#icon-star" />
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
        onChange={handleTexAreaChange}
        value={review}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isReview}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
