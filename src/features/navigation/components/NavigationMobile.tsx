import { useState, useEffect } from "react"
import { Logo } from "../logo/Logo"
import { LINK_DATA, EXPAND_LINK_DATA } from "../api"
import MyLink from "./MyLink"
import { Link as RouterLink } from "react-router-dom"

import {
  Box,
  Drawer,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Stack
} from '@mui/material';

import { Menu, ShoppingBasket, Search, Person, Favorite, ShoppingBasketRounded } from "@mui/icons-material"
import { useAuthUserStore } from "../../../store/useAuth"

const NavigationMobile = ({ onSearchClick }: { onSearchClick: () => void }) => {
  const [open, setOpen] = useState(false);
  const store = useAuthUserStore()

  const toggleDrawer = (value: boolean) => () => {
    setOpen(value);
  };

  console.log(store.token)

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
        <IconButton onClick={toggleDrawer(true)} color="inherit">
          <Menu />
        </IconButton>
        <Stack direction='row'>
          <IconButton onClick={onSearchClick}><Search /></IconButton>
        </Stack>
      </Box>

      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box width={250} role="presentation" onClick={toggleDrawer(false)} p={2}>
          <Typography component={RouterLink} to='/' variant="h6">Logo</Typography>
          <Divider sx={{ my: 1 }} />

          <Stack justifyContent='flex-start' alignItems='flex-start'>
            {store.token ?
              <Button component={RouterLink} to='/me/me' sx={{ color: 'black' }} startIcon={<Person />}>
                My Account
              </Button> :
              <Button component={RouterLink} to='/login' sx={{ color: 'black' }} startIcon={<Person />}>
                Login
              </Button>
            }
            {
              store.token &&
              <>
                <Button component={RouterLink} to='/me/favourite' sx={{ color: 'black' }} startIcon={<Favorite />}>
                  Favorite
                </Button>
                <Button component={RouterLink} to='/me/basket' sx={{ color: 'black' }} startIcon={<ShoppingBasketRounded />}>
                  Basket
                </Button>
              </>
            }
            <Button component={RouterLink} to='/search' sx={{ color: 'black' }} startIcon={<Search />}>
              search
            </Button>
            <Divider sx={{ my: 1 }} />
          </Stack>
          {EXPAND_LINK_DATA.map((item) => (
            <Box key={item.title} mb={2}>
              <Typography fontWeight="bold">{item.title}</Typography>
              {item.links.map((link) => (
                <ListItem key={link.to} disablePadding>
                  <MyLink to={link.to}>{link.title}</MyLink>
                </ListItem>
              ))}
            </Box>
          ))}

          <Divider sx={{ my: 1 }} />
          <Typography fontWeight="bold">Other</Typography>
          <List>
            {LINK_DATA.map((item) => (
              <ListItem key={item.to} disablePadding>
                <MyLink to={item.to}>{item.title}</MyLink>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export { NavigationMobile };