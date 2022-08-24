import { clearAnimeList, fetchAnimeList } from '@js-camp/react/store/animeList/dispatchers';
import { useAppDispatch } from '@js-camp/react/store/store';
import { debounce, Grid } from '@mui/material';
import { FC, memo, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { QueryParamsMapper } from '@js-camp/core/mappers/query-params.mapper';
import { Outlet, useSearchParams } from 'react-router-dom';

import { AppContent } from '../../../app/components/AppContent';
import { AppHeader } from '../../../app/components/AppHeader';

import { AnimeList } from '../components/AnimeList';

import 'react-perfect-scrollbar/dist/css/styles.css';
import './AnimePage.css';

const AnimePageComponent: FC = () => {
  const appDispatch = useAppDispatch();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    appDispatch(clearAnimeList());
    appDispatch(fetchAnimeList(QueryParamsMapper.fromDto(searchParams)));
  }, [searchParams]);

  return (
    <>
      <AppHeader />
      <AppContent>
        <Grid container className='full-height'>
          <Grid item xs={4} className='full-height anime-control'>
            <PerfectScrollbar>
              <AnimeList />
            </PerfectScrollbar>
          </Grid>
          <Grid item xs={8} className='full-height anime-control'><Outlet /></Grid>
        </Grid>
      </AppContent>
    </>
  );
};

export const AnimePage = memo(AnimePageComponent);
