import MainPage from '../../pages/main';
import { Setting } from '../../settings';

export default function App(): JSX.Element {
  return <MainPage offersCount={Setting.OffersCount} />;
}
