import type React from 'react';
import styles from './Footer.module.scss';
import PagginationBtn from '../../atoms/PagginationBtn/PagginationBtn';

interface Props {}

const pages = [1, 2, 3, 4, 5];
const activePage = 2;

const Footer: React.FC<Props> = () => {
  return (
    <div className={styles.footer}>
      <button className={styles.addBtn}>＋</button>

      <div className={styles.pagination}>
        {pages.map(page => {
          return (
            <PagginationBtn
              key={page}
              isActive={page === activePage}
              onClick={() => {}}
              label={page}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Footer;
