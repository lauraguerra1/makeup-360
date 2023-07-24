import React, { useEffect, useState } from 'react';
import logo from '../../images/lipstick.png'
import './App.css';
import NavBar from '../NavBar/NavBar';
import ProductContainer from '../ProductContainer/ProductContainer';
import { Route, Routes } from 'react-router-dom';
import { getAllProducts } from '../../apiCalls';
import { Product } from '../../apiTypes';
import ProductDetail from '../ProductDetail/ProductDetail'

const App = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [searching, setSearching] = useState(false)
  const [error, setError] = useState<Error | string | unknown>('')
  
  const updateFilteredProducts = (brand: string, type: string | null) => {
    !type && !brand ? setFilteredProducts([]) : 
    setFilteredProducts(allProducts.filter(product => {
      const brandMatch = product.brand?.includes(brand.toLowerCase())
      const typeMatch = product.product_type === type;
      return type? brandMatch && typeMatch : brandMatch
    }))
    setSearching(true)
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
          <Route path='/' element={<ProductContainer searching={searching}filteredProducts={filteredProducts}/>} />
          <Route path='/product/:id' element={<ProductDetail allProducts={allProducts}/>} />
        </Routes>
      }
    </main>
  );
}

export default App;
