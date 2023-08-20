import { renderHook } from '@testing-library/react';
import { makeFakeCity } from '../test-mocks/test-mocks';
import useMap from './use-map';
import { MutableRefObject } from 'react';

describe('Hook: useSorting', () => {
  it('Поверяем, что возвращает массив из 3 элементов', () => {
    const mockMapRef = {} as MutableRefObject<HTMLElement | null>;
    const mockCity = makeFakeCity();

    const { result } = renderHook(() => useMap(mockMapRef, mockCity));

    expect(result.current).toBe(null);
  });
});
