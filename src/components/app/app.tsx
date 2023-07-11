import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../../pages/main';
import LoginPage from '../../pages/login';
import FavoritesPage from '../../pages/favorites';
import OfferPage from '../../pages/offer';
import NoPage from '../../pages/no-page';

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="offer/:id" element={<OfferPage />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
