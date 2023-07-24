import { Product } from '../../apiTypes';
import './ProductCard.css'
import { Link } from 'react-router-dom';

type ProductCardProps = {
  image: string
  brand: string
  name: string
  tags: string[]
  id: number
}

const ProductCard = (props: ProductCardProps) => {
  //generate one product with image, Brand, tags, and Name 
  //this is just on little card 
  console.log(typeof props.id, 'this should be a number in theory lol')
  return (
    <div className='product-card'>
      <div className='image-container'>
        <Link to={`/product/${props.id}`} >
          <img src={props.image} className='product-image' id={props.id.toString()}/>
        </Link>
      </div>
      <h2 className='product-name'>{props.name}</h2>
      <h3 className='product-brand'>{props.brand}</h3>
      <p className='product-tags'>tags: {props.tags}</p>
    </div>
  )
}

export default ProductCard