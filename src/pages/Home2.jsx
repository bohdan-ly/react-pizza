import Categories from '@components/Categories/Categories';
import Pagination from '@components/Pagination/Pagination';
import PizzaCard from '@components/PizzaCard/PizzaCard';
import Sort from '@components/Sort/Sort';
import { useDebounceCallback } from '@react-hook/debounce';
import '@scss/app.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';

import { setCategoryId, setFilters, setPage, setSort } from '@/store/slices/filterSlice';
import axios from 'axios';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => ({ filter: state.filter }));

  const { categoryId, sort, search, page } = store.filter;
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  // const [curCategory, setCurCategory] = useState(CATEGORIES_TYPES.all);
  // const [curSort, setCurSort] = useState(SORT_OPTIONS[0]);
  // const [curPage, setCurPage] = useState(1);

  const [pizzasList, setPizzasList] = useState([{}, {}, {}, {}, {}, {}]);

  useEffect(() => {
    setupQuery();
    setupQueryFilters();
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
    window.scrollTo(0, 0);
  }, [categoryId, sort, search, page]);

  const setupQueryFilters = () => {
    if (!isMounted && window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = SORT_OPTIONS.find((s) => s.sortKey === params.sortKey);

      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  };

  const setupQuery = () => {
    if (isMounted) {
      const queryString = qs.stringify({
        sort: sort.sortKey,
        categoryId,
        page,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  };

  const throttledFetch = useDebounceCallback(async () => {
    const sortBy = sort.sortKey.replace('-', '');
    const order = sort.sortKey.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const searchQuery = search.length > 0 ? `&search=${search}` : '';

    const url = `https://626d16545267c14d5677d9c2.mockapi.io/items?page=${page}&limit=4&sortBy=${sortBy}&order=${order}&${category}${searchQuery}`;
    const pizzas = await axios(url).then((res) => res.data);
    if (pizzas) {
      setPizzasList(pizzas);
    }
  }, 700);

  const fetchPizzas = useCallback(throttledFetch, [categoryId, sort, search, page]);

  const handleChangeCategory = (catType) => {
    const catKey = catType?.toLowerCase();
    if (catKey) {
      dispatch(setCategoryId(CATEGORIES_TYPES[catKey]));
    }
  };

  const handleChangeSort = (sortObj) => {
    dispatch(setSort(sortObj));
  };

  const handlePageClick = (pageIdx) => {
    dispatch(setPage(pageIdx + 1));
  };

  // const filteredPizzas = pizzasList.filter(
  //   (p) => p.title.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1,
  // );

  return (
    <div className="container">
      <div className="content__top">
        <Categories curCategory={categoryId} handleChangeCategory={handleChangeCategory} />
        <Sort sortOptions={SORT_OPTIONS} curSort={sort} setCurSort={handleChangeSort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {pizzasList.map((p, idx) => (
          <PizzaCard key={`${p.id}_${idx}`} {...p} />
        ))}
      </div>
      <Pagination pageCount={3} handlePageClick={handlePageClick} />
    </div>
  );
};

export default Home;
