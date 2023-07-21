import React from 'react';
import logo from './lipstick.png';
import './App.css';
import NavBar from '../NavBar/NavBar';
import ProductContainer from '../ProductContainer/ProductContainer';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <main>
      <NavBar />
      <Routes>
        <Route path='/' element={<ProductContainer />} />
        <Route path='/product/:id' element={<></>} />
      </Routes>
    </main>
  );
}

export default App;
