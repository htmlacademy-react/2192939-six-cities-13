import { Navigate } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../settings';

interface PrivateRouteProps {
  authStatus?: AuthStatus;
  children: JSX.Element;
}

export default function PrivateRoute({
  authStatus = AuthStatus.NoAuth,
  children,
}: PrivateRouteProps): JSX.Element {
  return authStatus === AuthStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoute.Login} />
  );
}
