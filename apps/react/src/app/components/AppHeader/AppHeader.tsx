import { AppBar, Typography } from '@mui/material';
import { FC, memo } from 'react';

const AppHeaderComponent: FC = () => (
  <AppBar
    position='static'
    color='primary'
  >
    <Typography component='h1' variant='h1'>Hello, user</Typography>
  </AppBar>
);

export const AppHeader = memo(AppHeaderComponent);
