import { NameSpace } from '../../settings';
import { makeFakeFavorites, makeFakeFullOffer, makeFakeOffer, makeFakeReview } from '../../test-mocks/test-mocks';
import { testInitialState } from './app-data';
import { getActiveCard, getCurrentCityName, getErrorStatus, getFavorites, getFullOffer, getIsFavoriteAdding, getIsFavoritesLoading, getIsOffersDataLoading, getNeighborPlaces, getOfferPageDataStatus, getOffers, getReviewStatus, getReviewsData, getSortingType } from './selectors';

describe('Селекторы AppData', () => {
  const state = {
    [NameSpace.Data]: {
      ...testInitialState,
      offers: [makeFakeOffer()],
      fullOffer: makeFakeFullOffer(),
      reviews: [makeFakeReview()],
      neighborPlaces: [makeFakeOffer()],
      favorites: [makeFakeFavorites()],
      activeCard: makeFakeOffer(),
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
    const { statusOfferPageData } = state[NameSpace.Data];
    const result = getOfferPageDataStatus(state);
    expect(result).toBe(statusOfferPageData);
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
