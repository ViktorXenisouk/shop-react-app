import React from 'react';
import { Routes, Route } from 'react-router-dom'
import * as pages from './pages/index'
import './App.css';
import Navbar from './features/navigation/Navbar';
import AdminCategories from './pages/AdminCategories';
import AdminProductsCreate from './features/admin/adminProducts/components/AdminProductCreate';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route index element={<pages.Main />} />
          <Route path='/login' element={<pages.Login/>}/>
          <Route path='/register' element={<pages.Register/>} />
          <Route path='/products/*' element={<pages.Products />} />
          <Route path='/product/:id' element={<pages.Product />} />
          <Route path='/backet' element={<pages.Basket />} />
          <Route path='*' element={<pages.ErrorPage message='can not find the page' status={404}/>} />
          <Route path='/admin'>
            <Route path='/admin' index element={<pages.AdminLogin />} />
            <Route path='/admin/products' element={<pages.AdminProducts/>}/>
            <Route path='/admin/users' element={<pages.AdminUsers/>}/>
            <Route path='/admin/categories' element={<pages.AdminCategories/>}/>
            <Route path='/admin/admins' element={<pages.AdminUsers/>}/>
            <Route path='/admin/products/create' element={<AdminProductsCreate/>}/>
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
