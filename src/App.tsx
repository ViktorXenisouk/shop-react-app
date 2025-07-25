import './App.css';
import { Routes, Route } from 'react-router-dom'
import * as pages from './pages/index'
import AdminNavigation from './features/admin/UI/AdminNavigation';
import { useAdminAuthStore } from './store/useAdmin';
import Navbar from './widgets/header/Navbar';
import Footer from './widgets/footer/Footer';
import { grey } from '@mui/material/colors';
import { Box,Container, useMediaQuery, useTheme } from '@mui/material';


function App() {
  const store = useAdminAuthStore()
  console.log(store.token)
    const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box className="App" sx={{m:0,p:0}}>
      <Navbar />
      <Container 
      maxWidth={isSmall ? false : undefined}  // 100% на XS, 'md' на других
      disableGutters={isSmall}
      component={'main'} sx={{minHeight: 1500,backgroundColor: grey[50],pl:'0px!important',pr:'0px!important',pt:0,overflowY: 'hidden',mb:isSmall?"60px":undefined}}>
          <Routes>
            <Route index element={<pages.Main />} />
            <Route path='/me/:page' element={<pages.Personal />} />
            <Route path='/buy-process' element={<pages.BuyProcess/>}/>
            <Route path='/login' element={<pages.Login />} />
            <Route path='/register' element={<pages.Register />} />
            <Route path='/search/*' element={<pages.SearchPage />} />
            <Route path='/products/*' element={<pages.Products />} />
            <Route path='/product/:id' element={<pages.Product />} />
            <Route path='/backet' element={<pages.Basket />} />
            <Route path='*' element={<pages.ErrorPage message='can not find the page' status={404} />} />
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
            </Route>
          </Routes>
      </Container>
      <Footer />
    </Box>
  );
}

export default App;
