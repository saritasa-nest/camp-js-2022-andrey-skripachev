import { fetchNextPageOfAnimeList } from '@js-camp/react/store/animeList/dispatchers';
import {
  selectAnimeList,
  selectAnimeListNextPage,
  selectAreAnimeListLoading,
} from '@js-camp/react/store/animeList/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { CircularProgress, List } from '@mui/material';
import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { InView } from 'react-intersection-observer';

import { AnimeCard } from '../AnimeCard';

const AnimeListComponent: FC = () => {

  const appDispatch = useAppDispatch();

  const [inView, setInView] = useState(false);

  const animeList = useAppSelector(selectAnimeList);
  const isAnimeListLoading = useAppSelector(selectAreAnimeListLoading);
  const nextAnimeListPage = useAppSelector(selectAnimeListNextPage);

  const loadAnime = useCallback(() => {
    if (nextAnimeListPage) {
      appDispatch(fetchNextPageOfAnimeList(nextAnimeListPage));
    }
  }, [nextAnimeListPage]);

  useEffect(() => {
    if (inView) {
      loadAnime();
    }
  }, [inView]);

  const mappedAnimeList = useMemo(() => animeList.map((anime, index) => {

    const animeCard = (<AnimeCard key={anime.id} anime={anime} />);

    if (index === animeList.length - 1) {
      return <InView key={anime.id} threshold={0.5} root={null} rootMargin='0px' onChange={setInView}>
        {({ ref }) => (
          <div ref={ref}>{animeCard}</div>
        )}
      </InView>;
    }

    return animeCard;
  }), [animeList]);

  return (
    <>
      <List>
        { mappedAnimeList }
      </List>
      {isAnimeListLoading ? <CircularProgress /> : null}
    </>
  );
};

export const AnimeList = memo(AnimeListComponent);
