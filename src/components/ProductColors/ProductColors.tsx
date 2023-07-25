import React from 'react';
import { ProductColor } from '../../apiTypes';
import './ProductColors.css'

interface ProductColorsProps {
  hexColors: ProductColor[];
}
const ProductColors = ({hexColors}: ProductColorsProps) => {
  console.log(hexColors)
  
  return (
    <div className="circle-container">
      {hexColors.map((hexColor) => (
        <div
          key={hexColor.hex_value}
          className="circle"
          style={{
            backgroundColor: hexColor.hex_value.split(',')[0],
            height: '30px',
            width: '30px',
            borderRadius: '50%',
            margin: '0.5%'
          }}
        ></div>
      ))}
    </div>
  );
};

export default ProductColors;