import './ProductCard.css'
import { Link } from 'react-router-dom';


interface ProductCardProps {
  image: string
  brand: string
  name: string
  tags: string[]
  id: number
}

const ProductCard = (props: ProductCardProps) => {
  return (
    <div className='product-card'>
      <div className='image-container'>
        <Link to={`/product/${props.id}`} >
          <img className='product-img' src={props.image} id={props.id.toString()} alt={props.name}/>
        </Link>
      </div>
      <h2 className='product-brand'>{props.brand}</h2>
      <p className='product-name'>{props.name.replace('&trade;', '\u2122')}</p>
      {props.tags.length ? (
        <p className='product-tags'>tags: {props.tags.join(', ')}</p>
        ) : null }

    </div>
  )
}

export default ProductCard