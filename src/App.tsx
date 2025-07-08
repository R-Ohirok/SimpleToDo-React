import './index.scss';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import useIsAuthorized from './state/hooks/useIsAuthorized';
import { logout } from './api/auth';

function App() {
  const isAuthorized = useIsAuthorized();
    const navigate = useNavigate();


  const onLogOut = async () => {
    await logout();
    navigate('/login', { replace: true });
  }

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
        <button onClick={onLogOut}>LogOut</button>
      )}
      <Outlet />
    </div>
  );
}

export default App;
