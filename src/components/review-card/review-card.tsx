import { ReviewCardType } from '../../types/offers';
import { RATING_IN_PERCENT } from '../../settings';

type ViewCardProps = {
  item: ReviewCardType;
};

export default function ReviewCard({ item }: ViewCardProps) {
  return (
    <li className="reviews__item" key={item.id}>
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={item.user.avatarUrl}
            width={54}
            height={54}
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{item.user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span
              style={{
                width: `${Math.round(item.rating) * RATING_IN_PERCENT}%`,
              }}
            />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{item.comment}</p>
        <time className="reviews__time" dateTime="2019-04-24">
          {item.date}
        </time>
      </div>
    </li>
  );
}
