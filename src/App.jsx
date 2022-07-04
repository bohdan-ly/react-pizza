import Header from '@components/Header/Header';
import NotFound from '@pages/404';
import Home from '@pages/Home2';
import Cart from '@pages/Cart';
import '@scss/app.scss';
import { useEffect, useState } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  useEffect(() => {}, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
