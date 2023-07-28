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
    <Link className='product-card' to={`/product/${props.id}`} >
      <div className='image-container'>
          <img className='product-img' src={props.image} id={props.id.toString()} alt={props.name}/>
      </div>
      <h2 className='product-brand'>{props.brand}</h2>
      <p className='product-name'>{props.name.replace('&trade;', '\u2122')}</p>
      {props.tags.length ? (
        <p className='product-tags'>tags: {props.tags.join(', ')}</p>
        ) : null }
    </Link>
  )
}

export default ProductCard