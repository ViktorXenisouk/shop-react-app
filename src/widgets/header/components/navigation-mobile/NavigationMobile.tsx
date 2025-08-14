import React, { useState, useEffect, Fragment } from "react"
import { LINK_DATA, EXPAND_LINK_DATA } from "../../api"
import MyLink from "../../UI/MyLink"
import { Link as RouterLink } from "react-router-dom"

import {
  Box,
  Drawer,
  IconButton,
  Button,
  List,
  ListItem,
  Divider,
  Typography,
  Stack,
} from '@mui/material';

import { Menu, Search, Person, Favorite, ShoppingBasketRounded } from "@mui/icons-material"
import { useAuthUserStore } from "../../../../store/useAuth"

type Props = {
  onSearchClick: () => void
}

const NavigationMobile: React.FC<Props> = ({ onSearchClick }) => {

  const [open, setOpen] = useState(false);
  const store = useAuthUserStore()

  const toggleDrawer = (value: boolean) => () => {
    setOpen(value);
  };

  return (
    <Fragment>
      <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
        <IconButton
          onClick={toggleDrawer(true)}>
          <Menu />
        </IconButton>
        <Stack direction='row'>
          <IconButton
            onClick={onSearchClick}>
            <Search />
          </IconButton>
        </Stack>
      </Box>

      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box width={250} role="presentation" p={2}>
          <Typography component={RouterLink} to='/' variant="h6">Logo</Typography>
          <Divider sx={{ my: 1 }} />

          <Stack justifyContent='flex-start' alignItems='flex-start'>
            {store.token ?
              <Button
                component={RouterLink}
                to='/login'
                color="primary"
                startIcon={<Person />}>
                My Account
              </Button> :
              <Fragment>
                <Button
                  component={RouterLink}
                  to='/login'
                  color="primary"
                  startIcon={<Person />}>
                  Login
                </Button>
                <Button
                  component={RouterLink}
                  to='/login'
                  color="primary"
                  startIcon={<Person />}>
                  Create Account
                </Button>
              </Fragment>
            }
            <Button 
            component={RouterLink} 
            to='/me/favourite' 
            color="primary"
            startIcon={<Favorite />}>
                  Favorite
                </Button>
                <Button 
                component={RouterLink} 
                to='/me/basket' 
                color='primary'
                 startIcon={<ShoppingBasketRounded />}
                 >
                  Basket
                </Button>
            <Button component={RouterLink} to='/search' sx={{ color: 'black' }} startIcon={<Search />}>
              search
            </Button>
            <Divider sx={{ my: 1 }} />
          </Stack>
          {EXPAND_LINK_DATA.map((item) => (
            <Box key={item.title} mb={2}>
              <Typography color="text.primary" fontWeight="bold">
                {item.title}
              </Typography>
              {item.links.map((link) => (
                <ListItem key={link.to} disablePadding>
                  <Button
                    color="primary"
                    component={RouterLink}
                    to={link.to}>
                    {item.title}
                  </Button>
                </ListItem>
              ))}
            </Box>
          ))}

          <Divider sx={{ my: 1 }} />
          <Typography
            color="text.primary"
            fontWeight="bold">
            Other
          </Typography>
          <List>
            {LINK_DATA.map((item) => (
              <ListItem key={item.to} disablePadding>
                <Button
                  color="primary"
                  component={RouterLink}
                  to={item.to}>
                  {item.title}
                </Button>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Fragment>
  );
};

export { NavigationMobile };