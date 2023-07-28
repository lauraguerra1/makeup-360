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
  const mainTags = ['Vegan', 'Organic', 'cruelty free']
  const tags = props.tags.filter(tag => mainTags.some(main => main === tag))
  const tagEls = tags.map(tag => {
    return <p className='product-tags' key={tag}>{tag}</p>
  })

  return (
    <Link className='product-card' to={`/product/${props.id}`} >
      <div className="tags-container">
        {tagEls}
      </div>
      <div className='image-container'>
        <img className='product-img' src={props.image} id={props.id.toString()} alt={props.name}/>
      </div>
      <h2 className='product-brand'>{props.brand}</h2>
      <p className='product-name'>{props.name.replace('&trade;', '\u2122')}</p>
    </Link>
  )
}

export default ProductCard