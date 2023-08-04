import { Navigate } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../settings';
import { useAppSelector } from '../../hooks';

type PrivateRouteProps = {
  children: JSX.Element;
};

export default function PrivateRoute({
  children,
}: PrivateRouteProps): JSX.Element {
  const authStatus = useAppSelector((state) => state.authStatus);
  return authStatus === AuthStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoute.Login} />
  );
}
