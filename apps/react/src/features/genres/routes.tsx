import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import { UnauthorizedGuard } from '../../routes/guards/unauthorized-guard';

const GenresPage = lazy(() => import('./pages/GenresPage').then(module => ({ default: module.GenresPage })));

export const genresRoutes: RouteObject[] = [
  {
    element: <UnauthorizedGuard />,
    children: [
      {
        path: 'genres',
        element: <GenresPage />,
      },
      {
        path: '*',
        element: <Navigate to="genres" />,
      },
    ],
  },

];
