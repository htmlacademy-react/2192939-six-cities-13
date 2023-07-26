import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import { fullOffers, offers, reviewsList } from './mocks/offers';
import { AuthStatus } from './settings';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      offers={offers}
      fullOffers={fullOffers}
      reviewsList={reviewsList}
      authStatus={AuthStatus.Auth}
    />
  </React.StrictMode>
);
