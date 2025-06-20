import './index.scss';
import CreateTodoModal from './components/molecules/CreateTodoModal/CreateTodoModal';
import Footer from './components/organisms/Footer/Footer';
import Header from './components/organisms/Header/Header';
import ToDoList from './components/organisms/ToDoList/ToDoList';
import { useCallback, useState } from 'react';
import type { ToDoType } from './types/ToDoType';
import { filterTodosByStatus } from './utils/filterTodosByStatus';

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [todos, setTodos] = useState<ToDoType[]>([]);
  const [filterBy, setFilterBy] = useState('All');

  const filteredTodos = filterTodosByStatus(todos, filterBy);

  const changeModalVisibility = useCallback(() => {
    setIsModalVisible(prev => !prev);
  }, []);

  const addTodo = useCallback((newTodo: ToDoType) => {
    setTodos(currTodos => [...currTodos, newTodo]);
  }, []);

  const deleteToDo = useCallback((todoId: string) => {
    setTodos(currTodos => currTodos.filter(todo => todo.id !== todoId));
  }, []);

  const changeStatus = useCallback((todoId: string) => {
    setTodos(currTodos =>
      currTodos.map(todo =>
        todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo,
      ),
    );
  }, []);

  return (
    <div className="app">
      <Header activeFilterStatus={filterBy} onFilterStatusChange={setFilterBy} />

      <main>
        <ToDoList
          todos={filteredTodos}
          onDelete={deleteToDo}
          onStatusChange={changeStatus}
        />
      </main>
      <Footer onOpenCreatingModal={changeModalVisibility} />

      {isModalVisible && (
        <CreateTodoModal onClose={changeModalVisibility} сreateToDo={addTodo} />
      )}
    </div>
  );
}

export default App;
