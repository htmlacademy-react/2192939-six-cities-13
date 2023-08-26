import { render, screen } from '@testing-library/react';
import { withStore } from '../../test-mocks/test-component';
import Cities from '.';
import { testInitialState } from '../../store/app-data/app-data';

describe('Component: Cities', () => {
  it('Проверяем правильность отрисовки', () => {
    const expectedTest = 'Cities';
    const { withStoreComponent } = withStore(<Cities />, {
      DATA: {
        ...testInitialState
      }
    });

    render(withStoreComponent);

    expect(screen.getByText(expectedTest)).toBeInTheDocument();
  });
});
