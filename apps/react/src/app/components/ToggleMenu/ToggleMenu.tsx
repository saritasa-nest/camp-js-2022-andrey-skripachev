import { Button, Paper, Slide } from '@mui/material';
import { Box } from '@mui/system';
import { FC, memo, ReactElement, useRef, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import './ToggleMenu.css';

interface Props {

  /** Menu content. */
  readonly children: ReactElement;

  /** Root menu element. */
  readonly ref: Element | null;
}

const ToggleMenuComponent: FC<Props> = ({ children, ref }: Props) => {

  const [isOpen, setOpen] = useState(false);

  const containerRef = useRef(ref);

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
          <Slide className='toggle-menu-slider' direction='down' in={isOpen} container={containerRef.current}>
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
