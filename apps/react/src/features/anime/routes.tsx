import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import { AuthorizedGuard } from '../../routes/guards/authorized-guard';

const AnimePage = lazy(() =>
  import('./pages/AnimePage').then(module => ({ default: module.AnimePage })));

export const animeRoutes: RouteObject[] = [
  {
    element: <AuthorizedGuard />,
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
