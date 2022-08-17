import { FC } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';

import { authRoutes } from '../features/auth/routes';

const routes: RouteObject[] = [...authRoutes];

/** Root router component. */
export const RootRouter: FC = () => useRoutes(routes);
