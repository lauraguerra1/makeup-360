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
  const [searching, setSearching] = useState(false)

  console.log(filteredProducts)

  const updateSearching = (boolean: boolean) => setSearching(boolean)
  
  const updateProducts = (products:Product[], brand: string, type: string | null) => {
    //accept an argument for what to filter off of replacing 'allProducts'
    // coming in either 'allProducts' or 'savedProducts'
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

  return (
    <main>
      //in nav add a condition for if the location is favorites to search based off faves only
      <NavBar loading={loading} updateSearching={updateSearching} allProducts={allProducts} savedProducts={savedProducts} updateProducts={updateProducts}/>
      {loading ? 
        <section className='loading-container'>
          <img className='loading' src={logo} alt='Makeup 360 spinning logo' />
          <p className='loading-txt'>Loading...</p> 
        </section>
        : 
        <Routes>
          <Route path='/' element={<ProductContainer filteredProducts={filteredProducts} allProducts={allProducts} savedProducts={savedProducts} searching={searching}/>} />
          <Route path='/product/:id' element={<ProductDetail allProducts={allProducts} savedProducts={savedProducts} addToSavedProducts={addToSavedProducts} removeFromSavedProducts={removeFromSavedProducts} />} />
          // pass in other props and add logic for if we are on faves
          <Route path='/favorites' element={<ProductContainer filteredProducts={filteredProducts} allProducts={allProducts} savedProducts={savedProducts} searching={searching}/>}/>
        </Routes>
      }
    </main>
  );
}

export default App;
