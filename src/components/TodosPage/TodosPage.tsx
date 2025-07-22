import { CircularProgress } from '@mui/material';
import Footer from '../organisms/Footer/Footer';
import ToDoList from '../organisms/ToDoList/ToDoList';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import Header from '../organisms/Header/Header';
import { useCallback, useState } from 'react';
import type { FilterStatusType, ToDoType } from '../../types';
import { useTodoSocket } from '../../hooks/useTodoSocket';
import { FIRST_PAGE, ITEMS_PER_PAGE } from '../../constants/constants';
import { useSearchParams } from 'react-router-dom';
import useKeepSession from '../../hooks/useAutoRefresh';
import { useQuery, useMutation } from '@apollo/client';
import { GET_TODOS } from '../../graphql/queries';
import { ADD_TODO, DELETE_TODO } from '../../graphql/mutations';

const TodosPage = () => {
  useKeepSession();
  const [searchParams] = useSearchParams();
  const [isPending, setIsPending] = useState(false);
  const status = searchParams.get('status') as FilterStatusType;
  const title = searchParams.get('title') || '';
  const activePage = Number(searchParams.get('page') || FIRST_PAGE);

  const { data, loading: isLoading, refetch } = useQuery(GET_TODOS, {
    variables: {
      status,
      title,
      limit: ITEMS_PER_PAGE,
      offset: (activePage - 1) * ITEMS_PER_PAGE,
    },
    fetchPolicy: 'network-only',
  });

  const [addTodoMutation] = useMutation(ADD_TODO);
  const [deleteTodoMutation] = useMutation(DELETE_TODO);

  useTodoSocket();

  const handleAddTodo = useCallback(
    async (newTodo: ToDoType) => {
      setIsPending(true);

      try {
        await addTodoMutation({
          variables: {
            id: newTodo.id,
            title: newTodo.title,
            isCompleted: newTodo.isCompleted,
          },
        });

        await refetch();
      } finally {
        setIsPending(false);
      }
    },
    [addTodoMutation, refetch],
  );

  const handleDeleteToDo = useCallback(
    async (todoId: string) => {
      setIsPending(true);

      try {
        await deleteTodoMutation({
          variables: { id: todoId },
        });

        await refetch();
      } finally {
        setIsPending(false);
      }
    },
    [deleteTodoMutation, refetch],
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

  const todos = data?.todos?.todos || [];
  const pagesCount = data?.todos?.pagesCount || 1;

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