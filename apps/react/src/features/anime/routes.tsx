import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import { UnauthorizedGuard } from '../../routes/guards/unauthorized-guard';

import { AnimeDetail } from './components/AnimeDetails';
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
            element: <AnimeDetail />,
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
