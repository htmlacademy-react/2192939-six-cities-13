import Page404 from '.';
import { withHistory } from '../../test-mokes/test-component';
import { render, screen } from '@testing-library/react';

describe('Component: LogoLeft', () => {
  it('Ожидаю отрисовку компонента LogoLeft', () => {
    const expectedText = '404 Not Found';
    const preparedComponent = withHistory(<Page404 />);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
