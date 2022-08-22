import { fetchAnimeList } from '@js-camp/react/store/animeList/dispatchers';
import { useAppDispatch } from '@js-camp/react/store/store';
import { Grid } from '@mui/material';
import { FC, memo, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { QueryParamsMapper } from '@js-camp/core/mappers/query-params.mapper';
import { useSearchParams } from 'react-router-dom';

import { AppContent } from '../../../app/components/AppContent/AppContent';
import { AppHeader } from '../../../app/components/AppHeader';

import { AnimeDetails } from '../components/AnimeDetails';
import { AnimeList } from '../components/AnimeList';

import 'react-perfect-scrollbar/dist/css/styles.css';
import './AnimePage.css';

const AnimePageComponent: FC = () => {
  const appDispatch = useAppDispatch();

  const [searchParams] = useSearchParams();

  useEffect(() => {
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
          <Grid item xs={8} className='full-height anime-control'><AnimeDetails /></Grid>
        </Grid>
      </AppContent>
    </>
  );
};

export const AnimePage = memo(AnimePageComponent);
