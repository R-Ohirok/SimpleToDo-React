import type React from 'react';
import styles from './Footer.module.scss';
import { memo, useCallback, useState } from 'react';
import Pagination from '../../molecules/Pagination/Pagination';
import CreateTodoModal from '../../molecules/CreateTodoModal/CreateTodoModal';
import type { ToDoType } from '../../../types';

interface Props {
  pagesCount: number;
  activePage: number;
  onChangePage: (newActivePage: number) => void;
  onCreateToDo: (newTodo: ToDoType) => void;
}

const Footer: React.FC<Props> = memo(
  ({ pagesCount, activePage, onChangePage, onCreateToDo }) => {
    const [isCreationModalVisible, setIsCreationModalVisible] = useState(false);

    const handleChangeModalVisibility = useCallback(() => {
      setIsCreationModalVisible(prev => !prev);
    }, []);

    return (
      <>
        <div className={styles.footer}>
          <button className={styles.addBtn} onClick={handleChangeModalVisibility}>
            ＋
          </button>

          <Pagination
            pagesCount={pagesCount}
            activePage={activePage}
            onChangePage={onChangePage}
          />
        </div>

        {isCreationModalVisible && (
          <CreateTodoModal
            onClose={handleChangeModalVisibility}
            onCreateToDo={onCreateToDo}
          />
        )}
      </>
    );
  },
);

export default Footer;
