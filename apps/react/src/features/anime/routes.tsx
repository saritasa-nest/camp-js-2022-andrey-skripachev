import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import { UnauthorizedGuard } from '../../routes/guards/unauthorized-guard';

import { AnimeDetails } from './components/AnimeDetails';
import { AnimeDetailsSkeleton } from './components/AnimeDetailsSkeleton';

const AnimePage = lazy(() =>
  import('./pages/AnimePage').then(module => ({ default: module.AnimePage })));

export const animeRoutes: RouteObject[] = [
  {
    element: <UnauthorizedGuard />,
    children: [
      {
        path: 'anime',
        element: <AnimePage />,
        children: [
          {
            path: ':id',
            element: <AnimeDetails />,
          },
          {
            path: '',
            element: <AnimeDetailsSkeleton />,
          },
        ],
      },
      {
        path: '*',
        element: <Navigate to='anime' />,
      },
    ],
  },
];
