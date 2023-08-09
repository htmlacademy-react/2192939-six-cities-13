import { Offer } from '../../types/data-types';
import { AppRoute, RATING_IN_PERCENT, PlacesCard } from '../../settings';
import { capitalizeFirstLetter } from '../../utils/offers';
import { Link } from 'react-router-dom';
import { MouseEvent } from 'react';
import classNames from 'classnames';
import { useAppDispatch } from '../../hooks';
import { setActiveCardAction } from '../../store/app-process/app-process';

type PlaceCardProps = {
  offer: Offer;
  type: 'cities' | 'near-places' | 'favorites';
}


export default function PlaceCard({ offer, type }: PlaceCardProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleMouseEnter = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(setActiveCardAction(offer));
  };

  const handleMouseLeave = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(setActiveCardAction(undefined));
  };

  return (
    <article className={`${type}__card place-card`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      id={offer.id}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${type}__image-wrapper place-card__image-wrapper`}>
        <a href="#">
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={type === PlacesCard.Favorites ? 150 : 260}
            height={type === PlacesCard.Favorites ? 110 : 200}
            alt="Place image"
          />
        </a>
      </div>
      <div className={classNames(
        { 'favorites__card-info': type === PlacesCard.Favorites },
        'place-card__info'
      )}
      >
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
              style={{ width: `${Math.round(offer.rating) * RATING_IN_PERCENT}%` }}
            />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <Link to={`${AppRoute.Offer}/${offer.id}`}>
          <h2 className="place-card__name">{offer.title}</h2>
        </Link>
        <p className="place-card__type" >{capitalizeFirstLetter(offer.type)}</p>
      </div>
    </article>
  );
}
