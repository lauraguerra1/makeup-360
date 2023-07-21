import React, { useEffect, useState } from 'react';
import logo from '../../images/lipstick.png'
import './App.css';
import NavBar from '../NavBar/NavBar';
import ProductContainer from '../ProductContainer/ProductContainer';
import { Route, Routes } from 'react-router-dom';
import { getAllProducts } from '../../apiCalls';
import { Product } from '../../apiTypes';

function App() {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | string | unknown>('')
  

  const updateFilteredProducts = (brand: string, type: string | null) => {
    setFilteredProducts(allProducts.filter(product => {
      const brandMatch = product.brand === brand;
      const typeMatch = product.product_type === type;
      return type ? brandMatch && typeMatch : brandMatch
    }))
  }

  useEffect(() => {
    const apiCall = async () => {
      setLoading(true)
      try {
        setAllProducts(await getAllProducts())
        setLoading(false)
      }catch(error) {
        setError(error)
        setLoading(false)
      }
    }
    apiCall()
  }, [])

  // useEffect(() => {
  //   let types = allProducts.reduce((acc: string[], curr) => {
  //     acc.push(curr.product_type);
  //     return acc;
  //   }, []);

  //   console.log(new Set([...types]))
    

  // }, [allProducts])

  return (
    <main>
      <NavBar loading={loading} products={allProducts} updateProducts={updateFilteredProducts}/>
      {loading ? 
        <section className='loading-container'>
          <img className='loading' src={logo} alt='Makeup 360 spinning logo' />
          <p className='loading-txt'>Loading...</p> 
        </section>
        : 
        <Routes>
          <Route path='/' element={<ProductContainer filteredProducts={filteredProducts}/>} />
          <Route path='/product/:id' element={<></>} />
        </Routes>
      }
    </main>
  );
}

export default App;