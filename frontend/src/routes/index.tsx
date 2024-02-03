// routes.js
import React from 'react';
import Login from '../components/login';
import ProtectedRoute from './ProtectedRoutes';
import Home from '../components/home';
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
