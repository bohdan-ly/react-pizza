import Header from '@components/Header/Header';
import NotFound from '@pages/404';
import Cart from '@pages/Cart';
import Home from '@pages/Home2';
import '@scss/app.scss';
import { createContext, useEffect, useState } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import { Route, Routes } from 'react-router-dom';

export const SearchContext = createContext('');

const App = () => {
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {}, []);

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
};

export default App;
