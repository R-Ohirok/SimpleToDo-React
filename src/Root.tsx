import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import App from './App';
import TodosPage from './components/TodosPage/TodosPage';
import RegisterPage from './components/RegisterPage/RegisterPage';


const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<TodosPage />} />

        <Route path="register" element={<RegisterPage />}/>
      </Route>
    </Routes>
  </Router>
);

export default Root;