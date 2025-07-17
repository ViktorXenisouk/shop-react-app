import MyLink from "./MyLink"
import { Logo } from "../logo/Logo"
import { LINK_DATA, EXPAND_LINK_DATA } from "../api"
import ExpandLink from './ExpandLink';
import { Link } from "react-router-dom"

import { useAuthUserStore } from "../../../store/useAuth";

import { ShoppingCart, Favorite, Person, Search, Login } from '@mui/icons-material'
import { Box, Button, Stack, IconButton, Badge } from '@mui/material';

const NavigationDesktop = ({ onSearchClick }: { onSearchClick: () => void }) => {
  const store = useAuthUserStore()
  return (
    <Box width="100%" display="flex" justifyContent="space-between" alignItems="center">
      <Button component={Link} to={'/'}>
        <Logo />
      </Button>

      <Stack direction="row" spacing={2} sx={{ borderBottom: '1px solid #ccc' }}>
        {EXPAND_LINK_DATA.map((item) => (
          <ExpandLink title={item.title} links={item.links} />
        ))}
        {LINK_DATA.map((item) => (
          <MyLink key={item.title} to={item.to}>{item.title}</MyLink>
        ))}
      </Stack>

      <Stack direction="row" spacing={2} sx={{ mr: 4 }}>
        <IconButton onClick={onSearchClick}><Search /></IconButton>
        <IconButton component={Link} to="/me/basket">
          <Badge color="primary" badgeContent={store.user.basketInfo.length}>
            <ShoppingCart />
          </Badge>
        </IconButton>
        <IconButton component={Link} to="/me/favourite">
          <Badge color="primary" badgeContent={store.user.favourite.length}>
            <Favorite />
          </Badge>
        </IconButton>
        <IconButton component={Link} to="/me/me">
          <Person />
        </IconButton>
      </Stack>
    </Box>
  );
};

export { NavigationDesktop };
