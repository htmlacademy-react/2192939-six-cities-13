import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import { Provider } from 'react-redux';
import { store } from '../src/store/index';
import { checkAuthStatus, fetchOffersAction } from './store/api-actions';
import HistoryRouter from './components/history-route';
import browserHistory from './browser-history';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(checkAuthStatus());
store.dispatch(fetchOffersAction());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
