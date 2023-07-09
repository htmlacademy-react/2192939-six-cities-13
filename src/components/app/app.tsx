import MainPage from '../../pages/main/main';
import { Setting } from '../../settings';

export default function App(): JSX.Element {
  return <MainPage offersCount={Setting.OffersCount} />;
}
