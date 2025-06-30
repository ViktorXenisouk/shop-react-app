import { useEffect, useState } from "react"
import { NavigationDesktop } from "./features/NavigationDesktop"
import { NavigationMobile } from "./features/NavigationMobile"
import Search from "../search/SearchModal"
import { AppBar, Toolbar, useMediaQuery, useTheme, Slide, useScrollTrigger } from '@mui/material';

const HideOnScroll = ({ children }: { children: React.ReactElement }) => {
  const trigger = useScrollTrigger({ threshold: 30 });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // md = 960px
  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <>
      <HideOnScroll>
        <AppBar color="default" position="sticky" elevation={4} sx={{borderBottom:'1px solid #ccc'}}>
          <Toolbar>
            {isMobile ? (
              <NavigationMobile onSearchClick={() => setIsSearchActive(true)} />
            ) : (
              <NavigationDesktop onSearchClick={() => setIsSearchActive(true)} />
            )}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Search isActive={isSearchActive} setIsActive={setIsSearchActive} />
    </>
  );
};

export default Navbar;
