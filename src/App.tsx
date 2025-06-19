import './App.scss';
import CreateTodoModal from './components/molecules/CreateTodoModal/CreateTodoModal';
import Footer from './components/organisms/Footer/Footer';
import Header from './components/organisms/Header/Header';
import ToDoList from './components/organisms/ToDoList/ToDoList';
import { useState } from 'react';

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const changeModalVisibility = () => {
    setIsModalVisible(prev => !prev);
  };

  return (
    <div className="app">
      <Header />
      <main>
        <ToDoList />
      </main>
      <Footer onOpenCreatingModal={changeModalVisibility} />

      {isModalVisible && <CreateTodoModal onClose={changeModalVisibility} />}
    </div>
  );
}

export default App;
