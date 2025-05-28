import MyLink from "./MyLink"
import { Logo } from "../logo/Logo"
import { LINK_DATA, EXPAND_LINK_DATA } from "../api"
import ExpandLink from './ExpandLink';
import { Link } from "react-router-dom"

import { Box, Button, Stack } from '@mui/material';

const NavigationDesktop = ({ onSearchClick }: { onSearchClick: () => void }) => {
  return (
    <Box width="100%" display="flex" justifyContent="space-between" alignItems="center">
      <Logo />

      <Stack direction="row" spacing={2}>
        {EXPAND_LINK_DATA.map((item) => (
          <ExpandLink title={item.title} links={item.links} />
        ))}
        {LINK_DATA.map((item) => (
          <MyLink key={item.title} to={item.to}>{item.title}</MyLink>
        ))}
      </Stack>

      <Stack direction="row" spacing={2}>
        <Button variant="text" onClick={onSearchClick}>Search</Button>
        <Button component={Link} to="/backet">Basket</Button>
        <Button component={Link} to="">Like</Button>
        <Button component={Link} to="/login">Authorisation</Button>
      </Stack>
    </Box>
  );
};

export { NavigationDesktop };
