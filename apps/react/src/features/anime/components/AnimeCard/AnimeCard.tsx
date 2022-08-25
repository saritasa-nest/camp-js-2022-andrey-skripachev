import { FC, memo } from 'react';
import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { Anime } from '@js-camp/core/models/anime';

interface AnimeCardProps {

  /** Anime. */
  readonly anime: Anime;
}

const AnimeCardComponent: FC<AnimeCardProps> = ({ anime }) => (
  <>
    <ListItem>
      <ListItemAvatar>
        <Avatar src={anime.image} sx={{
          width: '80px',
          height: '80px',
        }} />
      </ListItemAvatar>
      <ListItemText>
        <>
          <Typography component='h3' variant='h5'>
            {anime.titleEnglish || '-'} ({anime.titleJapanese || '-'})
          </Typography>
          <Typography component='p' variant='body2'>
            {anime.status}, {anime.type}
          </Typography>
        </>
      </ListItemText>
    </ListItem>
    <Divider variant="inset" component="li" />
  </>
);

export const AnimeCard = memo(AnimeCardComponent);
