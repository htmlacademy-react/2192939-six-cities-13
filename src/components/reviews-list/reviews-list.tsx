import { TReview } from '../../types/offers';
import ReviewCard from '../review-card';

type TReviewListProps = {
  review: TReview;
};
export default function ReviewsList({ review }: TReviewListProps) {
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
