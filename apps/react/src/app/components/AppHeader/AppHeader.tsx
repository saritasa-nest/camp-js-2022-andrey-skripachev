import { selectUser } from '@js-camp/react/store/user/selectors';
import { AppBar, Avatar, Grid, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { FC, memo, MouseEvent, useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { logoutUser } from '@js-camp/react/store/user/dispatchers';

import './AppHeader.css';

const AppHeaderComponent: FC = () => {

  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);

  const appDispatch = useAppDispatch();

  /**
   * Logouts user.
   */
  const logout = () => {
    appDispatch(logoutUser());
  };

  /**
   * Opens menu.
   * @param event Mouse event.
   */
  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };

  /**
   * Closes menu.
   */
  const handleMenuClose = () => {
    setAnchorElement(null);
  };

  const user = useAppSelector(selectUser);

  if (!user) {
    return (<></>);
  }

  return (
    <AppBar
      className='app-header'
      position='static'
      color='primary'
    >
      <Grid container justifyContent='space-between' alignItems='center'>
        <Grid item>
          <Typography component='h1' variant='h2'>Anime catalog</Typography>
        </Grid>
        <Grid item>
          <IconButton
            size='large'
            edge='start'
            aria-label='menu'
            onClick={handleMenuOpen}
          >
            <Avatar>{user.firstName[0]}</Avatar>
          </IconButton>
        </Grid>
      </Grid>
      <Menu
        anchorEl={anchorElement}
        open={Boolean(anchorElement)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={logout}>
          <LogoutIcon />
          Log out
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export const AppHeader = memo(AppHeaderComponent);
