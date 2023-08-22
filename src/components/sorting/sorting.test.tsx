import { render, screen } from '@testing-library/react';
import { TIME_TO_RENDER_PAGE } from '../../settings';
import Sorting from '.';
import { SortingType } from '../../types/data-types';

describe('Component: Sorting', () => {

  it('Ожидаю отрисовку компонента', () => {
    const onChangeSorting: (value: SortingType) => void = vi.fn();
    const expectedSortingText = 'Sort by';
    const mockSortingMap = {
      type: 'priceToHigh',
      title: 'Price: low to high',
    };

    render(<Sorting onChangeSorting={onChangeSorting} typeSorting='priceToHigh' />);

    const waitingRenderTimer = setTimeout(() => {
      expect(screen.getByText(expectedSortingText)).toBeInTheDocument();
      expect(screen.getByText(mockSortingMap.title)).toBeInTheDocument();
      expect(screen.getByText(mockSortingMap.type)).toBeInTheDocument();
      clearTimeout(waitingRenderTimer);
    }, TIME_TO_RENDER_PAGE);
  });
});
