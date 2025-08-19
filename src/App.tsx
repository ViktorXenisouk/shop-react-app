import './App.css';
import { Routes, Route } from 'react-router-dom'
import * as pages from './pages/index'
import Navbar from './widgets/header/Navbar';
import Footer from './widgets/footer/Footer';
import { Box, Container, useMediaQuery, useTheme } from '@mui/material';

function App() {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <Box className="App" sx={{ m: 0, p: 0,bgcolor:'primary' }}>
      <Navbar />
      <Container
        maxWidth={isSmall ? false : undefined}  // 100% на XS, 'md' на других
        disableGutters={isSmall}
        component={'main'} sx={{ minHeight: 1500, bgcolor:'background.default', pl: '0px!important', pr: '0px!important', pt: 0, overflowY: 'hidden', mb: isMobile ? "60px" : undefined }}>
        <Routes>
          <Route index element={<pages.Main />} />
          <Route path='/me/:page' element={<pages.Personal />} />
          <Route path='/buy-process' element={<pages.BuyProccess />} />
          <Route path='/login' element={<pages.Login />} />
          <Route path='/register' element={<pages.Register />} />
          <Route path='/search/*' element={<pages.SearchPage />} />
          <Route path='/article/*' element={<pages.SearchPage />} />
          <Route path='/products/*' element={<pages.Products />} />
          <Route path='/product/:id' element={<pages.Product />} />
          <Route path='/backet' element={<pages.Basket />} />
          <Route path='/play-list/*' element={<pages.PlayListPage />} />
          <Route path='*' element={<pages.NoFoundErrorPage />} />
          <Route path='/admin'>
            <Route path='/admin' element={<pages.AdminLogin />} />
            <Route path='/admin/me' element={<pages.AdminMe />} />
            <Route path='/admin/edit' element={<pages.AdminEditMe />} />
            <Route path='/admin/users'>
              <Route path='/admin/users/search/*' element={<pages.AdminUsers />} />
              <Route path='/admin/users/edit/:id' element={<pages.AdminUsersEdit />} />
            </Route>
            <Route path='/admin/categories'>
              <Route path='/admin/categories/search/*' element={<pages.AdminCategory />} />
              <Route path='/admin/categories/create/:id' element={<pages.AdminCategoryCreate />} />
              <Route path='/admin/categories/edit/:id' element={<pages.AdminCategoryEdit />} />
            </Route>
            <Route path='/admin/admins'>
              <Route path='/admin/admins/search/*' element={<pages.AdminAdmins />} />
              <Route path='/admin/admins/create' element={<pages.AdminAdminsCreate />} />
              <Route path='/admin/admins/edit/:id' element={<pages.AdminAdminsEdit />} />
            </Route>
            <Route path='/admin/products'>
              <Route path='/admin/products/search/*' element={<pages.AdminProducts />} />
              <Route path='/admin/products/edit/:id' element={<pages.AdminProductsEdit />} />
              <Route path='/admin/products/create' element={<pages.AdminProductCreate />} />
            </Route>
            <Route path='/admin/play-list'>
              <Route path='/admin/play-list/search/*' element={<pages.AdminPlayList />} />
              <Route path='/admin/play-list/edit/:id' element={<pages.AdminPlayListEdit />} />
              <Route path='/admin/play-list/create/:id' element={<pages.AdminPlayListCreate />} />
            </Route>
          </Route>
        </Routes>
      </Container>
      <Footer />
    </Box>
  );
}

export default App;
