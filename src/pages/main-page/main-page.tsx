import { Helmet } from 'react-helmet-async';
import Header from '../../components/header';
import Cities from '../../components/cities';

export default function MainPage(): JSX.Element {


  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <Header />
      <Cities />
    </div>
  );
}
