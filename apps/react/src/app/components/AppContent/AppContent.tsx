import { FC, memo, ReactElement } from 'react';
import { Box } from '@mui/material';

import styles from './AppContent.module.css';

interface AppContainerProps {

  /** Children container. */
  readonly children: ReactElement;
}

const AppContentComponent: FC<AppContainerProps> = ({ children }: AppContainerProps) => (
  <Box className={styles.appContent}>
    { children }
  </Box>
);

export const AppContent = memo(AppContentComponent);
