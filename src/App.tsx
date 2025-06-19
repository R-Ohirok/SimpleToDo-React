import './App.scss';
import CreateTodoModal from './components/molecules/CreateTodoModal/CreateTodoModal';
import Footer from './components/organisms/Footer/Footer';
import Header from './components/organisms/Header/Header';
import ToDoList from './components/organisms/ToDoList/ToDoList';
import { useState } from 'react';
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

  return (
    <div className="app">
      <Header />
      <main>
        <ToDoList todos={todos} />
      </main>
      <Footer onOpenCreatingModal={changeModalVisibility} />

      {isModalVisible && <CreateTodoModal onClose={changeModalVisibility} />}
    </div>
  );
}

export default App;
