import './App.scss';
import { Header } from './components/organisms/Header';
import { Footer } from './components/organisms/Footer';
import { ToDoList } from './components/organisms/ToDoList';

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
