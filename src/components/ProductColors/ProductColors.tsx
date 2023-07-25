import React from 'react';
import { ProductColor } from '../../apiTypes';

interface ProductColorsProps {
  hexColors: ProductColor[];
}

const ProductColors = ({hexColors}: ProductColorsProps) => {

  return (
    <div className="circle-container">
      {hexColors.map((hexColor) => (
        <div
          key={hexColor.hex_value}
          className="circle"
          style={{
            backgroundColor: hexColor.hex_value,
            height: '30px',
            width: '30px',
            borderRadius: '50%'
          }}
        ></div>
      ))}
    </div>
  );
};

export default ProductColors;