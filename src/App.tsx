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
import { addTodo, deleteTodo } from './api/todos';

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { todos, setTodos } = useTodos();

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

  const handleAddTodo = useCallback( async (newTodo: ToDoType) => {
    try{
      await addTodo(newTodo);

      setTodos(currTodos => [...currTodos, newTodo]);
    } catch {}

  }, []);

  const handleDeleteToDo = useCallback( async (todoId: string) => {
    try{
      await deleteTodo(todoId);

      setTodos(currTodos => {
        return currTodos.filter(todo => todo.id !== todoId);
      });
    } catch {}
  }, []);

  const handleChangeStatus = useCallback((todoId: string) => {
    setTodos(currTodos =>
      currTodos.map(todo =>
        todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo,
      ),
    );
  }, []);

  const handleChangeTitle = useCallback(
    (todoId: string, newTodoTitle: string) => {
      setTodos(currTodos =>
        currTodos.map(todo =>
          todo.id === todoId ? { ...todo, title: newTodoTitle } : todo,
        ),
      );
    },
    [],
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      handleDeleteToDo(active.id as string);
    }
  };

  return (
    <div className="app">
      <Header />

      <main>
        <DndContext onDragEnd={handleDragEnd}>
          <ToDoList
            todos={visibleToDos}
            onDelete={handleDeleteToDo}
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
