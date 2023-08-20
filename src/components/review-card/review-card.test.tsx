import { withHistory, withStore } from '../../test-mocks/test-component';
import { render, screen } from '@testing-library/react';
import { makeFakeReview, makeFakeStore } from '../../test-mocks/test-mocks';
import { TIME_TO_RENDER_PAGE } from '../../settings';
import ReviewCard from '.';

describe('Component: ReviewCard', () => {
  it('Ожидаю отрисовку компонента', () => {
    const mockReview = makeFakeReview();
    const reviewCardImageTestId = 'reviewCardImageTestId';
    const expectedUserName = mockReview.user.name;
    const expectedReviewText = mockReview.comment;
    const date = new Date(mockReview.date);
    const formatter = new Intl.DateTimeFormat('us', {
      month: 'long',
      year: 'numeric',
    });
    const expectedDate = formatter.format(date);
    const withHistoryComponent = withHistory(
      <ReviewCard item={mockReview} />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
    }));

    render(withStoreComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByTestId(reviewCardImageTestId)).toBeInTheDocument();
      expect(screen.getByText(expectedUserName)).toBeInTheDocument();
      expect(screen.getByText(expectedReviewText)).toBeInTheDocument();
      expect(screen.getByText(expectedDate)).toBeInTheDocument();
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });
});
