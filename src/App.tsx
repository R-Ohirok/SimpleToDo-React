import './index.scss';
import CreateTodoModal from './components/molecules/CreateTodoModal/CreateTodoModal';
import Footer from './components/organisms/Footer/Footer';
import Header from './components/organisms/Header/Header';
import ToDoList from './components/organisms/ToDoList/ToDoList';
import { useCallback, useMemo, useState } from 'react';
import type { ToDoType } from './types/ToDoType';
import { filterTodos } from './utils/filterToDos';
import { FIRST_PAGE, PER_PAGE } from './constants/constants';
import { getVisibleTodos } from './utils/getVisibleToDos';

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [todos, setTodos] = useState<ToDoType[]>([]);
  const [filterBy, setFilterBy] = useState('All');
  const [searchValue, setSearchValue] = useState('');
  const [editingTodoId, setEditingTodoId] = useState<string>('');
  const [activePage, setActivePage] = useState(FIRST_PAGE);

  const filteredTodos = useMemo(
    () => filterTodos(todos, searchValue, filterBy),
    [todos, searchValue, filterBy],
  );
  const pagesCount = useMemo(
    () => Math.ceil(filteredTodos.length / PER_PAGE),
    [filteredTodos.length],
  );
  const visibleToDos = useMemo(
    () => getVisibleTodos(filteredTodos, activePage),
    [filteredTodos, activePage],
  );

  const handleFilterStatusChange = useCallback((newStatus: string) => {
    setFilterBy(newStatus);
    setActivePage(FIRST_PAGE);
  }, []);

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

  const changeStatus = useCallback((todoId: string) => {
    setTodos(currTodos =>
      currTodos.map(todo =>
        todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo,
      ),
    );
    setActivePage(FIRST_PAGE);
  }, []);

  const changeTitle = useCallback((todoId: string, newTodoTitle: string) => {
    setTodos(currTodos =>
      currTodos.map(todo =>
        todo.id === todoId ? { ...todo, title: newTodoTitle } : todo,
      ),
    );
    setActivePage(FIRST_PAGE);
  }, []);

  return (
    <div className="app">
      <Header
        activeFilterStatus={filterBy}
        onFilterStatusChange={handleFilterStatusChange}
        onFind={handleSearchChange}
      />

      <main>
        <ToDoList
          todos={visibleToDos}
          onDelete={deleteToDo}
          onChangeStatus={changeStatus}
          editingTodoId={editingTodoId}
          setEditingTodoId={setEditingTodoId}
          changeTitle={changeTitle}
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
