import './Category.css'

interface CategoryProps {
  category: string
  updateCategory: (category: string | null) => void
  selected: boolean
}

const Category = ({category, selected, updateCategory}: CategoryProps) => {

  return (
    <section onClick={() => updateCategory(category)} className={selected ? 'filled': 'empty'}>
      {category}
    </section>
  )
}

export default Category