import { Button, Paper, Slide } from '@mui/material';
import { Box } from '@mui/system';
import { FC, memo, PropsWithChildren, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import './ToggleMenu.css';

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
      <Box className='toggle-menu-wrapper'>
        <Box className='toggle-menu'>
          <Button className='toggle-menu-button' onClick={handleSwitch}>
            {isOpen ? openedMenuButton : closedMenuButton}
          </Button>
          <Slide className='toggle-menu-slider' direction='down' in={isOpen} container={null}>
            <Paper elevation={3}>
              {children}
            </Paper>
          </Slide>
        </Box>
      </Box>
    </>
  );
};

export const ToggleMenu = memo(ToggleMenuComponent);
