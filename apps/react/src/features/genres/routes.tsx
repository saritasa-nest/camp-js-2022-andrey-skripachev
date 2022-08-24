import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import { AuthorizedGuard } from '../../routes/guards/authorized-guard';

const GenresPage = lazy(() => import('./pages/GenresPage').then(module => ({ default: module.GenresPage })));

export const genresRoutes: RouteObject[] = [
  {
    element: <AuthorizedGuard />,
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
