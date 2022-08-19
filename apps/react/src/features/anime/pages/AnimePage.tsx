import { Grid } from '@mui/material';
import { FC, memo } from 'react';

import { AppHeader } from '../../../app/components/AppHeader';

const AnimePageComponent: FC = () => (
  <>
    <AppHeader />
    <Grid container>
      <Grid item xs={4}><h2>Anime page working!</h2></Grid>
      <Grid item xs={8}></Grid>
    </Grid>
  </>
);

export const AnimePage = memo(AnimePageComponent);
