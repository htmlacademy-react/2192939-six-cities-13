import { Offer } from '../../types/data-types';
import { AppRoute, RATING_IN_PERCENT, PlacesCard, AuthStatus } from '../../settings';
import { capitalizeFirstLetter } from '../../utils/offers';
import { Link, useNavigate } from 'react-router-dom';
import { MouseEvent, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector, } from '../../hooks';
import { favoriteStatusAction, fetchOffersAction, } from '../../store/api-actions';
import { setActiveCardAction } from '../../store/app-data/app-data';
import { getAuthStatus } from '../../store/user-process/selectors';
type PlaceCardProps = {
  offer: Offer;
  type: 'cities' | 'near-places' | 'favorites';
}

export default function PlaceCard({ offer, type }: PlaceCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthStatus);
  const navigation = useNavigate();
  const isAuth = authStatus === AuthStatus.Auth;
  const [isFavorite, setIsFavorite] = useState(offer.isFavorite);

  const handleMouseEnter = (evt: MouseEvent<HTMLElement>): void => {
    evt.preventDefault();
    if (type === 'cities') {
      dispatch(setActiveCardAction(offer));
    }
  };

  const handleMouseLeave = (evt: MouseEvent<HTMLElement>): void => {
    evt.preventDefault();
    if (type === 'cities') {
      dispatch(setActiveCardAction(null));
    }
  };

  const handleButtonClick = async (): Promise<void> => {
    if (isAuth) {
      await dispatch(favoriteStatusAction({ offerId: offer.id, status: Number(!isFavorite) }));
      setIsFavorite(!isFavorite);
      await dispatch(fetchOffersAction());
    } else {
      navigation(AppRoute.Login);
    }
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
            <b className="place-card__price-value">€{offer.price}</b>
            <span className="place-card__price-text"> /&nbsp;night</span>
          </div>
          <button
            className={classNames(
              'place-card__bookmark-button',
              { 'place-card__bookmark-button--active': isFavorite },
              'button'
            )}
            type="button"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={handleButtonClick}
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
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${offer.id}`}>
            {offer.title}
          </Link>
        </h2>
        <p className="place-card__type" >{capitalizeFirstLetter(offer.type)}</p>
      </div>
    </article>
  );
}
