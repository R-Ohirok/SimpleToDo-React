import type React from 'react';
import styles from './Footer.module.scss';
import { memo, useCallback } from 'react';
import Pagination from '../../molecules/Pagination/Pagination';
import CreateTodoModal from '../../molecules/CreateTodoModal/CreateTodoModal';
import type { ToDoType } from '../../../types';
import { useSearchParams } from 'react-router-dom';
import { FIRST_PAGE } from '../../../constants/constants';
import { getNewSearchParams } from '../../../utils/getNewSearchParams';

interface Props {
  pagesCount: number;
  onCreateToDo: (newTodo: ToDoType) => void;
}

const Footer: React.FC<Props> = memo(({ pagesCount, onCreateToDo }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const activePage = Number(searchParams.get('page')) || FIRST_PAGE;
  const isCreationModalVisible = searchParams.has('creationModal');

  const handlePageChange = useCallback(
    (newPage: number) => {
      const newParamsString = getNewSearchParams(searchParams, {
        page: newPage.toString(),
      });

      setSearchParams(newParamsString);
    },
    [searchParams],
  );

  const handleChangeModalVisibility = useCallback(() => {
    if (isCreationModalVisible) {
      const newParamsString = getNewSearchParams(searchParams, {
        creationModal: null,
      });

      setSearchParams(newParamsString);
    } else {
      const newParamsString = getNewSearchParams(searchParams, {
        creationModal: 'true',
      });

      setSearchParams(newParamsString);
    }
  }, [searchParams]);

  return (
    <>
      <div className={styles.footer}>
        <button className={styles.addBtn} onClick={handleChangeModalVisibility}>
          ＋
        </button>

        {pagesCount !== 0 && (
          <Pagination
            pagesCount={pagesCount}
            activePage={activePage}
            onChangePage={handlePageChange}
          />
        )}
      </div>

      {isCreationModalVisible && (
        <CreateTodoModal
          onClose={handleChangeModalVisibility}
          onCreateToDo={onCreateToDo}
        />
      )}
    </>
  );
});

export default Footer;
