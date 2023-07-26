import { Review } from '../../types/data-types';
import ReviewCard from '../review-card';

type ReviewListProps = {
  reviews: Review;
};
export default function ReviewsList({ reviews }: ReviewListProps) {
  return (
    <>
      <h2 className="reviews__title">
        Reviews ·{' '}
        <span className="reviews__amount">{reviews.review.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.review.map((item) => (
          <li className="reviews__item" key={item.id}>
            <ReviewCard item={item} />
          </li>
        ))}
      </ul>
    </>
  );
}
