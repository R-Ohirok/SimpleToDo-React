import { Navigate, Outlet } from 'react-router-dom';
import useIsAuthorized from '../state/hooks/useIsAuthorized';

const ProtectedRoute = () => {
  const isAuthorized = useIsAuthorized();

  return isAuthorized ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
