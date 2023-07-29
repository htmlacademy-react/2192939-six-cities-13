import { Navigate } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../consts/settings';

type PrivateRouteProps = {
  authStatus?: AuthStatus;
  children: JSX.Element;
};

export default function PrivateRoute({
  authStatus,
  children,
}: PrivateRouteProps): JSX.Element {
  return authStatus === AuthStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoute.Login} />
  );
}
