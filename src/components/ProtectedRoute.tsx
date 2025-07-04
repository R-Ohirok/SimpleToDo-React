import { Navigate, Outlet } from 'react-router-dom';
import useIsAutorized from '../state/hooks/useIsAutorized';

const ProtectedRoute = () => {
  const [isAutorized] = useIsAutorized();

  return isAutorized ? <Outlet /> : <Navigate to="/signup" />;
};

export default ProtectedRoute;
