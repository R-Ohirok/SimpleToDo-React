import type React from 'react';
import styles from './Footer.module.scss';
import { memo } from 'react';
import Pagination from '../../molecules/Pagination/Pagination';

interface Props {
  onOpenCreatingModal: () => void;
  pagesCount: number;
  activePage: number;
  onChangePage: (newActivePage: number) => void;
}

const Footer: React.FC<Props> = memo(
  ({ onOpenCreatingModal, pagesCount, activePage, onChangePage }) => {
    console.log('render footer');
    return (
      <div className={styles.footer}>
        <button className={styles.addBtn} onClick={onOpenCreatingModal}>
          ＋
        </button>

        <Pagination
          pagesCount={pagesCount}
          activePage={activePage}
          onChangePage={onChangePage}
        />
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.activePage === nextProps.activePage &&
      prevProps.pagesCount === nextProps.pagesCount
    );
  },
);

export default Footer;
