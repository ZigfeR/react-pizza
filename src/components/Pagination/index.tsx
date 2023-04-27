import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

type PaginationProps = {
  pageCount: number;
  onPageChange: (data: { selected: number }) => void;
};

export const Pagination: React.FC<PaginationProps> = ({ onPageChange, pageCount }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      previousLabel="<"
      pageCount={pageCount}
      nextLabel=">"
      onPageChange={onPageChange}
      pageRangeDisplayed={3}
    />
  );
};
