import { FC, memo, PropsWithChildren } from 'react';
import { Box } from '@mui/material';

import styles from './AppContent.module.css';

/** Eslint requires the word "props" to be at the end of the type. */
type ChildrenProps = PropsWithChildren;

const AppContentComponent: FC<ChildrenProps> = ({ children }) => (
  <Box className={styles.appContent}>
    { children }
  </Box>
);

export const AppContent = memo(AppContentComponent);
