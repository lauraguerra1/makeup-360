import React from 'react';

// interface ProductColor {
//   hex_value: string;
//   colour_name: string;
// }

// interface ProductColorsProps {
//   hexColors: ProductColor[];
// }

const ProductColors = () => {

  const hexColors = [
    {
        "hex_value": "#966A54",
        "colour_name": "Sahara"
    },
    {
        "hex_value": "#6B7475",
        "colour_name": "Evrest"
    },
    {
        "hex_value": "#444446",
        "colour_name": "Casablanca"
    }
]

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