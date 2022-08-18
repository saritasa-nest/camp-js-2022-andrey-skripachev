import { selectUser } from '@js-camp/react/store/user/selectors';
import { AppBar, Avatar, Grid, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { FC, memo, MouseEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';

/**
 * Logouts user.
 */
function logout() {
  // Logout
}

const AppHeaderComponent: FC = () => {

  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);

  /**
   * Opens menu.
   * @param event Mouse event.
   */
  function handleMenuOpen(event: MouseEvent<HTMLElement>) {
    setAnchorElement(event.currentTarget);
  }

  /**
   * Closes menu.
   */
  function handleMenuClose() {
    setAnchorElement(null);
  }

  const user = useSelector(selectUser);

  if (user === null) {
    return (<></>);
  }

  return (
    <AppBar
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
