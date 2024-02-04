// routes.js
import React from 'react';
import Login from '../pages/login';
import ProtectedRoute from './ProtectedRoutes';
import Home from '../pages/home';
import Navbar from '../components/navbar';

export const routes = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Navbar />
        <Home />
      </ProtectedRoute>
    ),
  },
];
