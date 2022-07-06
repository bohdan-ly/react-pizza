import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

const Pagination = ({ pageCount = 3, pageRangeDisplayed = 4, handlePageClick = () => {} }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => handlePageClick(e.selected)}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="<"
    />
  );
};

export default Pagination;
