import { fetchAnimeList } from '@js-camp/react/store/animeList/dispatchers';
import { useAppDispatch } from '@js-camp/react/store/store';
import { Grid } from '@mui/material';
import { FC, memo, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { AppContent } from '../../../app/components/AppContent/AppContent';
import { AppHeader } from '../../../app/components/AppHeader';

import { AnimeDetails } from '../components/AnimeDetails';
import { AnimeList } from '../components/AnimeList';

import 'react-perfect-scrollbar/dist/css/styles.css';
import './AnimePage.css';

const AnimePageComponent: FC = () => {
  const appDispatch = useAppDispatch();

  useEffect(() => {
    appDispatch(fetchAnimeList());
  }, []);

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
