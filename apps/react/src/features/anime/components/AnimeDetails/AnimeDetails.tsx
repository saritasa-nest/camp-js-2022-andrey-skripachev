import { AnimeDetails } from '@js-camp/core/models/anime-details';
import { fetchAnimeById, setAnimeId } from '@js-camp/react/store/anime/dispatchers';
import { selectAnimeFromStore, selectAnimeId, selectIsAnimeLoading } from '@js-camp/react/store/anime/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { FC, memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const AnimeDetailsComponent: FC = () => {

  const { id: animeId = '0' } = useParams();

  const appDispatch = useAppDispatch();

  const [currentAnime, setCurrentAnime] = useState<AnimeDetails | null>(null);

  const animeFromStore = useAppSelector(selectAnimeFromStore);
  const currentAnimeId = useAppSelector(selectAnimeId);
  const isAnimeLoading = useAppSelector(selectIsAnimeLoading);

  useEffect(() => {
    appDispatch(setAnimeId(animeId));
  }, [animeId]);

  useEffect(() => {
    if (animeFromStore === undefined) {
      appDispatch(fetchAnimeById(currentAnimeId ?? '0'));
    } else {
      setCurrentAnime(animeFromStore);
    }

  }, [currentAnimeId, animeFromStore]);

  if (isAnimeLoading || currentAnime === null) {
    return <CircularProgress />;
  }

  return (
    <Grid container>
      <Grid item xs={4}>
        <img src={currentAnime.image} />
      </Grid>
      <Grid item xs={8}>
        <Typography component='div' variant='body2'>{currentAnime.synopsis}</Typography>
      </Grid>
    </Grid>
  );
};

export const AnimeDetail = memo(AnimeDetailsComponent);
