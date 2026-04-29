import {ReactElement} from 'react';

type PrivateRouteProps = {
  children: ReactElement;
};

function PrivateRoute({children}: PrivateRouteProps): ReactElement {
  return children;
}

export default PrivateRoute;
