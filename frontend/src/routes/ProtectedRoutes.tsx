import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  let navigate = useNavigate();

  if (!Cookies.get('jwt')) {
    navigate('/login');
    return null;
  }

  return children;
};

export default ProtectedRoute;
