import { withHistory, withStore } from '../../test-mocks/test-component';
import { render, screen } from '@testing-library/react';
import { makeFakeCity, makeFakeFullOffer, makeFakeOffer, makeFakeStore } from '../../test-mocks/test-mocks';
import { FullOffer } from '../../types/data-types';
import { DEFAULT_CITY, DEFAULT_SORTING, Status, StylesForMapMainPage, StylesForMapOfferPage } from '../../settings';
import Map from '.';

describe('Component: Map', () => {
  it('Ожидаю отрисовку компонента на главной странице', () => {
    const mapTestId = 'mapElement';
    const mockCity = makeFakeCity();
    const mockOffers = [makeFakeOffer(), makeFakeOffer()];
    const mockStyles = StylesForMapMainPage;
    const withHistoryComponent = withHistory(
      <Map
        city={mockCity}
        offers={mockOffers}
        styles={mockStyles}
      />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      DATA: {
        offers: [],
        fullOffer: {} as FullOffer,
        reviews: [],
        neighborPlaces: [],
        favorites: [],
        isOffersDataLoading: false,
        isFullOfferDataLoading: true,
        isReviewsDataLoading: true,
        isNeighborPlacesDataLoading: true,
        isFavoritesLoading: false,
        isFavoriteAdding: false,
        hasError: false,
        currentCityName: DEFAULT_CITY,
        activeCard: null,
        sortingType: DEFAULT_SORTING,
        statusReview: Status.Idle,
      }
    }));


    render(withStoreComponent);

    expect(screen.getByTestId(mapTestId)).toBeInTheDocument();
  });

  it('Ожидаю отрисовку компонента на странице предложения', () => {
    const mapTestId = 'mapElement';
    const mockCity = makeFakeCity();
    const mockOffers = [makeFakeOffer(), makeFakeOffer()];
    const mockStyles = StylesForMapOfferPage;
    const mockFullOffer = makeFakeFullOffer();
    const withHistoryComponent = withHistory(
      <Map
        city={mockCity}
        offers={mockOffers}
        styles={mockStyles}
        fullOffer={mockFullOffer}
      />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      DATA: {
        offers: [],
        fullOffer: {} as FullOffer,
        reviews: [],
        neighborPlaces: [],
        favorites: [],
        isOffersDataLoading: false,
        isFullOfferDataLoading: true,
        isReviewsDataLoading: true,
        isNeighborPlacesDataLoading: true,
        isFavoritesLoading: false,
        isFavoriteAdding: false,
        hasError: false,
        currentCityName: DEFAULT_CITY,
        activeCard: null,
        sortingType: DEFAULT_SORTING,
        statusReview: Status.Idle,
      }
    }));


    render(withStoreComponent);

    expect(screen.getByTestId(mapTestId)).toBeInTheDocument();
  });
});
