import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import { fullOffers, offers, reviews } from './mocks/offers';
import { AuthStatus } from './settings';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      offers={offers}
      fullOffers={fullOffers}
      reviews={reviews}
      authStatus={AuthStatus.Auth}
    />
  </React.StrictMode>
);
