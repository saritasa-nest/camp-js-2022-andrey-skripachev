import { Container } from '@mui/system';
import { FC, memo } from 'react';

const AnimeDetailsComponent: FC = () => (
  <Container maxWidth='sm' sx={{
    backgroundColor: '#eee',
  }}></Container>
);

export const AnimeDetails = memo(AnimeDetailsComponent);
