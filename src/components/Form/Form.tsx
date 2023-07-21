import { useState } from "react"
import CategoryContainer from "../CategoryContainer/CategoryContainer"

const Form = () => {
  const [searchData, setSearchData] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  
  const updateCategory = (category: string | null):void => {
    setSelectedCategory(prevState => {
      return prevState !== category ? category : null
    })
  }

  return (
    <form>
      <input type='search' placeholder='Search for brand...' />
      <CategoryContainer selectedCategory={selectedCategory} updateCategory={updateCategory} />
    </form>
  )
}

export default Form