import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

type PaginationProps = {
  currentPage: number;
  itemsPage: number;
  onChangePage: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({ currentPage, onChangePage, itemsPage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      previousLabel="<"
      pageCount={itemsPage}
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      // pageRangeDisplayed={4}
      // forcePage={currentPage - 1}
    />
  );
};
