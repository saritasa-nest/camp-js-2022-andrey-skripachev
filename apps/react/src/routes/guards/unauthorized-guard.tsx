import { fetchAnimeList } from '@js-camp/react/store/animeList/dispatchers';
import { selectUser } from '@js-camp/react/store/user/selectors';
import { FC, useEffect } from 'react';
import { Navigate, Outlet, To, useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store';

export const UnauthorizedGuard: FC = () => {

  const appDispatch = useAppDispatch();

  useEffect(() => {
    appDispatch(fetchAnimeList());
  }, [appDispatch]);

  const user = useAppSelector(selectUser);
  const location = useLocation();

  const redirect: To = {
    pathname: '/auth/login',
    search: new URLSearchParams({
      next: location.pathname,
    }).toString(),
  };

  if (user === null) {
    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
};
