import { FC, memo } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';

const AuthPageComponent: FC = () => (
  <Container maxWidth="xs">
    <Outlet />
  </Container>
);

export const AuthPage = memo(AuthPageComponent);
