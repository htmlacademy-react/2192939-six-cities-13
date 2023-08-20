import LogoLeft from '.';
import { withHistory } from '../../test-mocks/test-component';
import { render, screen } from '@testing-library/react';

describe('Component: LogoLeft', () => {
  it('Ожидаю отрисовку компонента LogoLeft', () => {
    const expectedAltText = '6 cities logo';
    const expectedLogoTestId = 'logoLeftIcon';
    const preparedComponent = withHistory(<LogoLeft />);

    render(preparedComponent);

    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
    expect(screen.getByTestId(expectedLogoTestId)).toBeInTheDocument();
  });
});
