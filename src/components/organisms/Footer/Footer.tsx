import type React from 'react';
import styles from './Footer.module.scss';
import PagginationBtn from '../../atoms/PagginationBtn/PagginationBtn';

interface Props {
  onOpenCreatingModal: () => void;
}

const pages = [1, 2, 3, 4, 5];
const activePage = 2;

export const Footer: React.FC<Props> = ({ onOpenCreatingModal }) => {
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
