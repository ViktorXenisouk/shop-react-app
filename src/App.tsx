import React from 'react';
import { Routes, Route } from 'react-router-dom'
import * as pages from './components/pages/index'
import './App.css';
import Navbar from './components/UI/navigation/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route index element={<pages.Main />} />
          <Route path='/products/*' element={<pages.Products />}/>
          <Route path='/product/:id' element={<pages.Product />} />
          <Route path='/backet' element={<pages.Basket />} />
          <Route path='*' element={<pages.ErrorPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
