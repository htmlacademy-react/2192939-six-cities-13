import { Navigate } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../settings';

type TPrivateRouteProps = {
  authStatus?: AuthStatus;
  children: JSX.Element;
};

export default function PrivateRoute({
  authStatus = AuthStatus.Auth,
  children,
}: TPrivateRouteProps): JSX.Element {
  return authStatus === AuthStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoute.Login} />
  );
}
