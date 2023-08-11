import { Helmet } from 'react-helmet-async';
import ReviewForm from '../../components/review-form';
import Header from '../../components/header';
import { AppRoute, AuthStatus, PlacesCard, StylesForMapOfferPage } from '../../settings';
import { capitalizeFirstLetter, nearByCities } from '../../utils/offers';
import { useNavigate, useParams } from 'react-router-dom';
import { RATING_IN_PERCENT } from '../../settings';
import ReviewsList from '../../components/reviews-list';
import classNames from 'classnames';
import Map from '../../components/map';
import PlaceList from '../../components/place-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Loader from '../../components/loader';
import { favoriteStatusAction, fetchFullOfferAction, fetchNeighborPlacesAction, fetchReviewsFullOfferAction } from '../../store/api-actions';
import { useEffect } from 'react';
import { getFullOffer, getIsFullOfferLoaded, getIsNearByLoaded, getIsReviewsLoaded, getNeighborPlaces } from '../../store/app-data/selectors';
import { getAuthStatus } from '../../store/user-process/selectors';

export default function OfferPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const offerId = useParams().id as string;
  const isFullOfferLoaded = useAppSelector(getIsFullOfferLoaded);
  const isReviewsLoaded = useAppSelector(getIsReviewsLoaded);
  const isNearByLoaded = useAppSelector(getIsNearByLoaded);
  const fullOffer = useAppSelector(getFullOffer);
  const neighborPlaces = useAppSelector(getNeighborPlaces);
  const authStatus = useAppSelector(getAuthStatus);
  const navigation = useNavigate();
  const isAuth = authStatus === AuthStatus.Auth;

  useEffect(() => {
    let isOfferPageMounted = true;

    if (offerId && isOfferPageMounted) {
      dispatch(fetchFullOfferAction(offerId));
      dispatch(fetchReviewsFullOfferAction(offerId));
      dispatch(fetchNeighborPlacesAction(offerId));
    }
    return () => {
      isOfferPageMounted = false;
    };
  }, [dispatch, offerId]);

  const handleButtonClick = (): void => {
    if (isAuth) {
      dispatch(favoriteStatusAction({ offerId: offerId, status: Number(!fullOffer.isFavorite) }));
    } else {
      navigation(AppRoute.Login);
    }
  };

  return (
    <div className="page">
      <Helmet>
        <title>6 cities: offer</title>
      </Helmet>
      <Header />

      {isFullOfferLoaded || isReviewsLoaded || isNearByLoaded
        ?
        <Loader />
        :
        <main className="page__main page__main--offer">
          <section className="offer">
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {fullOffer.images.map((item) => (
                  <div className="offer__image-wrapper" key={crypto.randomUUID()}>
                    <img className="offer__image" src={item} alt="Photo studio" />
                  </div>
                ))}
              </div>
            </div>
            <div className="offer__container container">
              <div className="offer__wrapper">
                {fullOffer.isPremium && (
                  <div className="offer__mark">
                    <span>Premium</span>
                  </div>
                )}
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">{fullOffer.title}</h1>
                  <button
                    className={classNames(
                      'offer__bookmark-button',
                      {
                        'offer__bookmark-button--active': fullOffer.isFavorite,
                      },
                      'button'
                    )}
                    type="button"
                    onClick={handleButtonClick}
                  >
                    <svg className="offer__bookmark-icon" width={31} height={33}>
                      <use xlinkHref="#icon-bookmark" />
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span
                      style={{
                        width: `${Math.round(fullOffer ? fullOffer.rating : 0) *
                          RATING_IN_PERCENT}%`,
                      }}
                    />
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">
                    {fullOffer.rating}
                  </span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">
                    {capitalizeFirstLetter(fullOffer.type)}
                  </li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {fullOffer.bedrooms} Bedrooms
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    Max {fullOffer.maxAdults} adults
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">€{fullOffer.price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&apos;s inside</h2>
                  <ul className="offer__inside-list">
                    {fullOffer.goods.map((item) => (
                      <li
                        className="offer__inside-item"
                        key={crypto.randomUUID()}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div
                      className={`offer__avatar-wrapper offer__avatar-wrapper${fullOffer.host.isPro ? '--pro' : ''} user__avatar-wrapper`}
                    >
                      <img
                        className="offer__avatar user__avatar"
                        src={fullOffer.host.avatarUrl}
                        width={74}
                        height={74}
                        alt="Host avatar"
                      />
                    </div>
                    <span className="offer__user-name">
                      {fullOffer.host.name}
                    </span>
                    <span className="offer__user-status">
                      {fullOffer.host.isPro ? 'Pro' : ''}
                    </span>
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">{fullOffer.description}</p>
                  </div>
                </div>
                <section className="offer__reviews reviews">
                  <ReviewsList />
                  {authStatus === AuthStatus.Auth && <ReviewForm offerId={offerId} />}

                </section>
              </div>
            </div>
            <section className="offer__map map">
              <Map
                city={nearByCities(neighborPlaces)[0].city}
                offers={nearByCities(neighborPlaces)}
                styles={StylesForMapOfferPage} fullOffer={fullOffer}
              />
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">
                Other places in the neighborhood
              </h2>
              <PlaceList offers={nearByCities(neighborPlaces)} type={PlacesCard.NearPlaces} />
            </section>
          </div>
        </main>}
    </div>
  );
}
