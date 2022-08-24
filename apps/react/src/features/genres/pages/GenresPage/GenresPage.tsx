import { memo, FC } from 'react';
import { Typography } from '@mui/material';

import { AppHeader } from '../../../../app/components/AppHeader';

/** Genres page component. */
const GenresPageComponent: FC = () => (
  <>
    <AppHeader />
    <Typography component='h2' variant='h3'>Genres</Typography>
  </>
);

export const GenresPage = memo(GenresPageComponent);
