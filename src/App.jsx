import { useState } from 'react';
import '@scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaCard from './components/PizzaCard';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            <PizzaCard title="Peperoni" price="258" />
            <PizzaCard title="Cheese" price="404" />
            <PizzaCard title="Meat" price="125" />
            <PizzaCard title="Mushrooms" price="354" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
