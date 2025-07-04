import type React from 'react';
import styles from './Pagination.module.scss';
import PagginationBtn from '../../atoms/PagginationBtn/PagginationBtn';
import { memo } from 'react';

interface Props {
  pagesCount: number;
  activePage: number;
  onChangePage: (newActivePage: number) => void;
}

const Pagination: React.FC<Props> = memo(
  ({ pagesCount, activePage, onChangePage }) => {
    const pages = Array.from({ length: pagesCount }, (_, i) => ++i);

    return (
      <div className={styles.pagination}>
        {pages.map(page => {
          return (
            <PagginationBtn
              key={page}
              isActive={page === activePage}
              onChangePage={onChangePage}
              label={page}
            />
          );
        })}
      </div>
    );
  },
);

export default Pagination;
