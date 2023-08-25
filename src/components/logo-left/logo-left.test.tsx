import { MemoryHistory, createMemoryHistory } from 'history';
import LogoLeft from '.';
import { withHistory, withStore } from '../../test-mocks/test-component';
import { render, screen } from '@testing-library/react';
import { makeFakeStore } from '../../test-mocks/test-mocks';
import { AppRoute, TIME_TO_RENDER_PAGE } from '../../settings';
import { testInitialState } from '../../store/app-data/app-data';

describe('Component: LogoLeft', () => {
  it('Ожидаю отрисовку компонента LogoLeft', () => {
    const expectedAltText = '6 cities logo';
    const expectedLogoTestId = 'logoLeftIcon';
    const preparedComponent = withHistory(<LogoLeft />);

    render(preparedComponent);

    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
    expect(screen.getByTestId(expectedLogoTestId)).toBeInTheDocument();
  });

  it('Ожидаю клик по логотипу', () => {
    const mockHistory: MemoryHistory = createMemoryHistory();
    const expectedText = 'Cities';
    const withHistoryComponent = withHistory(<LogoLeft />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent, makeFakeStore({
        DATA: {
          ...testInitialState
        }
      }));
    mockHistory.push(AppRoute.Root);

    render(withStoreComponent);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByText(expectedText)).toBeInTheDocument();
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });
});
