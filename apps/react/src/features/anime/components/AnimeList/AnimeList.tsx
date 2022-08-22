import { fetchNextPageOfAnimeList } from '@js-camp/react/store/animeList/dispatchers';
import {
  selectAnimeList,
  selectAnimeListNextPage,
  selectAreAnimeListLoading,
} from '@js-camp/react/store/animeList/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { CircularProgress, debounce, List, TextField } from '@mui/material';
import { ChangeEvent, FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { InView } from 'react-intersection-observer';
import { useSearchParams } from 'react-router-dom';

import { ToggleMenu } from '../../../../app/components/ToggleMenu';

import { AnimeCard } from '../AnimeCard';

const AnimeListComponent: FC = () => {

  const appDispatch = useAppDispatch();

  const animeList = useAppSelector(selectAnimeList);
  const isAnimeListLoading = useAppSelector(selectAreAnimeListLoading);
  const nextAnimeListPage = useAppSelector(selectAnimeListNextPage);

  const [inView, setInView] = useState(false);
  const [queryParams, setQueryParams] = useSearchParams();

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

  const handleSearchChanges = debounce((event: ChangeEvent) => {
    const { target } = event;

    if (target instanceof HTMLInputElement) {
      queryParams.set('search', target.value);
      setQueryParams(queryParams);
    }
  });

  return (
    <>
      <ToggleMenu>
        <TextField onChange={handleSearchChanges} label='Searching title' variant='standard' />
      </ToggleMenu>
      <List sx={{
        position: 'relative',
      }}>
        { mappedAnimeList }
      </List>
      {isAnimeListLoading ? <CircularProgress /> : null}
    </>
  );
};

export const AnimeList = memo(AnimeListComponent);
