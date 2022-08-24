import { AnimeDetails } from '@js-camp/core/models/anime-details';
import { fetchAnimeById, setAnimeId } from '@js-camp/react/store/anime/dispatchers';
import { selectAnimeFromStore, selectAnimeId, selectIsAnimeLoading } from '@js-camp/react/store/anime/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { CircularProgress, Grid, Stack, Typography, Box, Chip } from '@mui/material';
import { FC, memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import { addGenres } from '@js-camp/react/store/genre/dispatchers';
import { selectGenres } from '@js-camp/react/store/genre/selectors';
import { selectStudios } from '@js-camp/react/store/studio/selectors';
import { addStudios } from '@js-camp/react/store/studio/dispatchers';

import styles from './AnimeDetails.module.css';

const AnimeDetailsComponent: FC = () => {

  const { id: animeId = '0' } = useParams();

  const appDispatch = useAppDispatch();

  const [currentAnime, setCurrentAnime] = useState<AnimeDetails | null>(null);

  const animeFromStore = useAppSelector(selectAnimeFromStore);
  const currentAnimeId = useAppSelector(selectAnimeId);
  const isAnimeLoading = useAppSelector(selectIsAnimeLoading);

  const studios = useAppSelector(selectStudios);
  const genres = useAppSelector(selectGenres);

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

  appDispatch(addGenres(currentAnime.genresData));
  appDispatch(addStudios(currentAnime.studiosData));

  const genresList = genres
    .filter(({ id }) => currentAnime.genresIdList.includes(id))
    .map(({ name, id }) => (
      <Typography className={styles.animeInfo} key={id} component='span' variant='body2'>{name}</Typography>
    ));

  const studioList = studios
    .filter(({ id }) => currentAnime.studiosIdList.includes(id))
    .map(({ name, id }) => (
      <Chip key={id} label={name} variant='outlined' />
    ));

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <img className={styles.media} src={currentAnime.image} />
        {currentAnime.trailerYoutubeId && <YouTube
          iframeClassName={styles.media}
          videoId={currentAnime.trailerYoutubeId}
        />}
      </Grid>
      <Grid item xs={9}>
        <Stack spacing={2}>
          <Box>
            <Typography component='h2' variant='h4'>{currentAnime.titleEnglish ?? '-'}</Typography>
            <Typography component='h3' variant='h5'>{currentAnime.titleJapanese ?? '-'}</Typography>
          </Box>
          <Grid container>
            <Grid className='content-center' item xs={4}>
              <AccessTimeIcon />
              <Typography className={styles.animeInfo} component='div' variant='body2'>
                {
                  currentAnime.aired.start?.getFullYear() ?? '-'
                } / {
                  currentAnime.aired.end?.getFullYear() ?? '-'
                } ({
                  currentAnime.status
                })
              </Typography>
            </Grid>
            <Grid className='content-center' item xs={4}>
              <LocalMoviesIcon />
              <Box>{genresList}</Box>
            </Grid>
            <Grid className='content-center' item xs={4}>
              <LiveTvIcon />
              <Typography className={styles.animeInfo} component='div' variant='body2'>
                {currentAnime.type}
              </Typography>
            </Grid>
          </Grid>
          <Box>
            <Typography component='div' variant='h6'>Synopsis</Typography>
            <Typography component='div' variant='body2'>{currentAnime.synopsis}</Typography>
          </Box>
          <Box>
            <Typography component='div' variant='h6'>Studios</Typography>
            {studioList}
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
};

export const AnimeDetail = memo(AnimeDetailsComponent);
