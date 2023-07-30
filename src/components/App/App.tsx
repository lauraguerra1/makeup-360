import React, { useEffect, useState } from 'react';
import logo from '../../images/lipstick.png'
import './App.css';
import NavBar from '../NavBar/NavBar';
import ProductContainer from '../ProductContainer/ProductContainer';
import { Route, Routes } from 'react-router-dom';
import { getAllProducts } from '../../apiCalls';
import { Product } from '../../apiTypes';
import ProductDetail from '../ProductDetail/ProductDetail'
import EmptyState from '../EmptyState/EmptyState';

const App = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [searching, setSearching] = useState(false)
  const [savedProducts, setSavedProducts] = useState<Product[]>([])
  
  const getSavedProducts = () => {
    const storage = localStorage.savedProducts
    if(storage) {
      setSavedProducts(JSON.parse(storage))
    } 
  }

  useEffect(() => {
    getSavedProducts()
  }, [])
  

  const updateSearching = (boolean: boolean) => setSearching(boolean)
  
  const updateProducts = (products:Product[], brand: string, type: string | null) => {
    if(!type && !brand) {
      setFilteredProducts([])
      setSearching(false)
    } else {
      setFilteredProducts(products.filter(product => {
        const brandMatch = product.brand?.includes(brand.toLowerCase())
        const typeMatch = product.product_type === type;
        return type? brandMatch && typeMatch : brandMatch
      }))
      setSearching(true)
    }
  }

  const addToSavedProducts = (newProduct:Product) => {
    window.localStorage.setItem('savedProducts', JSON.stringify([...savedProducts, newProduct]))
    setSavedProducts(JSON.parse(localStorage.savedProducts))
  }

  const removeFromSavedProducts = (product:Product) => {
    const filteredProducts = savedProducts.filter(oldProduct => oldProduct.id !== product.id)
    window.localStorage.setItem('savedProducts', JSON.stringify(filteredProducts))
    setSavedProducts(JSON.parse(localStorage.savedProducts))
  }

  useEffect(() => {
    const apiCall = async () => {
      setLoading(true)
      try {
        setAllProducts(await getAllProducts())
        setLoading(false)
      }catch(error) {
        if(error instanceof Error) {
          setError(error)
        }
        setLoading(false)
      }
    }
    apiCall()
  }, [])

  return (
    <main>
      <NavBar loading={loading} updateSearching={updateSearching} allProducts={allProducts} savedProducts={savedProducts} updateProducts={updateProducts}/>
      {error ?
       <EmptyState errorMessage={error.message}/>
      :loading ? 
        <section className='loading-container'>
          <img className='loading' src={logo} alt='Makeup 360 spinning logo' />
          <p className='loading-txt'>Loading...</p> 
        </section>
        : 
        <Routes>
          <Route path='/' element={<ProductContainer filteredProducts={filteredProducts} allProducts={allProducts} savedProducts={savedProducts} searching={searching}/>} />
          <Route path='/product/:id' element={<ProductDetail allProducts={allProducts} savedProducts={savedProducts} addToSavedProducts={addToSavedProducts} removeFromSavedProducts={removeFromSavedProducts} />} />
          <Route path='/favorites' element={<ProductContainer filteredProducts={filteredProducts} allProducts={allProducts} savedProducts={savedProducts} searching={searching}/>}/>
          <Route path='/favorites/*' element={<EmptyState errorMessage={'Nothing to see here! Please go back!'}/>} />
          <Route path='/*' element={<EmptyState errorMessage={'Nothing to see here! Please go back!'}/>} />
        </Routes>
      }
    </main>
  );
}

export default App;
