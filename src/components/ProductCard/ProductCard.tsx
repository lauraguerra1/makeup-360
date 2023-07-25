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
          <img src={props.image} className='product-image' id={props.id.toString()} alt={props.name}/>
        </Link>
      </div>
      <h2 className='product-name'>{props.name}</h2>
      <h3 className='product-brand'>{props.brand}</h3>

      {props.tags.length > 0 ? (
        <p className='product-tags'>tags: {props.tags}</p>
        ) : null }

    </div>
  )
}

export default ProductCard