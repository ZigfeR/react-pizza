import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

type PaginationProps = {
  itemsPage: number;
  onChangePage: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({ onChangePage, itemsPage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      previousLabel="<"
      pageCount={itemsPage}
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={3}
      // forcePage={itemsPage - 1}
    />
  );
};
