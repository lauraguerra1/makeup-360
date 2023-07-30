export type ProductColor = {
  hex_value: string;
  colour_name: string;
}

export type Product = {
  api_featured_image: string;
  brand: string;
  description: string;
  id: number;
  name: string;
  price: string;
  product_colors: ProductColor[];
  product_link: string;
  product_type: string;
  rating: number | null;
  tag_list: string[];
}

export type apiData = {
  api_featured_image: string;
  brand: string;
  category: string;
  created_at: string;
  currency: string;
  description: string;
  id: number;
  image_link: string;
  name: string;
  price: string;
  price_sign: string;
  product_api_url: string;
  product_colors: ProductColor[];
  product_link: string;
  product_type: string;
  rating: number | null;
  tag_list: string[];
  updated_at: string;
  website_link: string;
}
