import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { authService } from '../../services/authService';

export default function ProtectedRoute() {
  const location = useLocation();

  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
}
