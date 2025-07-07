import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import App from './App';
import TodosPage from './components/TodosPage/TodosPage';
import RegisterPage from './components/SignUpPage/SignUpPage';
import ProtectedRoute from './components/ProtectedRoute';
import LogInPage from './components/LogInPage/LogInPage';


const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route element={<ProtectedRoute />}>
          <Route index element={<TodosPage />} />
        </Route>

        <Route path="signup" element={<RegisterPage />}/>
        <Route path="login" element={<LogInPage />}/>
      </Route>
    </Routes>
  </Router>
);

export default Root;