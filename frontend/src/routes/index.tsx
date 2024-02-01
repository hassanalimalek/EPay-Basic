// routes.js
import React from 'react';
import Login from '../components/login';
import ProtectedRoute from './ProtectedRoutes';
import Home from '../components/home';

export const routes = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/home',
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
];
