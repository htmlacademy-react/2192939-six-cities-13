import { Helmet } from 'react-helmet-async';
import Header from '../../components/header';
import { useAppSelector } from '../../hooks';
import Cities from '../../components/cities';

export default function MainPage(): JSX.Element {
  const authStatus = useAppSelector((state) => state.authStatus);

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <Header authStatus={authStatus} />
      <Cities />
    </div>
  );
}
