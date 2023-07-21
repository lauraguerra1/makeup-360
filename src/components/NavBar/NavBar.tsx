import './NavBar.css'
import logo from '../../images/lipstick.png'
import Form from '../Form/Form'
import { Product } from '../../apiTypes'
import { useEffect, useState } from 'react'

interface NavBarProps {
  loading: boolean
  products: Product[]
  updateProducts: (brand: string, type: string | null) => void 
}

const NavBar = ({loading, products, updateProducts}: NavBarProps) => {

 return (
  <nav>
    <img src={logo} alt="Makeup 360 logo"/>
    {!loading && <Form products={products} updateProducts={updateProducts}/>}
  </nav>
 )
}

export default NavBar