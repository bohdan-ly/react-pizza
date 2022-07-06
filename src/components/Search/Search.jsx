import React, { useContext, useEffect, useState } from 'react';
import styles from './Search.module.scss';
import CloseIcon from '@assets/img/close.svg';
import { SearchContext } from '../../App';

import { useSelector, useDispatch } from 'react-redux';
import { setSearch } from '@/store/slices/filterSlice';
import { useDebounceCallback } from '@react-hook/debounce';

const Search = () => {
  // const { searchValue, setSearchValue } = useContext(SearchContext);
  const store = useSelector((state) => ({ filter: state.filter }));
  const dispatch = useDispatch();

  const { search } = store.filter;

  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setSearchValue(search);
  }, [search]);

  const debouncedSearch = useDebounceCallback((searchValue) => {
    dispatch(setSearch(searchValue));
  }, 700);

  const onChangeSearch = (val) => {
    setSearchValue(val);
    debouncedSearch(val);
  };

  return (
    <div className={styles.search}>
      <div>
        <svg
          className={styles.icon}
          height="512px"
          id="Layer_1"
          version="1.1"
          viewBox="0 0 512 512"
          width="512px"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M344.5,298c15-23.6,23.8-51.6,23.8-81.7c0-84.1-68.1-152.3-152.1-152.3C132.1,64,64,132.2,64,216.3  c0,84.1,68.1,152.3,152.1,152.3c30.5,0,58.9-9,82.7-24.4l6.9-4.8L414.3,448l33.7-34.3L339.5,305.1L344.5,298z M301.4,131.2  c22.7,22.7,35.2,52.9,35.2,85c0,32.1-12.5,62.3-35.2,85c-22.7,22.7-52.9,35.2-85,35.2c-32.1,0-62.3-12.5-85-35.2  c-22.7-22.7-35.2-52.9-35.2-85c0-32.1,12.5-62.3,35.2-85c22.7-22.7,52.9-35.2,85-35.2C248.5,96,278.7,108.5,301.4,131.2z" />
        </svg>
      </div>
      <input
        className={styles.input}
        value={searchValue}
        onChange={(e) => onChangeSearch(e.target.value)}
        placeholder="Search pizza..."
      />
      {searchValue && (
        <svg
          onClick={onChangeSearch.bind(null, '')}
          className={styles.close}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.29285 19.293L19.2928 3.29297L20.7071 4.70718L4.70706 20.7072L3.29285 19.293Z"
            fill="black"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20.707 19.293L4.70703 3.29297L3.29282 4.70718L19.2928 20.7072L20.707 19.293Z"
            fill="black"
          />
        </svg>
      )}
    </div>
  );
};

export default Search;
