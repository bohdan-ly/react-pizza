import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

type PaginationProps = {
  pageCount: number;
  pageRangeDisplayed?: number;
  handlePageClick: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  pageCount = 3,
  pageRangeDisplayed = 4,
  handlePageClick = () => {},
}) => {
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
