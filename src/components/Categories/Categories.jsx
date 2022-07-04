import React, { useState } from 'react';
import { CATEGORIES_TYPES } from '@pages/home';

const Categories = ({ curCategory = null, handleChangeCategory = (idx) => {} }) => {
  const categories = ['All', 'Meat', 'Spicy', 'Grill', 'Closed', 'Vegan'];

  return (
    <div className="categories">
      <ul>
        {categories.map((cat, idx) => (
          <li
            key={cat}
            className={idx === curCategory ? 'active' : ''}
            onClick={handleChangeCategory.bind(null, cat)}>
            {cat}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
