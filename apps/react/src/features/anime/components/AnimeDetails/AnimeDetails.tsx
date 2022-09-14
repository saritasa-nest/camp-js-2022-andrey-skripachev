import YouTube from 'react-youtube';
import { useParams } from 'react-router-dom';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import { CircularProgress, Grid, Stack, Typography, Box, Chip, Backdrop } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import LiveTvIcon from '@mui/icons-material/LiveTv';

import { selectGenres } from '@js-camp/react/store/genre/selectors';
import { selectStudios } from '@js-camp/react/store/studio/selectors';
import { fetchAnimeById } from '@js-camp/react/store/anime/dispatchers';
import { selectAnimeFromStore, selectIsAnimeLoading } from '@js-camp/react/store/anime/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';

import styles from './AnimeDetails.module.css';

const DEFAULT_ANIME_ID = '0';

const AnimeDetailsComponent: FC = () => {
  const { id: animeId = DEFAULT_ANIME_ID } = useParams();
  const [isImageOpen, setIsImageOpen] = useState(false);
  const currentAnime = useAppSelector(state => selectAnimeFromStore(state, animeId));
  const isAnimeLoading = useAppSelector(selectIsAnimeLoading);
  const studios = useAppSelector(selectStudios);
  const genres = useAppSelector(selectGenres);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentAnime === undefined) {
      dispatch(fetchAnimeById(animeId));
    }
  }, [currentAnime]);

  const handleImageToggle = useCallback(() => {
    setIsImageOpen(!isImageOpen);
  }, [isImageOpen]);

  if (isAnimeLoading) {
    return <CircularProgress />;
  }

  if (currentAnime === undefined) {
    return <>So sorry but your anime is not found</>;
  }

  const genresList = genres
    .filter(({ id }) => currentAnime.genresIdList.includes(id))
    .map(({ name, id }) => (
      <Typography
        className={styles.animeInfo}
        key={id}
        component='span'
        variant='body2'
      >
        {name}
      </Typography>
    ));

  const studioList = studios
    .filter(({ id }) => currentAnime.studiosIdList.includes(id))
    .map(({ name, id }) => (
      <Chip key={id} label={name} variant='outlined' />
    ));

  const replaceNull = (value: string | number | null | undefined, placeholder = '-') => value ?? placeholder;

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <img
            onClick={handleImageToggle}
            className={styles.media}
            src={currentAnime.image}
            alt='Poster for anime'
          />
          {currentAnime.trailerYoutubeId && <YouTube
            iframeClassName={styles.media}
            videoId={currentAnime.trailerYoutubeId}
          />}
        </Grid>
        <Grid item xs={9}>
          <Stack spacing={2}>
            <Box>
              <Typography component='h2' variant='h4'>{replaceNull(currentAnime.titleEnglish)}</Typography>
              <Typography component="p" variant='h5'>{replaceNull(currentAnime.titleJapanese)}</Typography>
            </Box>
            <Grid container>
              <Grid className='content-center' item xs={4}>
                <AccessTimeIcon />
                <Typography className={styles.animeInfo} component='div' variant='body2'>
                  {
                    replaceNull(currentAnime.aired.start?.getFullYear())
                  } / {
                    replaceNull(currentAnime.aired.end?.getFullYear())
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
                <Typography
                  className={styles.animeInfo}
                  component='div'
                  variant='body2'
                >
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
      <Backdrop open={isImageOpen} onClick={handleImageToggle}>
        <img src={currentAnime.image} alt='Poster for anime' />
      </Backdrop>
    </Box>
  );
};

export const AnimeDetail = memo(AnimeDetailsComponent);
