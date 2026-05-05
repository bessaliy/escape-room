import {ReactElement} from 'react';
import {useSelector} from 'react-redux';
import {getAuthStatus} from '../../store/selectors.ts';
import {AppRoute, AuthStatus} from '../../const.ts';
import {Navigate} from 'react-router-dom';

type PrivateRouteProps = {
  children: ReactElement;
};

function PrivateRoute({children}: PrivateRouteProps): ReactElement {
  const authStatus = useSelector(getAuthStatus);

  if (authStatus === AuthStatus.Unknown) {
    return <p>Загрузка...</p>;
  }

  if (authStatus === AuthStatus.NoAuth) {
    return <Navigate to={AppRoute.Login} replace />;
  }

  return children;
}

export default PrivateRoute;
