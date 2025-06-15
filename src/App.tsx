import React from 'react';
import { Routes, Route } from 'react-router-dom'
import * as pages from './pages/index'
import './App.css';
import Navbar from './features/navigation/Navbar';
import AdminProductsCreate from './features/admin/adminProducts/components/AdminProductCreate';
import AdminNavigation from './features/admin/AdminNavigation';
import { Box } from "@mui/material"
import { useAdminAuthStore } from './store/useAdmin';

function App() {
  const store = useAdminAuthStore()
  return (
    <div className="App">
      <Navbar />
      {store.token ? <AdminNavigation /> : ''}
      <Box component={'main'} sx={{ width: 1500 }}>
        <Routes>
          <Route index element={<pages.Main />} />
          <Route path='/login' element={<pages.Login />} />
          <Route path='/register' element={<pages.Register />} />
          <Route path='/products/*' element={<pages.Products />} />
          <Route path='/product/:id' element={<pages.Product />} />
          <Route path='/backet' element={<pages.Basket />} />
          <Route path='*' element={<pages.ErrorPage message='can not find the page' status={404} />} />
          <Route path='/admin'>
            <Route path='/admin' index element={<pages.AdminLogin />} />
            <Route path='/admin/me' element={<pages.AdminMe />} />
            <Route path='/admin/edit' element={<pages.AdminEditMe/>}/>
            <Route path='/admin/users'>
              <Route path='/admin/users/search/*' element={<pages.AdminUsers />} />
              <Route path='/admin/users/edit/:id' element={<pages.AdminUsersEdit />} />
            </Route>
            <Route path='/admin/categories'>
              <Route path='/admin/categories/search/*' element={<pages.AdminCategories />} />
              <Route path='/admin/categories/create/:id' element={<pages.AdminCategoryCreate />} />
              <Route path='/admin/categories/edit/:id' element={<pages.AdminCategoryEdit />} />
            </Route>
            <Route path='/admin/admins'>
              <Route path='/admin/admins/search/*' element={<pages.AdminAdmins />} />
              <Route path='/admin/admins/create' element={<pages.AdminAdminsCreate />} />

            </Route>
            <Route path='/admin/products'>
              <Route path='/admin/products/search/*' element={<pages.AdminProducts />} />
              <Route path='/admin/products/edit/:id' element={<pages.AdminProductsEdit />} />
              <Route path='/admin/products/create' element={<AdminProductsCreate />} />
            </Route>
          </Route>
        </Routes>
      </Box>
    </div>
  );
}

export default App;
