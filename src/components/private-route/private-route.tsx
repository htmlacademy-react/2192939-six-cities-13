import { Navigate } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../settings';
import { useAppSelector } from '../../hooks';
import { getAuthStatus } from '../../store/user-process/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
};

export default function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);

  return authStatus === AuthStatus.Auth
    ? (children)
    : (<Navigate to={AppRoute.Login} />);
}
