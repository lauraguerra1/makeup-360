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
  const [error, setError] = useState<Error | string | unknown>('')
  const [savedProducts, setSavedProducts] = useState<Product[]>([])
  
  const updateFilteredProducts = (brand: string, type: string | null) => {
    !type && !brand ? setFilteredProducts([]) : 
    setFilteredProducts(allProducts.filter(product => {
      const brandMatch = product.brand?.includes(brand.toLowerCase())
      const typeMatch = product.product_type === type;
      return type? brandMatch && typeMatch : brandMatch
    }))
  }

  const addToSavedProducts = (newProduct:Product) => {
    setSavedProducts(previous=> [...previous, newProduct])
  }

  const removeFromSavedProducts = (product:Product) => {
    setSavedProducts(previous => previous.filter(oldProduct => oldProduct.id !== product.id))
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
  useEffect(() => {
    console.log(savedProducts)
  }, [savedProducts])
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
          <Route path='/' element={<ProductContainer filteredProducts={filteredProducts} allProducts={allProducts} />} />
          <Route path='/product/:id' element={<ProductDetail allProducts={allProducts} savedProducts={savedProducts} addToSavedProducts={addToSavedProducts} removeFromSavedProducts={removeFromSavedProducts} />} />
        </Routes>
      }
    </main>
  );
}

export default App;
