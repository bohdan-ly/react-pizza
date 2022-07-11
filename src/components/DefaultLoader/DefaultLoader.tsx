import React from 'react';
import loader from '@assets/img/loader.svg';
import styles from './Loader.module.scss';

const DefaultLoader: React.FC = () => {
  return (
    <div className="container">
      <div className={styles.loader}>
        <img src={loader} />
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default DefaultLoader;
