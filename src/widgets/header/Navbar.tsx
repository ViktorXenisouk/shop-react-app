import { useEffect, useState } from "react"
import { NavigationDesktop } from "./components/NavigationDesktop"
import { NavigationMobile } from "./components/NavigationMobile"
import SearchModal from "../../features/search/SearchModal"
import { AppBar, Toolbar, useMediaQuery, useTheme, Slide, useScrollTrigger } from '@mui/material';
import { useAdminAuthStore } from "../../store/useAdmin";
import AdminNavigation from "../../features/admin/UI/AdminNavigation";

const HideOnScroll = ({ children }: { children: React.ReactElement }) => {
  const trigger = useScrollTrigger({ threshold: 60 });


  return (
    <Slide appear={false} direction="down" in={!trigger}>
        {children}
    </Slide>
  );
};

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // md = 960px
    const store = useAdminAuthStore()
  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <>
      <HideOnScroll>
        <AppBar color="default" position="sticky" elevation={4} sx={{ borderBottom: '1px solid #ccc' }}>
          <Toolbar>
            {isMobile ? (
              <NavigationMobile onSearchClick={() => setIsSearchActive(true)} />
            ) : (
              <NavigationDesktop onSearchClick={() => setIsSearchActive(true)} />
            )}
          </Toolbar>
                  {store.token ? <AdminNavigation /> : null}
        </AppBar>
      </HideOnScroll>
      <SearchModal isActive={isSearchActive} setIsActive={setIsSearchActive} />
    </>
  );
};

export default Navbar;