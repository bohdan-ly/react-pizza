import MainLayout from '@/layouts/MainLayout';
// import NotFound from '@pages/404';
// import Cart from '@pages/Cart';
// import FullPizza from '@pages/FullPizza';
import Home from '@pages/Home';
import '@scss/app.scss';
import React, { Suspense } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import { Route, Routes } from 'react-router-dom';

const Cart = React.lazy(() => import('@pages/Cart'));
const FullPizza = React.lazy(() => import('@pages/FullPizza'));
const NotFound = React.lazy(() => import('@pages/404'));

// export const SearchContext = createContext('');

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path="cart"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
