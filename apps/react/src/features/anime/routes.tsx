import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import { UnauthorizedGuard } from '../../routes/guards/unauthorized-guard';

const AnimePage = lazy(() =>
  import('./pages/AnimePage').then(module => ({ default: module.AnimePage })));

export const animeRoutes: RouteObject[] = [
  {
    element: <UnauthorizedGuard />,
    children: [
      {
        path: 'anime',
        element: <AnimePage />,
      },
      {
        path: '*',
        element: <Navigate to='anime' />,
      },
    ],
  },
];
