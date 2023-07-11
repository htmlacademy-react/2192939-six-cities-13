import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../settings';

interface PrivateRouteProps {
  authorizationStatus?: AuthorizationStatus;
  children: JSX.Element;
}

export default function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { authorizationStatus = AuthorizationStatus.NoAuth, children } = props;
  return authorizationStatus === AuthorizationStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoute.Login} />
  );
}
