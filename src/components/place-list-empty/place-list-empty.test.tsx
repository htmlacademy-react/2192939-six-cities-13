import { withHistory, withStore } from '../../test-mocks/test-component';
import { render, screen } from '@testing-library/react';
import { makeFakeStore } from '../../test-mocks/test-mocks';
import { TIME_TO_RENDER_PAGE } from '../../settings';
import PlaceListEmpty from '.';

describe('Component: PlaceList', () => {
  it('Ожидаю отрисовку компонента', () => {
    const expectedText = 'No places to stay available';
    const withHistoryComponent = withHistory(
      <PlaceListEmpty />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
    }));

    render(withStoreComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByText(expectedText)).toBeInTheDocument();
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });
});
