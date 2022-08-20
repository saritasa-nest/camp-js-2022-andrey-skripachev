import { fetchAnimeList } from '@js-camp/react/store/animeList/dispatchers';
import { useAppDispatch } from '@js-camp/react/store/store';
import { Grid } from '@mui/material';
import { FC, memo, useEffect } from 'react';

import { AppHeader } from '../../../app/components/AppHeader';
import { AnimeList } from '../components/AnimeList';

const AnimePageComponent: FC = () => {
  const appDispatch = useAppDispatch();

  useEffect(() => {
    appDispatch(fetchAnimeList());
  }, [appDispatch]);

  return (
    <>
      <AppHeader />
      <Grid container>
        <Grid item xs={4}><AnimeList /></Grid>
        <Grid item xs={8}></Grid>
      </Grid>
    </>
  );
};

export const AnimePage = memo(AnimePageComponent);
