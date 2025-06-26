import './index.scss';
import Footer from './components/organisms/Footer/Footer';
import Header from './components/organisms/Header/Header';
import ToDoList from './components/organisms/ToDoList/ToDoList';
import { useCallback, useEffect, useMemo } from 'react';
import { filterTodos } from './utils/filterToDos';
import { FIRST_PAGE, ITEMS_PER_PAGE } from './constants/constants';
import { getVisibleTodos } from './utils/getVisibleToDos';
import type { ToDoType } from './types';
import { useSearchParams } from 'react-router-dom';
import { getNewSearchParams } from './utils/getNewSearchParams';
import useTodos from './hooks/useTodos';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import useAddTodo from './hooks/useAddToDo';
import { useDeleteTodo } from './hooks/useDeleteToDo';
import { CircularProgress } from '@mui/material';

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { todos, isLoading } = useTodos();
  const addTodoMutation = useAddTodo();
  const deleteTodoMutation = useDeleteTodo();

  const activePage = Number(searchParams.get('page')) || FIRST_PAGE;

  const { pagesCount, visibleToDos } = useMemo(() => {
    const filteredTodos = filterTodos(todos, searchParams);
    const pagesCount = Math.ceil(filteredTodos.length / ITEMS_PER_PAGE);
    const visibleToDos = getVisibleTodos(filteredTodos, activePage);

    return { pagesCount, visibleToDos };
  }, [todos, searchParams]);

  useEffect(() => {
    if (visibleToDos.length === 0 && activePage > 1) {
      const newParamsString = getNewSearchParams(searchParams, {
        page: (activePage - 1).toString(),
      });

      setSearchParams(newParamsString);
    }
  }, [visibleToDos]);

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
    [deleteTodoMutation],
  );

  const handleChangeStatus = useCallback(
    () => {},
    //   (todoId: string) => {
    //   setTodos(currTodos =>
    //     currTodos.map(todo =>
    //       todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo,
    //     ),
    //   );
    // },
    [],
  );

  const handleChangeTitle = useCallback(
    // (todoId: string, newTodoTitle: string) => {
    //   setTodos(currTodos =>
    //     currTodos.map(todo =>
    //       todo.id === todoId ? { ...todo, title: newTodoTitle } : todo,
    //     ),
    //   );
    // },
    () => {},
    [],
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
            todos={visibleToDos}
            onChangeStatus={handleChangeStatus}
            onChangeTitle={handleChangeTitle}
          />
        </DndContext>
      </main>

      <Footer pagesCount={pagesCount} onCreateToDo={handleAddTodo} />
    </div>
  );
}

export default App;
