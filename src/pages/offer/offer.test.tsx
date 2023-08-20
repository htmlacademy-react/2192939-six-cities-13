import { render, screen } from '@testing-library/react';
import { DEFAULT_CITY, DEFAULT_SORTING, Status, TIME_TO_RENDER_PAGE } from '../../settings';
import { withHistory, withStore } from '../../test-mocks/test-component';
import { makeFakeFullOffer, makeFakeReview, makeFakeStore } from '../../test-mocks/test-mocks';
import OfferPage from '.';
import { createMemoryHistory } from 'history';

describe('Component: OfferPage', () => {
  const mockHistory = createMemoryHistory();

  const fullOffer = makeFakeFullOffer();
  const reviews = [makeFakeReview(), makeFakeReview(), makeFakeReview()];
  const withHistoryComponent = withHistory(<OfferPage />, mockHistory);
  const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
    DATA: {
      offers: [],
      fullOffer: fullOffer,
      reviews: reviews,
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

  it('Ожидаю фотографии предложения', () => {
    const quantityPhotos = fullOffer.images.length;
    const imageAltText = 'Photo studio';

    render(withStoreComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getAllByAltText(imageAltText)).toBe(quantityPhotos);
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });

  it('Ожидаю название предложения', () => {
    const fullOfferTitleText = fullOffer.title;

    render(withStoreComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByText(fullOfferTitleText)).toBeInTheDocument();
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });

  it('Ожидаю список опций предложения', () => {
    const fullOfferGoodsText = 'What\' inside';

    render(withStoreComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByText(fullOfferGoodsText)).toBeInTheDocument();
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });


  it('Ожидаю список отзывов предложения', () => {
    const fullOfferReviewsText = 'Meet the host';
    const fullOfferReviewsQuantity = reviews.length;

    render(withStoreComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByText(`${fullOfferReviewsText} ${fullOfferReviewsQuantity}`)).toBeInTheDocument();
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });

  it('Ожидаю список мест поблизости предложения', () => {
    const fullOfferNeighborhoodText = 'Other places in the neighborhood';

    render(withStoreComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByText(fullOfferNeighborhoodText)).toBeInTheDocument();
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });
});
