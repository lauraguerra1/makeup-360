import './NavBar.css'
import logo from '../../images/logo.gif'
import unfavorite from '../../images/unfavorite.png'
import cancel from '../../images/cancel.png'
import { Product } from '../../apiTypes'
import { useEffect, useState } from 'react'
import CategoryContainer from '../CategoryContainer/CategoryContainer'
import { makeSnakeCase } from '../../helpers'
import { Link, useLocation } from 'react-router-dom'

interface NavBarProps {
  loading: boolean
  updateSearching: (boolean: boolean) => void
  allProducts: Product[]
  savedProducts: Product[],
  updateProducts: (products: Product[], brand: string, type: string | null) => void 
}

const NavBar = ({loading, updateSearching, allProducts, savedProducts, updateProducts}: NavBarProps) => {
  const [searchData, setSearchData] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [clearAllowed, setClearAllowed] = useState(false)
  
  const location = useLocation().pathname

  const showSearch = () => {
    return !location.includes('product')
  }

  const updateCategory = (category: string | null):void => {
    setSelectedCategory(prevState => {
      return prevState !== category ? category : null
    })
  }

  useEffect(() => {
    searchData || selectedCategory ? setClearAllowed(true) : setClearAllowed(false)
    location.includes('favorites') 
    ? updateProducts(savedProducts, searchData, makeSnakeCase(selectedCategory))
    : updateProducts(allProducts, searchData, makeSnakeCase(selectedCategory))
  }, [searchData, selectedCategory, location])

  const clearSearch = () => {
    setSearchData('')
    setSelectedCategory(null)
    updateSearching(false)
  }

 return (
  <nav>
    <div className='top-nav'>
    <Link className='logo-link' to='/' onClick={clearSearch}><img src={logo} alt='Makeup 360 logo' /></Link>
      <div className='small-screen-flex'>
        {!loading && showSearch() && <input className='search' type='search' placeholder='Search for a brand...' value={searchData} onChange={(e) => setSearchData(e.target.value)}/>}
        {!location.includes("favorites") &&  <Link onClick={clearSearch} className='favorites' to='/favorites'><img src={unfavorite} alt='view favorites link' /></Link>}
      </div>
    </div>
    <div className='bottom-nav'>
      {!loading && showSearch() && <CategoryContainer selectedCategory={selectedCategory} updateCategory={updateCategory} />}
      {clearAllowed && showSearch() && <button className='clear-search' onClick={clearSearch}><img src={cancel} alt='clear search button' /></button>}
    </div>
  </nav>
 )
}

export default NavBar