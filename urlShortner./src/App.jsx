import { Routes, Route } from 'react-router-dom';
import Shortener from './pages/Shortener';
import Statistics from './pages/Statistics';
import RedirectHandler from './pages/RedirectHandler';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Shortener />} />
      <Route path="/stats" element={<Statistics />} />
      <Route path=":code" element={<RedirectHandler />} />
    </Routes>
  );
}
