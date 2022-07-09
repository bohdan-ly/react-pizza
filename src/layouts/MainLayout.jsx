import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@components/Header/Header';
import '@scss/app.scss';
import 'react-loading-skeleton/dist/skeleton.css';

const MainLayout = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
