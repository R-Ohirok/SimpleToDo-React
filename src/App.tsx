import './index.scss';
import Footer from './components/organisms/Footer/Footer';
import Header from './components/organisms/Header/Header';
import ToDoList from './components/organisms/ToDoList/ToDoList';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { filterTodos } from './utils/filterToDos';
import { FIRST_PAGE, ITEMS_PER_PAGE } from './constants/constants';
import { getVisibleTodos } from './utils/getVisibleToDos';
import type { FilterStatusType, ToDoType } from './types';

function App() {
  const [todos, setTodos] = useState<ToDoType[]>([]);
  const [filterBy, setFilterBy] = useState<FilterStatusType>('All');
  const [searchValue, setSearchValue] = useState('');
  const [activePage, setActivePage] = useState(FIRST_PAGE);

  const { pagesCount, visibleToDos } = useMemo(() => {
    const filteredTodos = filterTodos(todos, searchValue, filterBy);
    const pagesCount = Math.ceil(filteredTodos.length / ITEMS_PER_PAGE);
    const visibleToDos = getVisibleTodos(filteredTodos, activePage);

    return { pagesCount, visibleToDos };
  }, [todos, searchValue, filterBy, activePage]);

  useEffect(() => {
    if (visibleToDos.length === 0 && activePage > 1) {
      setActivePage(prev => --prev);
    }
  }, [visibleToDos, activePage]);

  const handleFilterStatusChange = useCallback(
    (newStatus: FilterStatusType) => {
      setFilterBy(newStatus);
      setActivePage(FIRST_PAGE);
    },
    [],
  );

  const handleSearchChange = useCallback((title: string) => {
    setSearchValue(title);
    setActivePage(FIRST_PAGE);
  }, []);

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
      <Header
        activeFilterStatus={filterBy}
        onFilterStatusChange={handleFilterStatusChange}
        onSearchSubmit={handleSearchChange}
      />

      <main>
        <ToDoList
          todos={visibleToDos}
          onDelete={handleDeleteToDo}
          onChangeStatus={handleChangeStatus}
          onChangeTitle={handleChangeTitle}
        />
      </main>

      <Footer
        pagesCount={pagesCount}
        activePage={activePage}
        onChangePage={setActivePage}
        onCreateToDo={handleAddTodo}
      />
    </div>
  );
}

export default App;
