import { FC } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';

import { authRoutes } from '../features/auth/routes';
import { genresRoutes } from '../features/genres/routes';

const routes: RouteObject[] = [...authRoutes, ...genresRoutes];

/** Root router component. */
export const RootRouter: FC = () => useRoutes(routes);
