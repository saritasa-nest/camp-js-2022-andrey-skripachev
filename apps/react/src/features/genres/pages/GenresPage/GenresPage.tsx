import { Typography } from '@mui/material';
import { memo, FC } from 'react';

import { AppHeader } from '../../../../app/components/AppHeader';

import { GenreCard } from '../../components/GenreCard';

// Temporary solution to make the genres page work
/** Genre. */
export interface Genre {

  /** Genre name. */
  readonly name: string;

  /** Genre id. */
  readonly id: number;
}

/** Genres page component. */
const GenresPageComponent: FC = () => {

  const genres: Genre[] = [
    {
      name: 'Action',
      id: 1,
    },
    {
      name: 'Adventure',
      id: 2,
    },
  ];

  return (
    <>
      <AppHeader />
      <Typography component='h2' variant='h3'>Genres</Typography>
      {genres.map(genre => <GenreCard key={genre.id} genre={genre} />)}
    </>
  );
};

export const GenresPage = memo(GenresPageComponent);
