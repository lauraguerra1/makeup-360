import './ProductDetail.css';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../../apiTypes';
import ProductColors from '../ProductColors/ProductColors';
import favorite from '../../images/favorite.png';
import unfavorite from '../../images/unfavorite.png'

interface ProductDetailProps {
  allProducts: Product[]
  savedProducts: Product[]
  removeFromSavedProducts: (product:Product) => void
  addToSavedProducts: (newProduct:Product) => void
};

const ProductDetail = ({allProducts, savedProducts, removeFromSavedProducts, addToSavedProducts}: ProductDetailProps) => {

  const chosenProductID = useParams().id

  const findSingleProduct = (chosenProductID: string | undefined, productArray:Product[]) => {
    if(chosenProductID) {
      return productArray.find(product => {
        return product.id === parseInt(chosenProductID)
      })
    }
  }

  const chosenProductDetails = findSingleProduct(chosenProductID, allProducts)

  const savedProduct = findSingleProduct(chosenProductID, savedProducts)

  return (
    <div className='product-detail-card'>
      {chosenProductDetails ? (
        <div className='product-detail-container'>
            <div className='image-container'>
              <Link to={chosenProductDetails.product_link} >
                <img src={chosenProductDetails.api_featured_image} className='product-image' id={chosenProductDetails.id.toString()} alt={chosenProductDetails.name}/>
              </Link>
            </div>
            <aside className='details-aside'>
              <h3>{chosenProductDetails.brand}</h3>
              <h4>{chosenProductDetails.name.replace('&trade;', '\u2122')}</h4>

              {chosenProductDetails.description ? (
                <article className='product-description'>{chosenProductDetails.description.replace(/<[^>]*>/g, '')}</article>
                ) : <p>Sorry, no product details currently available.</p>}

              {chosenProductDetails.price !== '0.0' ? (
                <div className='product-price'>Price: ${parseInt(chosenProductDetails.price).toFixed(2)}</div>
                ) : null }

              <ProductColors hexColors={chosenProductDetails.product_colors}/>
              
              {chosenProductDetails.rating !== null ? (
                <div className='product-rating'>Rating: {chosenProductDetails.rating}</div>
                ) : null}

              <div className='buttons-container'>
                <Link to={chosenProductDetails.product_link} > 
                  <button className='website-link-button'>View On Product Website</button>
                </Link>
                <button className='save-button' onClick={savedProduct ? () => removeFromSavedProducts(savedProduct) : () => addToSavedProducts(chosenProductDetails)}><img src={savedProduct? unfavorite :favorite} alt='add to favorites' className='add-product-to-favorites'/></button>
              </div>
            </aside>
        </div>
      ) : (
        <div>Product not found</div>
      )}
    </div>
  )
};

export default ProductDetail;