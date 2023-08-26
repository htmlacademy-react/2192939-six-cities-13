import { render, screen } from '@testing-library/react';
import { withStore } from '../../test-mocks/test-component';
import { makeFakeCity } from '../../test-mocks/test-mocks';
import CitiesList from './cities-list';
import { testInitialState } from '../../store/app-data/app-data';

describe('Component: CitiesList', () => {
  it('Проверяем правильность отрисовки', () => {
    const cityNameTestId = 'cityNameElement';
    const mockExpectedCityName = [makeFakeCity().name];
    const { withStoreComponent } = withStore(
      <CitiesList cities={mockExpectedCityName} />,
      {
        DATA: {
          ...testInitialState,
          currentCityName: mockExpectedCityName[0],
        }
      });

    render(withStoreComponent);

    expect(screen.getByText(mockExpectedCityName[0])).toBeInTheDocument();
    expect(screen.getAllByTestId(cityNameTestId).length)
      .toBe(mockExpectedCityName.length);
  });
});
