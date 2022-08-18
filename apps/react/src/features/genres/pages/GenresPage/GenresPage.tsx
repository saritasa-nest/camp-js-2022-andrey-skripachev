import { memo, FC } from 'react';

import { GenreCard } from '../../components/GenreCard';

interface Genre {

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
      <h1>Genres</h1>
      {genres.map(genre => <GenreCard key={genre.id} genre={genre} />)}
    </>
  );
};

export const GenresPage = memo(GenresPageComponent);
