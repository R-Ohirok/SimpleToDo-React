import './App.scss';
import { Header } from './components/organisms/Header';
import { Footer } from './components/organisms/Footer';
import { ToDoList } from './components/organisms/ToDoList';
import { useState } from 'react';
import { ModalWindow } from './components/molecules/ModalWindow';

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

      <Footer openModal={changeModalVisibility}/>

      <ModalWindow isVisible={isModalVisible} closeModal={changeModalVisibility} />
    </div>
  );
}

export default App;
