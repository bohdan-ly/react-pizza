import Header from '@components/Header/Header';
import '@scss/app.scss';
import React from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import { Outlet } from 'react-router-dom';

const MainLayout: React.FC = () => {
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
