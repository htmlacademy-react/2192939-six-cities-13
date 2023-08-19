import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withStore } from '../../test-mocks/test-component';
import ErrorScreen from '.';
import { APIRoute } from '../../settings';
import { extractActionTypes } from '../../test-mocks/test-mocks';
import { fetchOffersAction } from '../../store/api-actions';

describe('Component: ErrorScreen', () => {
  it('Проверяем правильность отрисовки', () => {
    const firstExpectedTest = 'Failed to load data from server';
    const { withStoreComponent } = withStore(<ErrorScreen />, {});

    render(withStoreComponent);

    expect(screen.getByText(firstExpectedTest)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('Проверяем действия пользователя', async () => {
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(<ErrorScreen />, {});
    mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, []);

    render(withStoreComponent);
    await userEvent.click(screen.getByRole('button'));
    const actions = extractActionTypes(mockStore.getActions());

    expect(actions).toEqual([
      fetchOffersAction.pending.type,
      fetchOffersAction.fulfilled.type
    ]);
  });

});
