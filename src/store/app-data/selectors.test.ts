import { DEFAULT_CITY, DEFAULT_SORTING, NameSpace, Status } from '../../settings';
import { makeFakeFavorites, makeFakeFullOffer, makeFakeOffer, makeFakeReview } from '../../test-mocks/test-mocks';
import { getActiveCard, getCurrentCityName, getErrorStatus, getFavorites, getFullOffer, getIsFavoriteAdding, getIsFavoritesLoading, getIsFullOfferLoaded, getIsNearByLoaded, getIsOffersDataLoading, getIsReviewsLoaded, getNeighborPlaces, getOffers, getReviewStatus, getReviewsData, getSortingType } from './selectors';

describe('Селекторы AppData', () => {
  const state = {
    [NameSpace.Data]: {
      offers: [makeFakeOffer()],
      fullOffer: makeFakeFullOffer(),
      reviews: [makeFakeReview()],
      neighborPlaces: [makeFakeOffer()],
      favorites: [makeFakeFavorites()],
      isOffersDataLoading: false,
      isFullOfferDataLoading: true,
      isReviewsDataLoading: true,
      isNeighborPlacesDataLoading: true,
      isFavoritesLoading: false,
      isFavoriteAdding: false,
      hasError: false,
      currentCityName: DEFAULT_CITY,
      activeCard: makeFakeOffer(),
      sortingType: DEFAULT_SORTING,
      statusReview: Status.Idle,
    }
  };

  it('Должен получить список предложений', () => {
    const { offers } = state[NameSpace.Data];
    const result = getOffers(state);
    expect(result).toEqual(offers);
  });

  it('Должен получить предложение', () => {
    const { fullOffer } = state[NameSpace.Data];
    const result = getFullOffer(state);
    expect(result).toEqual(fullOffer);
  });

  it('Должен получить список отзывов', () => {
    const { reviews } = state[NameSpace.Data];
    const result = getReviewsData(state);
    expect(result).toEqual(reviews);
  });

  it('Должен получить список предложений поблизости', () => {
    const { neighborPlaces } = state[NameSpace.Data];
    const result = getNeighborPlaces(state);
    expect(result).toEqual(neighborPlaces);
  });

  it('Должен получить список избранных предложений', () => {
    const { favorites } = state[NameSpace.Data];
    const result = getFavorites(state);
    expect(result).toEqual(favorites);
  });

  it('Должен получить статус загрузки предложений', () => {
    const { isOffersDataLoading } = state[NameSpace.Data];
    const result = getIsOffersDataLoading(state);
    expect(result).toBe(isOffersDataLoading);
  });

  it('Должен получить статус загрузки предложения', () => {
    const { isFullOfferDataLoading } = state[NameSpace.Data];
    const result = getIsFullOfferLoaded(state);
    expect(result).toBe(isFullOfferDataLoading);
  });

  it('Должен получить статус загрузки списка отзывов', () => {
    const { isReviewsDataLoading } = state[NameSpace.Data];
    const result = getIsReviewsLoaded(state);
    expect(result).toBe(isReviewsDataLoading);
  });

  it('Должен получить статус загрузки списка предложений поблизости', () => {
    const { isNeighborPlacesDataLoading } = state[NameSpace.Data];
    const result = getIsNearByLoaded(state);
    expect(result).toBe(isNeighborPlacesDataLoading);
  });

  it('Должен получить статус загрузки списка избранных предложений', () => {
    const { isFavoritesLoading } = state[NameSpace.Data];
    const result = getIsFavoritesLoading(state);
    expect(result).toBe(isFavoritesLoading);
  });

  it('Должен получить статус добавления в список избранных предложений', () => {
    const { isFavoriteAdding } = state[NameSpace.Data];
    const result = getIsFavoriteAdding(state);
    expect(result).toBe(isFavoriteAdding);
  });

  it('Должен получить ошибку', () => {
    const { hasError } = state[NameSpace.Data];
    const result = getErrorStatus(state);
    expect(result).toBe(hasError);
  });

  it('Должен получить название города по умолчанию', () => {
    const { currentCityName } = state[NameSpace.Data];
    const result = getCurrentCityName(state);
    expect(result).toBe(currentCityName);
  });

  it('Должен получить активную карту', () => {
    const { activeCard } = state[NameSpace.Data];
    const result = getActiveCard(state);
    expect(result).toBe(activeCard);
  });

  it('Должен получить тип сортировки', () => {
    const { sortingType } = state[NameSpace.Data];
    const result = getSortingType(state);
    expect(result).toBe(sortingType);
  });

  it('Должен получить статус загрузки отзыва', () => {
    const { statusReview } = state[NameSpace.Data];
    const result = getReviewStatus(state);
    expect(result).toBe(statusReview);
  });
});
