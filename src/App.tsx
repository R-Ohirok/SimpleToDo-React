import './index.scss';
import { Header } from './components/organisms/Header';
import { Footer } from './components/organisms/Footer';
import { ToDoList } from './components/organisms/ToDoList';
import { useState } from 'react';
import { ModalWindow } from './components/molecules/ModalWindow';
import type { ToDoType } from './types/ToDoType';
import { filterTodosByStatus } from './utils/filterTodosByStatus';

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [todos, setTodos] = useState<ToDoType[]>([]);
  const [filterBy, setFilterBy] = useState('All');
  const [query, setQuery] = useState('');

  const filteredTodos = filterTodosByStatus(todos, filterBy);

  const changeModalVisibility = () => {
    setIsModalVisible(prev => !prev);
  };

  const addTodo = (newTodo: ToDoType) => {
    setTodos(currTodos => [...currTodos, newTodo]);
  };

  const deleteToDo = (todoId: string) => {
    setTodos(currTodos => currTodos.filter(todo => todo.id !== todoId));
  };

  const changeStatus = (todoId: string) => {
    setTodos(currTodos =>
      currTodos.map(todo => (
        todo.id === todoId 
        ? { ...todo, isCompleted: !todo.isCompleted } 
        : todo
      )
      ),
    );
  };

  return (
    <div className="app">
      <Header activeStatus={filterBy} changeStatus={setFilterBy} />

      <main>
        <ToDoList todos={filteredTodos} deleteToDo={deleteToDo} changeStatus={changeStatus} />
      </main>

      <Footer openModal={changeModalVisibility} />

      {isModalVisible && (
        <ModalWindow closeModal={changeModalVisibility} addNewTodo={addTodo} />
      )}
    </div>
  );
}

export default App;
