import { Box } from '@mui/material';
import { FC, memo, ReactElement } from 'react';

import './AppContent.css';

interface AppContainerProps {

  /** Children container. */
  readonly children: ReactElement;
}

const AppContentComponent: FC<AppContainerProps> = ({ children }: AppContainerProps) => (
  <Box className='app-content'>
    { children }
  </Box>
);

export const AppContent = memo(AppContentComponent);
