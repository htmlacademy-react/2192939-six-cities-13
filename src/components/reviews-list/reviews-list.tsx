import { useAppSelector } from '../../hooks';
import { getReviewsData } from '../../store/app-data/selectors';
import { sortReviewByDate } from '../../utils/offers';
import ReviewCard from '../review-card';

export default function ReviewsList() {

  const reviews = useAppSelector(getReviewsData);

  return (
    <>
      <h2 className="reviews__title">
        Reviews ·{' '}
        <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {sortReviewByDate(reviews).map((item) => (
          <li className="reviews__item" key={item.id}>
            <ReviewCard item={item} />
          </li>
        ))}
      </ul>
    </>
  );
}
