import { useState, useEffect } from "react"
import CategoryContainer from "../CategoryContainer/CategoryContainer"
import { Product } from "../../apiTypes"
import { makeSnakeCase } from "../../helpers"

interface FormProps {
  products: Product[]
  updateProducts: (brand: string, type: string | null) => void 
}

const Form = ({products, updateProducts}: FormProps) => {
  const [searchData, setSearchData] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  
  const updateCategory = (category: string | null):void => {
    setSelectedCategory(prevState => {
      return prevState !== category ? category : null
    })
  }

  useEffect(() => {
    console.log('snakecase', makeSnakeCase(selectedCategory))
   const filter = products.filter(p => p.product_type === makeSnakeCase(selectedCategory))
    console.log('product by type', filter)
   updateProducts(searchData, makeSnakeCase(selectedCategory))
  }, [searchData, selectedCategory])

  return (
    <form>
      <input type='search' placeholder='Search for brand...' value={searchData} onChange={(e) => setSearchData(e.target.value)}/>
      <CategoryContainer selectedCategory={selectedCategory} updateCategory={updateCategory} />
    </form>
  )
}

export default Form