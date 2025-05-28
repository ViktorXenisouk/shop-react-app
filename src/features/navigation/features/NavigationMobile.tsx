import { useState, useEffect } from "react"
import { Logo } from "../logo/Logo"
import { LINK_DATA, EXPAND_LINK_DATA } from "../api"
import MyLink from "../features/MyLink"

import {
  Box,
  Drawer,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShopingBasket from '@mui/icons-material/ShoppingBasket'

const NavigationMobile = ({ onSearchClick }: { onSearchClick: () => void }) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (value: boolean) => () => {
    setOpen(value);
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
        <IconButton onClick={toggleDrawer(true)} color="inherit">
          <MenuIcon />
        </IconButton>
        <Box>
          <Button onClick={onSearchClick}>Search</Button>
          <ShopingBasket/>
        </Box>
      </Box>

      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box width={250} role="presentation" onClick={toggleDrawer(false)} p={2}>
          <Typography variant="h6">Account</Typography>
          <Divider sx={{ my: 1 }} />

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