import './App.scss';
import Footer from './components/organisms/Footer/Footer';
import Header from './components/organisms/Header/Header';
import ToDoList from './components/organisms/ToDoList/ToDoList';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <ToDoList />
      </main>
      <Footer />
    </div>
  );
}

export default App;