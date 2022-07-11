import React from 'react';

type CategoriesProps = {
  curCategory: number;
  handleChangeCategory: (cat: string) => void;
};

const Categories: React.FC<CategoriesProps> = ({
  curCategory = null,
  handleChangeCategory = () => {},
}) => {
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
