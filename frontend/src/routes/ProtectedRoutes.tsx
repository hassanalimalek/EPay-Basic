import React, { ReactNode } from 'react';
import { Route, useNavigate, RouteProps } from 'react-router-dom';
import Cookies from 'js-cookie';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  ...rest
}) => {
  let navigate = useNavigate();

  if (!Cookies.get('jwt')) {
    navigate('/login');
    return null;
  }

  return <Route {...rest} element={children} />;
};

export default ProtectedRoute;
