import { withStore } from '../../test-mocks/test-component';
import { render, screen } from '@testing-library/react';
import { makeFakeOffer, makeFakeReview, makeFakeStore } from '../../test-mocks/test-mocks';
import { APIRoute, TIME_TO_RENDER_PAGE } from '../../settings';
import ReviewForm from '.';
import userEvent from '@testing-library/user-event';

describe('Component: ReviewForm', () => {
  it('Имитирую действия пользователя при корректном вводе данных', async () => {
    const mockReview = makeFakeReview();
    const offerId = makeFakeOffer().id;
    const expectedRatingValue = String(mockReview.rating);
    const expectedCommentValue = mockReview.comment;
    const ratingElementTestId = `ratingElement${mockReview.rating}`;
    const commentElementTestId = 'commentElement';
    const { withStoreComponent, mockAxiosAdapter } = withStore(<ReviewForm offerId={offerId} />, makeFakeStore({}));
    mockAxiosAdapter.onPost(`${APIRoute.Comments}/${offerId}`).reply(201, mockReview);

    render(withStoreComponent);
    await userEvent.type(screen.getByTestId(ratingElementTestId), expectedRatingValue);
    await userEvent.type(screen.getByTestId(commentElementTestId), expectedCommentValue);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getAllByDisplayValue(expectedRatingValue)).toBeInTheDocument();
      expect(screen.getByDisplayValue(expectedCommentValue)).toBeInTheDocument();
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });

  it('Ожидаю отрисовку компонента', () => {
    const ratingElementTestId = 'placeCardImageElement';
    const commentTextAreaTestId = 'commentElement';
    const expectedButtonText = 'Submit';
    const offerId = makeFakeOffer().id;
    const { withStoreComponent } = withStore(<ReviewForm offerId={offerId} />, makeFakeStore({
    }));

    render(withStoreComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByTestId(ratingElementTestId)).toBeInTheDocument();
      expect(screen.getByTestId(commentTextAreaTestId)).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByText(expectedButtonText)).toBeInTheDocument();
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });
});
