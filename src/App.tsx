import './index.scss';
import { Link, Outlet } from 'react-router-dom';
import useIsAuthorized from './state/hooks/useIsAuthorized';
import { logout } from './api/auth';

function App() {
  const isAuthorized = useIsAuthorized();

  return (
    <div className="app">
      {!isAuthorized ? (
        <div
          style={{
            width: '80%',
            display: 'flex',
            gap: '10px',
            justifyContent: 'flex-end',
            marginTop: '20px',
            marginInline: 'auto',
          }}
        >
          <Link to="/signup">SignUp</Link>
          <Link to="/login">LogIn</Link>
        </div>
      ) : (
        <button onClick={logout}>LogOut</button>
      )}
      <Outlet />
    </div>
  );
}

export default App;
