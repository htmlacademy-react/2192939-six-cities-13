import { withHistory, withStore } from '../../test-mocks/test-component';
import { render, screen } from '@testing-library/react';
import { makeFakeOffer, makeFakeStore } from '../../test-mocks/test-mocks';
import { TIME_TO_RENDER_PAGE } from '../../settings';
import PlaceList from '.';

describe('Component: PlaceList', () => {
  it('Ожидаю отрисовку компонента', () => {
    const placeCardTestId = 'placeCardTestId';
    const mockOffers = [makeFakeOffer(), makeFakeOffer()];
    const expectedText = `${mockOffers.length} places to stay in ${mockOffers[0].city.name}`;
    const expectedQuantityPlaceCard = mockOffers.length;
    const withHistoryComponent = withHistory(
      <PlaceList offers={mockOffers} type='cities' />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
    }));

    render(withStoreComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByTestId(placeCardTestId)).toBeInTheDocument();
      expect(screen.getAllByTestId(placeCardTestId)).toBe(expectedQuantityPlaceCard);
      expect(screen.getByText(expectedText)).toBeInTheDocument();
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });
});
