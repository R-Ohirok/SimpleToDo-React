import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import App from './App';
import TodosPage from './components/TodosPage/TodosPage';
import ProtectedRoute from './components/ProtectedRoute';
import LogInPage from './components/LogInPage/LogInPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import WorkspacePage from './components/WorkspacesPage/WorkspacesPage';

const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route element={<ProtectedRoute />}>
          <Route index element={<TodosPage />} />
          <Route path="workspaces" element={<WorkspacePage />} />
        </Route>

        <Route path="signup" element={<SignUpPage />} />
        <Route path="login" element={<LogInPage />} />
      </Route>
    </Routes>
  </Router>
);

export default Root;
