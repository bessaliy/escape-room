import {ReactElement} from 'react';
import {useSelector} from 'react-redux';
import {getAuthStatus} from '../../store/selectors.ts';
import {AppRoute, AuthStatus} from '../../const.ts';
import {Navigate, useLocation} from 'react-router-dom';
import Spinner from '../ui/spinner/spinner.tsx';

type PrivateRouteProps = {
  children: ReactElement;
};

function PrivateRoute({children}: PrivateRouteProps): ReactElement {
  const authStatus = useSelector(getAuthStatus);
  const location = useLocation();

  if (authStatus === AuthStatus.Unknown) {
    return <Spinner />;
  }

  if (authStatus === AuthStatus.NoAuth) {
    return <Navigate to={AppRoute.Login} state={{from: location}} replace />;
  }

  return children;
}

export default PrivateRoute;
