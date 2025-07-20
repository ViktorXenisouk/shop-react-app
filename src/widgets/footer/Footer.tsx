import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Grid, IconButton, Link, Typography, useMediaQuery, useTheme, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Facebook, Twitter, Instagram, GitHub, LinkedIn, Person2, ShoppingBasket, Search, Restore } from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  if (isMobile) {

    return (
      <BottomNavigation sx={{position: 'fixed',zIndex:3 ,bottom: 0, left: 0, right: 0}}>
        <BottomNavigationAction component={RouterLink} to='' icon={<Restore />} label='Main' />
        <BottomNavigationAction component={RouterLink} to='' icon={<Search />} label='Search' />
        <BottomNavigationAction component={RouterLink} to='' icon={<ShoppingBasket />} label='Basket' />
        <BottomNavigationAction component={RouterLink} to='' icon={<Person2 />} label='My Acount' />
      </BottomNavigation>
    )
  }
  else
    return (
      <Box
        component="footer"
        sx={{
          position: 'relative',
          backgroundColor: '#f5f5f5',
          paddingY: 4,
          marginTop: 'auto',
          borderTop: '1px solid #ddd',
          zIndex: '2'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="space-between">
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h6" gutterBottom>
                MySite
              </Typography>
              <Typography variant="body2" color="text.secondary">
                © {new Date().getFullYear()} MySite. Все права защищены.
              </Typography>
            </Grid>
            <Grid size={{ xs: 6, md: 4 }}>
              <Typography variant="subtitle1" gutterBottom>
                Навигация
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Link href="/" underline="hover" color="text.primary">Главная</Link>
                <Link href="/about" underline="hover" color="text.primary">О нас</Link>
                <Link href="/contact" underline="hover" color="text.primary">Контакты</Link>
                <Link href="/privacy" underline="hover" color="text.primary">Политика конфиденциальности</Link>
              </Box>
            </Grid>
            <Grid size={{ xs: 6, md: 4 }}>
              <Typography variant="subtitle1" gutterBottom>
                Мы в соцсетях
              </Typography>
              <Box>
                <IconButton href="https://facebook.com" target="_blank" aria-label="Facebook">
                  <Facebook />
                </IconButton>
                <IconButton href="https://twitter.com" target="_blank" aria-label="Twitter">
                  <Twitter />
                </IconButton>
                <IconButton href="https://instagram.com" target="_blank" aria-label="Instagram">
                  <Instagram />
                </IconButton>
                <IconButton href="https://github.com" target="_blank" aria-label="GitHub">
                  <GitHub />
                </IconButton>
                <IconButton href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
                  <LinkedIn />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
};

export default Footer;