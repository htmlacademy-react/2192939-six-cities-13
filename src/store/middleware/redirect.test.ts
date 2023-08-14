import { redirect } from './redirect';
import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../state';
import { AnyAction } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history';
import { redirectToRoute } from '../action';
import { AppRoute } from '../../settings';

vi.mock('../../browser-history.ts', () => ({
  default: {
    location: { pathname: '' },
    push(path: string) {
      this.location.pathname = path;
    }
  }
}));

describe('Redirect middleware', () => {
  let store: MockStore;

  beforeAll(() => {
    const middleware = [redirect];
    const MockStoreCreator = configureMockStore<State, AnyAction>(middleware);
    store = MockStoreCreator();
  });

  beforeEach(() => {
    browserHistory.push('');
  });

  it('should redirect to "/login" with redirectToRout action', () => {
    const redirectAction = redirectToRoute(AppRoute.Login);
    store.dispatch(redirectAction);
    expect(browserHistory.location.pathname).toBe(AppRoute.Login);
  });

  it('should not redirect to "/not-found" with empty action', () => {
    const emptyAction = { type: '', payload: AppRoute.NoFound };
    store.dispatch(emptyAction);
    expect(browserHistory.location.pathname).not.toBe(AppRoute.NoFound);
  });
});

