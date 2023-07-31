import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import { fullOffers, offers, reviewsList } from './mocks/offers';
import { AuthStatus } from './constants/settings';
import { Provider } from 'react-redux';
import { store } from '../src/store/index';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        offers={offers}
        fullOffers={fullOffers}
        reviewsList={reviewsList}
        authStatus={AuthStatus.Auth}
      />
    </Provider>
  </React.StrictMode>
);
