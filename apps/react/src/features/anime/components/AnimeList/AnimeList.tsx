import { FC, memo, useMemo } from 'react';
import { CircularProgress, List } from '@mui/material';
import { selectAnimeList, selectAreAnimeListLoading } from '@js-camp/react/store/animeList/selectors';
import { useAppSelector } from '@js-camp/react/store/store';

import { AnimeCard } from '../AnimeCard';

const AnimeListComponent: FC = () => {

  const animeList = useAppSelector(selectAnimeList);
  const isAnimeListLoading = useAppSelector(selectAreAnimeListLoading);

  const mappedAnimeList = useMemo(() => animeList.map(anime => (
    <AnimeCard key={anime.id} anime={anime} />
  )), [animeList]);

  return (
    <>
      <List>
        { mappedAnimeList }
      </List>
      {isAnimeListLoading && <CircularProgress />}
    </>
  );
};

export const AnimeList = memo(AnimeListComponent);
