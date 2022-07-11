import Categories from '@components/Categories/Categories';
import Pagination from '@components/Pagination/Pagination';
import PizzaCard from '@components/PizzaCard/PizzaCard';
import Sort from '@components/Sort/Sort';
import { useDebounceCallback } from '@react-hook/debounce';
import '@scss/app.scss';
import { useCallback, useEffect, useRef } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';

import { useAppSelector } from '@/hooks/global';
import { setCategoryId, setFilters, setPage, setSort } from '@/store/slices/filterSlice';
import { fetchPizzas } from '@/store/slices/pizzasSlice';
import { SortOption } from '@components/Sort/Sort';
import qs from 'qs';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

type CategoriesTypes = {
  all: number;
  meat: number;
  spicy: number;
  grill: number;
  closed: number;
  vegan: number;
};

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

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useAppSelector((state) => ({ filter: state.filter, pizzas: state.pizzas }));

  const { filter, pizzas } = store;

  const { categoryId, sort, search, page } = filter;
  const { items: pizzasList, status } = pizzas;

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  // const [curCategory, setCurCategory] = useState(CATEGORIES_TYPES.all);
  // const [curSort, setCurSort] = useState(SORT_OPTIONS[0]);
  // const [curPage, setCurPage] = useState(1);

  // const [pizzasList, setPizzasList] = useState([{}, {}, {}, {}, {}, {}]);

  useEffect(() => {
    setupQuery();
    setupQueryFilters();
    if (!isSearch.current) {
      getPizzas();
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

    dispatch(
      fetchPizzas({
        page,
        sortBy,
        order,
        category,
        searchQuery,
      }),
    );
  }, 700);

  const getPizzas = useCallback(throttledFetch, [categoryId, sort, search, page]);

  const getCategoryId = (key: keyof CategoriesTypes) => CATEGORIES_TYPES[key];

  const handleChangeCategory = (catType: string) => {
    const catKey = catType?.toLowerCase();
    if (catKey) {
      dispatch(setCategoryId(getCategoryId(catKey)));
    }
  };

  const handleChangeSort = (sortObj: SortOption) => {
    dispatch(setSort(sortObj));
  };

  const handlePageClick = (pageIdx: number) => {
    dispatch(setPage(pageIdx + 1));
  };

  // const filteredPizzas = pizzasList.filter(
  //   (p) => p.title.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1,
  // );

  const renderPizzasList = () => {
    if (status === 'error')
      return (
        <div className="content__items">
          <h2>Failed to get pizzas. Please try again later.</h2>
        </div>
      );

    return (
      <div className="content__items">
        {pizzasList.map((p: any, idx: number) => (
          <PizzaCard key={`${p.id}_${idx}`} {...p} />
        ))}
      </div>
    );
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories curCategory={categoryId} handleChangeCategory={handleChangeCategory} />
        <Sort sortOptions={SORT_OPTIONS} curSort={sort} setCurSort={handleChangeSort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {renderPizzasList()}
      <Pagination pageCount={3} handlePageClick={handlePageClick} />
    </div>
  );
};

export default Home;
