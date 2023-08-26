import { withHistory, withStore } from '../../test-mocks/test-component';
import { render, screen } from '@testing-library/react';
import {
  makeFakeCity,
  makeFakeFullOffer,
  makeFakeOffer,
  makeFakeStore
} from '../../test-mocks/test-mocks';
import Map from '.';
import { testInitialState } from '../../store/app-data/app-data';

describe('Component: Map', () => {
  it('Ожидаю отрисовку компонента на главной странице', () => {
    const mapTestId = 'mapElement';
    const mockCity = makeFakeCity();
    const mockOffers = [makeFakeOffer(), makeFakeOffer()];
    const withHistoryComponent = withHistory(
      <Map
        city={mockCity}
        offers={mockOffers}
      />);
    const { withStoreComponent } = withStore(
      withHistoryComponent, makeFakeStore({
        DATA: {
          ...testInitialState
        }
      }));


    render(withStoreComponent);

    expect(screen.getByTestId(mapTestId)).toBeInTheDocument();
  });

  it('Ожидаю отрисовку компонента на странице предложения', () => {
    const mapTestId = 'mapElement';
    const mockCity = makeFakeCity();
    const mockOffers = [makeFakeOffer(), makeFakeOffer()];
    const mockFullOffer = makeFakeFullOffer();
    const withHistoryComponent = withHistory(
      <Map
        city={mockCity}
        offers={mockOffers}
        fullOffer={mockFullOffer}
      />);
    const { withStoreComponent } = withStore(
      withHistoryComponent, makeFakeStore({
        DATA: {
          ...testInitialState
        }
      }));


    render(withStoreComponent);

    expect(screen.getByTestId(mapTestId)).toBeInTheDocument();
  });
});
