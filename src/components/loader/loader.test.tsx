import { render, screen } from '@testing-library/react';
import Loader from '.';

describe('Component: Loader', () => {
  it('Ожидаю загрузчик', () => {
    const loaderTestId = 'loader';

    render(<Loader />);

    const loaderContainer = screen.getByTestId(loaderTestId);

    expect(loaderContainer).toBeInTheDocument();
  });
});
