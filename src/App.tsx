import './index.scss';
import { Header } from './components/organisms/Header';
import { Footer } from './components/organisms/Footer';
import { ToDoList } from './components/organisms/ToDoList';
import { useState } from 'react';
import { ModalWindow } from './components/molecules/ModalWindow';
import type { ToDoType } from './types/ToDoType';

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [todos, setTodos] = useState<ToDoType[]>([]);

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
      <Header />

      <main>
        <ToDoList todos={todos} deleteToDo={deleteToDo} changeStatus={changeStatus} />
      </main>

      <Footer openModal={changeModalVisibility} />

      {isModalVisible && (
        <ModalWindow closeModal={changeModalVisibility} addNewTodo={addTodo} />
      )}
    </div>
  );
}

export default App;
