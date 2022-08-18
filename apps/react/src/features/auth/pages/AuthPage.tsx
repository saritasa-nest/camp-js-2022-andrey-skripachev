import { FC, memo } from 'react';
import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { AppHeader } from '../../../app/components/AppHeader';

const AuthPageComponent: FC = () => (
  <>
    <AppHeader />
    <Container maxWidth="xs">
      <Outlet />
    </Container>
  </>
);

export const AuthPage = memo(AuthPageComponent);
