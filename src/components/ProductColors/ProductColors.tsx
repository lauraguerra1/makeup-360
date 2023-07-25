import React from 'react';

interface HexColorObject {
  hex_value: string;
  colour_name: string;
}

interface ProductColorsProps {
  hexColors: HexColorObject[];
}

const ProductColors: React.FC<ProductColorsProps> = ({ hexColors }) => {
  return (
    <div className="circle-container">
      {hexColors.map((hexColor) => (
        <div
          key={hexColor.hex_value}
          className="circle"
          style={{ backgroundColor: hexColor }}
        ></div>
      ))}
    </div>
  );
};

export default ProductColors;