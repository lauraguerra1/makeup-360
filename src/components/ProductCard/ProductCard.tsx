import './ProductCard.css'
import { Link, useLocation } from 'react-router-dom';
import fiveStars from '../../images/stars.png'

interface ProductCardProps {
  searching: boolean
  image: string
  brand: string
  name: string
  tags: string[]
  id: number
}

const ProductCard = (props: ProductCardProps) => {
  const location = useLocation().pathname
  const mainTags = ['Vegan', 'Organic', 'cruelty free']
  const tags = props.tags.filter(tag => mainTags.some(main => main === tag))
  const tagEls = tags.map(tag => {
    return <p className='product-tags' key={tag}>{tag}</p>
  })

  return (
    <Link className={!location.includes('favorites') && !location.includes('product') && !props.searching ? 'featured-card product-card' : 'product-card'}to={`/product/${props.id}`} >
      <div className="tags-container">
        {tagEls}
      </div>
      <div className='image-container'>
        <img className='product-img' src={props.image} id={props.id.toString()} alt={props.name}/>
      </div>
      <h2 className='product-brand'>{props.brand}</h2>
      <p className='product-name'>{props.name.replace('&trade;', '\u2122')}</p>
      {!location.includes('favorites') && !location.includes('product') && !props.searching && <img className='five-stars' src={fiveStars} alt='five star rating'/>}
    </Link>
  )
}

export default ProductCard