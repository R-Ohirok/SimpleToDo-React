import './index.scss';
import Footer from './components/organisms/Footer/Footer';
import Header from './components/organisms/Header/Header';
import ToDoList from './components/organisms/ToDoList/ToDoList';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { filterTodos } from './utils/filterToDos';
import { FIRST_PAGE, ITEMS_PER_PAGE } from './constants/constants';
import { getVisibleTodos } from './utils/getVisibleToDos';
import type { ToDoType } from './types';
import { useSearchParams } from 'react-router-dom';
import { getNewSearchParams } from './utils/getNewSearchParams';

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [todos, setTodos] = useState<ToDoType[]>([]);

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

  const handleAddTodo = useCallback((newTodo: ToDoType) => {
    setTodos(currTodos => [...currTodos, newTodo]);
  }, []);

  const handleDeleteToDo = useCallback((todoId: string) => {
    setTodos(currTodos => {
      return currTodos.filter(todo => todo.id !== todoId);
    });
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

  return (
    <div className="app">
      <Header />

      <main>
        <ToDoList
          todos={visibleToDos}
          onDelete={handleDeleteToDo}
          onChangeStatus={handleChangeStatus}
          onChangeTitle={handleChangeTitle}
        />
      </main>

      <Footer pagesCount={pagesCount} onCreateToDo={handleAddTodo} />
    </div>
  );
}

export default App;
