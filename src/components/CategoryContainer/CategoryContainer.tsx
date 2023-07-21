import './CategoryContainer.css'
import Category from "../Category/Category"
import back from '../../images/back-arrow.png'
import forward from '../../images/forward-arrow.png'
import { useEffect } from 'react'

interface CategoryContainerProps {
  selectedCategory: string | null ,
  updateCategory: (category: string | null) => void
}

const CategoryContainer = ({selectedCategory, updateCategory}: CategoryContainerProps) => {
  const categories: string[] = ['Blush', 'Bronzer', 'Eyebrow', 'Eyeliner', 'Eyeshadow', 'Foundation', 'Lip liner', 'Lipstick', 'Mascara', 'Nail polish']
  const categoryElements = categories.map(category => <Category key={category} category={category} selected={selectedCategory === category ? true : false} updateCategory={updateCategory}/>)

  useEffect(() => {
    const scroll = (amount: number) => {
      document.querySelector('.category-container')?.scrollBy({
        top: 0,
        left: amount,
        behavior: "smooth",
      })
    }

    document.querySelector('.left-scroll-btn')?.addEventListener('click', () => scroll(-200))
    document.querySelector('.right-scroll-btn')?.addEventListener('click', () => scroll(200))
  
    return () => {
      document.querySelector('.left-scroll-btn')?.removeEventListener('click', () => scroll(-200))
      document.querySelector('.right-scroll-btn')?.removeEventListener('click', () => scroll(200))
    }
  }, [])

  return (
    <section className='scroll-area'>
      <button className='left-scroll-btn'><img src={back} alt='back button'/></button>
      <section className="category-container">
        {categoryElements}
      </section>
      <button className='right-scroll-btn'><img src={forward} alt='back button'/></button>
    </section>
  )
}

export default CategoryContainer