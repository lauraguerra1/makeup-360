interface CategoryProps {
  category: string
  updateCategory: (category: string | null) => void
}

const Category = ({category, updateCategory}: CategoryProps) => {

  const handleClick = (category: string) => {

  }
  
  return (
    <section >
      {category}
    </section>
  )
}

export default Category