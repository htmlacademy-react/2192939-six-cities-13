import { Review } from '../../types/offers';
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
          <ReviewCard key={item.id} item={item} />
        ))}
      </ul>
    </>
  );
}
