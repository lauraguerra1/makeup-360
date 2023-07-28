import './Category.css'

interface CategoryProps {
  category: string
  updateCategory: (category: string | null) => void
  selected: boolean
}

const Category = ({category, selected, updateCategory}: CategoryProps) => {

  return (
    <button onClick={() => updateCategory(category)} className={selected ? 'filled category': 'empty category'}>
      {category}
    </button>
  )
}

export default Category