import { ChangeEventHandler, useState } from 'react';
import { MIN_LENGHT_REVIEW_TEXT } from '../../settings';

export default function ReviewForm(): JSX.Element {
  // type TFormChangeHandler = ChangeEventHandler<
  //   HTMLInputElement & HTMLTextAreaElement
  // >;

  /**Такой код выдает ошибку на строке 44 */
  type TFormChangeHandler = ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;

  const [formData, setFormData] = useState({ rating: 0, review: '' });
  const [isReview, setIsReview] = useState(true);

  /**Переписал код но теперь логика не работает должным образом */
  const handleFieldChange: TFormChangeHandler = ({ target }): void => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
    if (formData.rating && formData.review.length > MIN_LENGHT_REVIEW_TEXT) {
      setIsReview(false);
    }
  };

  // const [formData, setFormData] = useState({ rating: 0, review: '' });

  // const handleFieldChange: TFormChangeHandler = ({ target }): void => {
  //   const { name, value } = target;
  //   setFormData({ ...formData, [name]: value });
  // };

  // const isReview = !(
  //   formData.rating && formData.review.length > MIN_LENGHT_REVIEW_TEXT
  // );

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div
        className="reviews__rating-form form__rating"
        onChange={handleFieldChange}
      >
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={5}
          id="5-stars"
          type="radio"
        />
        <label
          htmlFor="5-stars"
          className="reviews__rating-label form__rating-label"
          title="perfect"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={4}
          id="4-stars"
          type="radio"
        />
        <label
          htmlFor="4-stars"
          className="reviews__rating-label form__rating-label"
          title="good"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={3}
          id="3-stars"
          type="radio"
        />
        <label
          htmlFor="3-stars"
          className="reviews__rating-label form__rating-label"
          title="not bad"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={2}
          id="2-stars"
          type="radio"
        />
        <label
          htmlFor="2-stars"
          className="reviews__rating-label form__rating-label"
          title="badly"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={1}
          id="1-star"
          type="radio"
        />
        <label
          htmlFor="1-star"
          className="reviews__rating-label form__rating-label"
          title="terribly"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleFieldChange}
        value={formData.review}
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
          disabled={isReview}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
