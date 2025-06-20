import type React from 'react';
import styles from './Footer.module.scss';
import PagginationBtn from '../../atoms/PagginationBtn/PagginationBtn';
import { useCallback } from 'react';

interface Props {
  onOpenCreatingModal: () => void;
}

const pages = [1, 2, 3, 4, 5];
const FIRST_PAGE = 1;
const activePage = FIRST_PAGE;

const Footer: React.FC<Props> = ({ onOpenCreatingModal }) => {
  const onChangePage = useCallback(() => {}, []); //TODO

  return (
    <div className={styles.footer}>
      <button className={styles.addBtn} onClick={onOpenCreatingModal}>
        ＋
      </button>

      <div className={styles.pagination}>
        {pages.map(page => {
          return (
            <PagginationBtn
              key={page}
              isActive={page === activePage}
              onClick={onChangePage}
              label={page}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Footer;
