import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { InView } from 'react-intersection-observer';
import {
  Box,
  CircularProgress,
  List,
} from '@mui/material';

import { fetchNextPageOfAnimeList } from '@js-camp/react/store/animeList/dispatchers';
import {
  selectAnimeList,
  selectAnimeListNextPage,
  selectAreAnimeListLoading,
} from '@js-camp/react/store/animeList/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';

import { AnimeCard } from '../AnimeCard';

import styles from './AnimeList.module.css';
import { AnimeListControls } from './components/AnimeListControls';

const AnimeListComponent: FC = () => {

  const appDispatch = useAppDispatch();

  const animeList = useAppSelector(selectAnimeList);
  const isAnimeListLoading = useAppSelector(selectAreAnimeListLoading);
  const nextAnimeListPage = useAppSelector(selectAnimeListNextPage);

  const [shouldUploadMoreAnime, setShouldUploadMoreAnime] = useState(false);

  const loadAnime = useCallback(() => {
    if (nextAnimeListPage) {
      appDispatch(fetchNextPageOfAnimeList(nextAnimeListPage));
    }
  }, [nextAnimeListPage]);

  useEffect(() => {
    if (shouldUploadMoreAnime) {
      loadAnime();
    }
  }, [shouldUploadMoreAnime]);

  const animeCardList = useMemo(() => animeList.map((anime, index) => {
    const animeCard = (<AnimeCard key={anime.id} anime={anime} />);
    if (index === animeList.length - 1) {
      return <InView key={anime.id} threshold={0.5} root={null} rootMargin='0px' onChange={setShouldUploadMoreAnime}>
        {({ ref }) => (
          <div ref={ref}>{animeCard}</div>
        )}
      </InView>;
    }
    return animeCard;
  }), [animeList]);

  return (
    <Box className={styles.relative}>
      <List>
        { animeCardList }
      </List>
      <AnimeListControls />
      {isAnimeListLoading && <CircularProgress />}
    </Box>
  );
};

export const AnimeList = memo(AnimeListComponent);
