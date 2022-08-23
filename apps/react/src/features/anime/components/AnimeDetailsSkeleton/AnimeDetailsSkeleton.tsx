import { Box, Typography } from '@mui/material';
import { FC, memo } from 'react';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';

const AnimeDetailsSkeletonComponent: FC = () => (
  <Box sx={{
    backgroundColor: '#eee6',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#aaa',
  }}>
    <Typography component='p' variant='h4'>
      The anime of your choice will be displayed here
    </Typography>
    <CollectionsBookmarkIcon fontSize='large' />
  </Box>
);

export const AnimeDetailsSkeleton = memo(AnimeDetailsSkeletonComponent);
