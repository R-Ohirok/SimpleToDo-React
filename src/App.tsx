import './index.scss';
import Footer from './components/organisms/Footer/Footer';
import Header from './components/organisms/Header/Header';
import ToDoList from './components/organisms/ToDoList/ToDoList';
import { useCallback, useMemo } from 'react';
import { FIRST_PAGE, ITEMS_PER_PAGE } from './constants/constants';
import type { FilterStatusType, ToDoType } from './types';
import { useSearchParams } from 'react-router-dom';
import useTodos from './hooks/useTodos';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import useAddTodo from './hooks/useAddToDo';
import { useDeleteTodo } from './hooks/useDeleteToDo';
import { CircularProgress } from '@mui/material';
import { useTodoSocket } from './hooks/useTodoSocket';

function App() {
  const [searchParams] = useSearchParams();
  const status = (searchParams.get('status') as FilterStatusType);
  const title = searchParams.get('title') || undefined;
  const activePage = searchParams.get('page') || FIRST_PAGE.toString();

  const PARAMS = useMemo (() => {
    return {
      status,
      title,
      limit: ITEMS_PER_PAGE,
      offset: (+activePage - 1) * ITEMS_PER_PAGE
    };
  }, [status, title, activePage]);

  const { todos, pagesCount, isLoading } = useTodos(PARAMS);

  useTodoSocket(PARAMS);

  const addTodoMutation = useAddTodo();
  const deleteTodoMutation = useDeleteTodo();

  const handleAddTodo = useCallback(
    (newTodo: ToDoType) => {
      addTodoMutation.mutate(newTodo);
    },
    [addTodoMutation],
  );

  const handleDeleteToDo = useCallback(
    (todoId: string) => {
      deleteTodoMutation.mutate(todoId);
    },
    [deleteTodoMutation, todos],
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
    <div className="app">
      <Header />

      <main>
        <DndContext onDragEnd={handleDragEnd}>
          <ToDoList
            todos={todos}
            onDeleteToDo={handleDeleteToDo}
          />
        </DndContext>
      </main>

      <Footer
        pagesCount={pagesCount}
        activePage={+activePage}
        onCreateToDo={handleAddTodo}
      />

      {(addTodoMutation.isPending || deleteTodoMutation.isPending) && (
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
    </div>
  );
}

export default App;
