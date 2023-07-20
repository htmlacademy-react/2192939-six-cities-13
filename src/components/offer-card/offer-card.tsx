import { useEffect, useState } from 'react';
import { AppRoute, RATING_IN_PERCENT } from '../../settings';
import { TOffer } from '../../types/offers';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

type TOfferCardProps = {
  offer: TOffer;
};
export default function OfferCard({ offer }: TOfferCardProps): JSX.Element {
  const [activeCard, setActiveCard] = useState({});

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(activeCard);
  }, [activeCard]);

  function handleMouseEnter() {
    setActiveCard(offer);
  }

  function handleMouseLeave() {
    setActiveCard({});
  }

  return (
    <article
      className="cities__card place-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={260}
            height={200}
            alt="Place image"
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price} </b>
            <span className="place-card__price-text"> /&nbsp;night</span>
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
        <Link to={AppRoute.Offer + offer.id}>
          <h2 className="place-card__name">{offer.title}</h2>
        </Link>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}
