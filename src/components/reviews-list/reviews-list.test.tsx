import { withHistory, withStore } from '../../test-mocks/test-component';
import { render, screen } from '@testing-library/react';
import { makeFakeReview, makeFakeStore } from '../../test-mocks/test-mocks';
import { DEFAULT_CITY, DEFAULT_SORTING, Status, TIME_TO_RENDER_PAGE } from '../../settings';
import ReviewsList from './reviews-list';
import { FullOffer } from '../../types/data-types';

describe('Component: ReviewsList', () => {
  it('Ожидаю отрисовку компонента', () => {
    const reviewCardTestId = 'reviewCardTestId';
    const mockReviews = [makeFakeReview(), makeFakeReview(), makeFakeReview()];
    const expectedText = 'Reviews';
    const expectedReviewsQuantity = mockReviews.length;
    const withHistoryComponent = withHistory(
      <ReviewsList />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      DATA: {
        offers: [],
        fullOffer: {} as FullOffer,
        reviews: mockReviews,
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

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByTestId(reviewCardTestId)).toBeInTheDocument();
      expect(screen.getAllByTestId(reviewCardTestId)).toBe(expectedReviewsQuantity);
      expect(screen.getByText(expectedText)).toBeInTheDocument();
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });
});
