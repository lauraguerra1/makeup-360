import { Product } from '../../apiTypes';

type ProductCardProps = {
  image: string
  brand: string
  name: string
  tags: string[]
}

const ProductCard = (props: ProductCardProps) => {
  //generate one product with image, Brand, tags, and Name 
  //this is just on little card 
  return (
    <div className='product-card'>
      <img src={props.image} className='product-image'/>
      <h2 className='product-name'>{props.name}</h2>
      <h3 className='product-brand'>{props.brand}</h3>
      <p className='product-tags'>{props.tags}</p>
    </div>
  )
}

export default ProductCard