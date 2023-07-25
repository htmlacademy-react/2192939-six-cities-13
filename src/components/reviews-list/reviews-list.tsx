import { Review } from '../../types/types';
import ReviewCard from '../review-card';

type ReviewListProps = {
  review: Review;
};
export default function ReviewsList({ review }: ReviewListProps) {
  return (
    <>
      <h2 className="reviews__title">
        Reviews ·{' '}
        <span className="reviews__amount">{review.review.length}</span>
      </h2>
      <ul className="reviews__list">
        {review.review.map((item) => (
          <li className="reviews__item" key={item.id}>
            <ReviewCard item={item} />
          </li>
        ))}
      </ul>
    </>
  );
}
