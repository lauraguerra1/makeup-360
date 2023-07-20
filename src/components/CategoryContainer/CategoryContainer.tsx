import './CategoryContainer.css'
import Category from "../Category/Category"
interface CategoryContainerProps {
  selectedCategory: string | null ,
  updateCategory: (category: string | null) => void
}

const CategoryContainer = ({selectedCategory, updateCategory}: CategoryContainerProps) => {
  const categories: string[] = ['Blush', 'Bronzer', 'Eyebrow', 'Eyeliner', 'Eyeshadow', 'Foundation', 'Lip liner', 'Lipstick', 'Mascara', 'Nail polish']
  const categoryElements = categories.map(category => <Category category={category} selected={selectedCategory === category ? true : false} updateCategory={updateCategory}/>)

  return (
    <section className="category-container">
      {categoryElements}
    </section>
  )
}

export default CategoryContainer