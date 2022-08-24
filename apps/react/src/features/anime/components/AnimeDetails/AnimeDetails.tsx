import { Box, Typography } from '@mui/material';
import { FC, memo } from 'react';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';

import styles from './AnimeDetails.module.css';

const AnimeDetailsComponent: FC = () => (
  <Box className={styles.animeDetailsSkeleton}>
    <Typography component='p' variant='h4'>
      The anime of your choice will be displayed here
    </Typography>
    <CollectionsBookmarkIcon fontSize='large' />
  </Box>
);

export const AnimeDetails = memo(AnimeDetailsComponent);
