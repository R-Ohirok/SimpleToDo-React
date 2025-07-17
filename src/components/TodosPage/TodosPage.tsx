import { CircularProgress } from '@mui/material';
import Footer from '../organisms/Footer/Footer';
import ToDoList from '../organisms/ToDoList/ToDoList';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import Header from '../organisms/Header/Header';
import { addTodo, deleteTodo } from '../../api/todos';
import { useCallback, useState } from 'react';
import type { FilterStatusType, ToDoType } from '../../types';
import { useTodoSocket } from '../../hooks/useTodoSocket';
import useTodos from '../../hooks/useTodos';
import { FIRST_PAGE, ITEMS_PER_PAGE } from '../../constants/constants';
import { useSearchParams } from 'react-router-dom';
import useKeepSession from '../../hooks/useAutoRefresh';

const TodosPage = () => {
  useKeepSession();
  const [searchParams] = useSearchParams();
  const [isPending, setIsPending] = useState(false);
  const status = searchParams.get('status') as FilterStatusType;
  const title = searchParams.get('title') || '';
  const activePage = Number(searchParams.get('page') || FIRST_PAGE);

  const PARAMS = {
    status,
    title,
    limit: ITEMS_PER_PAGE,
    offset: (activePage - 1) * ITEMS_PER_PAGE,
  };

  const { todos, pagesCount, isLoading } = useTodos(PARAMS);

  useTodoSocket();

  const handleAddTodo = useCallback(
    async (newTodo: ToDoType) => {
      setIsPending(true);

      try {
        await addTodo(newTodo);
      } finally {
        setIsPending(false);
      }
    },
    [todos],
  );

  const handleDeleteToDo = useCallback(
    async (todoId: string) => {
      setIsPending(true);

      await deleteTodo(todoId);

      setIsPending(false);
    },
    [todos],
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      handleDeleteToDo(active.id as string);
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100%',
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <Header />

      <main>
        <DndContext onDragEnd={handleDragEnd}>
          <ToDoList todos={todos} onDeleteToDo={handleDeleteToDo} />
        </DndContext>
      </main>

      <Footer
        pagesCount={pagesCount}
        activePage={activePage}
        onCreateToDo={handleAddTodo}
      />

      {isPending && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(25, 25, 25, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '5',
          }}
        >
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default TodosPage;
