import { Review } from '../../types/data-types';
import { getRoundRating } from '../../utils/offers';

type ViewCardProps = {
  item: Review;
};

export default function ReviewCard({ item }: ViewCardProps) {
  const date = new Date(item.date);
  const formatter = new Intl.DateTimeFormat('us', {
    month: 'long',
    year: 'numeric',
  });
  return (
    <>
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={item.user.avatarUrl}
            width={54}
            height={54}
            alt="Reviews avatar"
            data-testid='reviewCardImageTestId'
          />
        </div>
        <span className="reviews__user-name">{item.user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span
              style={{ width: getRoundRating(item.rating) }}
            />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{item.comment}</p>
        <time className="reviews__time" dateTime="2019-04-24">
          {formatter.format(date)}
        </time>
      </div>
    </>
  );
}
