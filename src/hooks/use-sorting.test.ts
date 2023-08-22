import { renderHook } from '@testing-library/react';
import useSorting from './use-sorting';
import { SortingType } from '../types/data-types';

describe('Hook: useSorting', () => {
  it('Поверяем, что возвращает массив из 3 элементов', () => {
    const onChangeSorting: (value: SortingType) => void = vi.fn();

    const { result } = renderHook(() => useSorting({ onChangeSorting }));
    const [changeSorting, handleChangeSorting, handleTypeSortingClick] = result.current;

    expect(result.current).toHaveLength(3);
    expect(typeof changeSorting).toBe('boolean');
    expect(typeof handleChangeSorting).toBe('function');
    expect(typeof handleTypeSortingClick).toBe('function');
  });

  it('Поверяем, что возвращает ', () => {
    const onChangeSorting: (value: SortingType) => void = vi.fn();

    const { result } = renderHook(() => useSorting({ onChangeSorting }));
    const [changeSorting] = result.current;

    expect(changeSorting).toBe(false);
  });

});
