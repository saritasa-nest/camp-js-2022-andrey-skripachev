import { Button, Paper, Slide } from '@mui/material';
import { Box } from '@mui/system';
import { FC, memo, PropsWithChildren, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import styles from './ToggleMenu.module.css';

/** Eslint requires the word "props" to be at the end of the type. */
type ChildrenProps = PropsWithChildren;

const ToggleMenuComponent: FC<ChildrenProps> = ({ children }) => {

  const [isOpen, setOpen] = useState(false);

  const handleSwitch = () => {
    setOpen(!isOpen);
  };

  const openedMenuButton = (
    <KeyboardArrowUpIcon fontSize='large' />
  );

  const closedMenuButton = (
    <KeyboardArrowDownIcon fontSize='large' />
  );

  return (
    <>
      <Box className={styles.toggleMenuWrapper}>
        <Box className={styles.toggleMenu}>
          <Slide className={styles.toggleMenuSlider} direction='down' in={isOpen} container={null}>
            <Paper elevation={3}>
              {children}
            </Paper>
          </Slide>
          <Button className={styles.toggleMenuButton} onClick={handleSwitch}>
            {isOpen ? openedMenuButton : closedMenuButton}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export const ToggleMenu = memo(ToggleMenuComponent);
