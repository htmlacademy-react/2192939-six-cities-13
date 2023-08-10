import { Navigate } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../settings';

type PrivateRouteProps = {
  children: JSX.Element;
  authStatus: AuthStatus;
};

export default function PrivateRoute({ children, authStatus }: PrivateRouteProps): JSX.Element {
  return authStatus === AuthStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoute.Login} />
  );
}
