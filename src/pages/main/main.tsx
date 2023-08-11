import { Helmet } from 'react-helmet-async';
import Header from '../../components/header';
import Cities from '../../components/cities';
import { AuthStatus } from '../../settings';
import { Offers } from '../../types/data-types';

type MainPageProp = {
  offers: Offers;
  favoritesCount: number;
  authStatus: AuthStatus;
}

export default function MainPage({ offers, favoritesCount, authStatus }: MainPageProp): JSX.Element {


  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <Header authStatus={authStatus} favoritesCount={favoritesCount} />
      <Cities offers={offers} />
    </div>
  );
}
