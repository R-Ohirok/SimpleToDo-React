import './index.scss';
import CreateTodoModal from './components/molecules/CreateTodoModal/CreateTodoModal';
import Footer from './components/organisms/Footer/Footer';
import Header from './components/organisms/Header/Header';
import ToDoList from './components/organisms/ToDoList/ToDoList';
import { useCallback, useState } from 'react';
import type { ToDoType } from './types/ToDoType';

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [todos, setTodos] = useState<ToDoType[]>([]);

  const changeModalVisibility = useCallback(() => {
    setIsModalVisible(prev => !prev);
  }, []);

  const addTodo = useCallback((newTodo: ToDoType) => {
    setTodos(currTodos => [...currTodos, newTodo]);
  }, []);

  const deleteToDo = useCallback((todoId: string) => {
    setTodos(currTodos => currTodos.filter(todo => todo.id !== todoId));
  }, []);

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
        <ToDoList todos={todos} onDelete={deleteToDo} changeStatus={changeStatus} />
      </main>
      <Footer onOpenCreatingModal={changeModalVisibility} />

      {isModalVisible && (
        <CreateTodoModal onClose={changeModalVisibility} сreateToDo={addTodo} />
      )}
    </div>
  );
}

export default App;
