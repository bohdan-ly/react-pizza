import Categories from '@components/Categories/Categories';
import PizzaCard from '@components/PizzaCard/PizzaCard';
import Sort from '@components/Sort/Sort';
import '@scss/app.scss';
import { useEffect, useState } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';

export const CATEGORIES_TYPES = {
  all: 0,
  meat: 1,
  spicy: 2,
  grill: 3,
  closed: 4,
  vegan: 5,
};

const SORT_OPTIONS = [
  { name: 'popularity', sortKey: 'rating' },
  { name: 'alphabet', sortKey: 'title' },
  { name: 'price', sortKey: 'price' },
];

const Home = () => {
  const [curCategory, setCurCategory] = useState(CATEGORIES_TYPES.all);
  const [curSort, setCurSort] = useState(SORT_OPTIONS[0]);
  const [pizzasList, setPizzasList] = useState([{}, {}, {}, {}, {}, {}]);

  useEffect(() => {
    fetchPizzas({ sort: `sortBy=${SORT_OPTIONS[0].sortKey}` });
    window.scrollTo(0, 0);
  }, []);

  const fetchPizzas = async ({ category = '', sort = '' }) => {
    let url = 'https://626d16545267c14d5677d9c2.mockapi.io/items';

    if (category || sort) {
      url = `${url}?${category}&${sort}`;
    }

    const pizzas = await fetch(url).then((res) => res.json());
    if (pizzas) {
      setPizzasList(pizzas);
    }
  };

  const handleChangeCategory = (catType) => {
    const catKey = catType?.toLowerCase();
    if (catKey) {
      setCurCategory(CATEGORIES_TYPES[catKey]);
      // const filteredPizzas = catIdx === null ? pizzas : pizzas.filter((p) => p.category === catIdx);
      // setPizzasList(filteredPizzas);
      fetchPizzas({
        sort: !CATEGORIES_TYPES[catKey] ? '' : `category=${CATEGORIES_TYPES[catKey]}`,
      });
    }
  };

  const handleSort = (sortObj) => {
    setCurSort(sortObj);
    fetchPizzas({
      category: !curCategory ? '' : `category=${curCategory}`,
      sort: `sortBy=${sortObj.sortKey}`,
    });
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories curCategory={curCategory} handleChangeCategory={handleChangeCategory} />
        <Sort sortOptions={SORT_OPTIONS} curSort={curSort} setCurSort={handleSort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {pizzasList.map((p, idx) => (
          <PizzaCard key={`${p.id}_${idx}`} {...p} />
        ))}
      </div>
    </div>
  );
};

export default Home;
