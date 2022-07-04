import React from 'react';
import NotFoundBlock from '@components/NotFound/NotFoundBlock';

const NotFound = () => {
  return (
    <section className="section__empty">
      <div className="container">
        <div className="empty">
          <NotFoundBlock />
        </div>
      </div>
    </section>
  );
};

export default NotFound;
