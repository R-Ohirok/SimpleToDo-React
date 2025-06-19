import type React from 'react';
import styles from './Footer.module.scss';
import { PagginationBtn } from '../../atoms/Dropdown/PagginationBtn';

interface Props {}

export const Footer: React.FC<Props> = () => {
  const pages = [1, 2, 3, 4, 5];
  const activePage = 2;
  return (
    <div className={styles.footer}>
      <button className={styles.addBtn}>＋</button>

      <div className={styles.pagination}>
        {pages.map(page => {
          return (
            <PagginationBtn key={page} isSelected={page === activePage} click={() => {}}>
              {page}
            </PagginationBtn>
          );
        })}
      </div>
    </div>
  );
};
