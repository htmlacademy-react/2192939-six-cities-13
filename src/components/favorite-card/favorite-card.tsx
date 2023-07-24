import { Offer } from '../../types/offers';
import { AppRoute, RATING_IN_PERCENT } from '../../settings';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

type FavoriteCardProps = {
  offer: Offer;
};
export default function FavoriteCard({
  offer,
}: FavoriteCardProps): JSX.Element {
  return (
    <article className="favorites__card place-card">
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={150}
            height={110}
            alt="Place image"
          />
        </a>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price} </b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className={classNames(
              'place-card__bookmark-button',
              { 'place-card__bookmark-button--active': offer.isFavorite },
              'button'
            )}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span
              style={{ width: Math.round(offer.rating) * RATING_IN_PERCENT }}
            />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={AppRoute.Offer + offer.id}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}
