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
  { name: 'popularity (hight to low)', sortKey: 'rating' },
  { name: 'popularity (low to high)', sortKey: '-rating' },
  { name: 'alphabet (hight to low)', sortKey: 'title' },
  { name: 'alphabet (low to high)', sortKey: '-title' },
  { name: 'price (hight to low)', sortKey: 'price' },
  { name: 'price (low to high)', sortKey: '-price' },
];

const Home = () => {
  const [curCategory, setCurCategory] = useState(CATEGORIES_TYPES.all);
  const [curSort, setCurSort] = useState(SORT_OPTIONS[0]);
  const [pizzasList, setPizzasList] = useState([{}, {}, {}, {}, {}, {}]);

  useEffect(() => {
    fetchPizzas();
    window.scrollTo(0, 0);
  }, [curCategory, curSort]);

  const fetchPizzas = async () => {
    const sortBy = curSort.sortKey.replace('-', '');
    const order = curSort.sortKey.includes('-') ? 'asc' : 'desc';
    const category = curCategory > 0 ? `category=${curCategory}` : '';
    const url = `https://626d16545267c14d5677d9c2.mockapi.io/items?sortBy=${sortBy}&order=${order}&${category}`;
    const pizzas = await fetch(url).then((res) => res.json());
    if (pizzas) {
      setPizzasList(pizzas);
    }
  };

  const handleChangeCategory = (catType) => {
    const catKey = catType?.toLowerCase();
    if (catKey) {
      setCurCategory(CATEGORIES_TYPES[catKey]);
    }
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories curCategory={curCategory} handleChangeCategory={handleChangeCategory} />
        <Sort sortOptions={SORT_OPTIONS} curSort={curSort} setCurSort={setCurSort} />
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
