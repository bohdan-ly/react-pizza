import MainLayout from '@/layouts/MainLayout';
import NotFound from '@pages/404';
import Cart from '@pages/Cart';
import FullPizza from '@pages/FullPizza';
import Home from '@pages/Home';
import '@scss/app.scss';
import { useEffect } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import { Route, Routes } from 'react-router-dom';

// export const SearchContext = createContext('');

const App = () => {
  useEffect(() => {}, []);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
