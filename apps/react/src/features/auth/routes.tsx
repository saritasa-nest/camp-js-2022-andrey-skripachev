import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import { AuthorizedGuard } from '../../routes/guards/authorized-guard';

const AuthPage = lazy(() => import('./pages/AuthPage').then(module => ({ default: module.AuthPage })));

const RegisterForm = lazy(() =>
  import('./components/RegisterForm/RegisterForm').then(module => ({ default: module.RegisterForm })));

const LoginForm = lazy(() =>
  import('./components/LoginForm/LoginForm').then(module => ({ default: module.LoginForm })));

export const authRoutes: RouteObject[] = [
  {
    element: <AuthorizedGuard />,
    children: [
      {
        path: 'auth',
        element: <AuthPage />,
        children: [
          {
            path: 'register',
            element: <RegisterForm />,
          },
          {
            path: 'login',
            element: <LoginForm />,
          },
          {
            path: '',
            element: <Navigate to="register" />,
          },
        ],
      },
      {
        path: '*',
        element: <Navigate to="auth" />,
      },
    ],
  },

];
