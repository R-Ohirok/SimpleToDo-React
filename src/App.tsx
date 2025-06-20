import './index.scss';
import CreateTodoModal from './components/molecules/CreateTodoModal/CreateTodoModal';
import Footer from './components/organisms/Footer/Footer';
import Header from './components/organisms/Header/Header';
import ToDoList from './components/organisms/ToDoList/ToDoList';
import { useCallback, useMemo, useState } from 'react';
import { filterTodos } from './utils/filterToDos';
import { FIRST_PAGE, ITEMS_PER_PAGE } from './constants/constants';
import { getVisibleTodos } from './utils/getVisibleToDos';
import type { FilterStatusType, ToDoType } from './types';

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [todos, setTodos] = useState<ToDoType[]>([]);
  const [filterBy, setFilterBy] = useState<FilterStatusType>('All');
  const [searchValue, setSearchValue] = useState('');
  const [activePage, setActivePage] = useState(FIRST_PAGE);

  const filteredTodos = useMemo(
    () => filterTodos(todos, searchValue, filterBy),
    [todos, searchValue, filterBy],
  );
  const pagesCount = Math.ceil(filteredTodos.length / ITEMS_PER_PAGE);
  const visibleToDos = useMemo(
    () => getVisibleTodos(filteredTodos, activePage),
    [filteredTodos, activePage],
  );

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

  const changeModalVisibility = useCallback(() => {
    setIsModalVisible(prev => !prev);
  }, []);

  const addTodo = useCallback((newTodo: ToDoType) => {
    setTodos(currTodos => [...currTodos, newTodo]);
  }, []);

  const deleteToDo = useCallback((todoId: string) => {
    setTodos(currTodos => currTodos.filter(todo => todo.id !== todoId));
    setActivePage(FIRST_PAGE);
  }, []);

  const handleChangeStatus = useCallback((todoId: string) => {
    setTodos(currTodos =>
      currTodos.map(todo =>
        todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo,
      ),
    );
    setActivePage(FIRST_PAGE);
  }, []);

  const handleChangeTitle = useCallback(
    (todoId: string, newTodoTitle: string) => {
      setTodos(currTodos =>
        currTodos.map(todo =>
          todo.id === todoId ? { ...todo, title: newTodoTitle } : todo,
        ),
      );
      setActivePage(FIRST_PAGE);
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
          onDelete={deleteToDo}
          onChangeStatus={handleChangeStatus}
          changeTitle={handleChangeTitle}
        />
      </main>
      <Footer
        onOpenCreatingModal={changeModalVisibility}
        pagesCount={pagesCount}
        activePage={activePage}
        onChangePage={setActivePage}
      />

      {isModalVisible && (
        <CreateTodoModal onClose={changeModalVisibility} сreateToDo={addTodo} />
      )}
    </div>
  );
}

export default App;
