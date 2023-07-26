import { Product } from '../../apiTypes';
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
  //generate one product with image, Brand, tags, and Name 
  //this is just on little card 

  return (
    <div className='product-card'>
      <div className='image-container'>
        <Link to={`/product/${props.id}`} >
          <img className='product-img' src={props.image} id={props.id.toString()} alt={props.name}/>
        </Link>
      </div>
      <h2 className='product-brand'>{props.brand}</h2>
      <p className='product-name'>{props.name}</p>
      <p className='product-tags'>tags: {props.tags}</p>
    </div>
  )
}

export default ProductCard