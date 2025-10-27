export interface Product {
  id: string;
  brand: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  images: string[];
  sizes: string[];
  category: string;
  subCategory: string;
  productType: string[];
  trend: string[];
  trendType: string;
  fabric: string;
  pattern: string;
  fit: string;
  productCode: string;
  originCountry: string;
  manufacturedBy: string;
  inStock: boolean;
  variant?: string;
}

export const products: Product[] = [
  {
    id: '1',
    brand: 'The Bear House',
    name: 'Starc',
    description: 'Oversized fit shirt with fluidic fabric, featuring iconic Nirvana graphics',
    price: 998,
    originalPrice: 2299,
    discount: 57,
    images: ['/products/starc.webp'], // User will provide actual images
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Top Wear',
    subCategory: 'Hoodies & Sweatshirts',
    productType: ['Printed', 'Oversized', 'Casual'],
    trend: ['Opium', 'Graphic'],
    trendType: 'Hot',
    fabric: 'Fluidic',
    pattern: 'Graphics',
    fit: 'Relaxed Fit',
    productCode: 'SWE-STARC-BK-S',
    originCountry: 'India',
    manufacturedBy: 'Bear House Clothing Private Limited',
    inStock: true,
    variant: 'Black'
  },
  {
    id: '2',
    brand: 'Pronk',
    name: 'Classic White Oversized Tee',
    description: 'Minimalist white oversized t-shirt for everyday comfort',
    price: 699,
    originalPrice: 1299,
    discount: 46,
    images: ['/products/white-tee.jpg'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Top Wear',
    subCategory: 'T-Shirts',
    productType: ['Casual', 'Oversized', 'Basic'],
    trend: ['Minimalist', 'Classic'],
    trendType: 'Evergreen',
    fabric: 'Cotton',
    pattern: 'Solid',
    fit: 'Oversized Fit',
    productCode: 'TU-TEE-001-WHT-S-456',
    originCountry: 'India',
    manufacturedBy: 'Pronk, Unito Retail Pvt. Ltd., 12th floor, Room no.14, Chatterjee International Centre Building, 33 A, J L Nehru Road, Kolkata700071, West Bengal',
    inStock: true,
    variant: 'White'
  },
  {
    id: '3',
    brand: 'Pronk',
    name: 'Graphic Print Oversized Shirt',
    description: 'Bold graphics on comfortable oversized shirt',
    price: 1199,
    originalPrice: 1999,
    discount: 40,
    images: ['/products/graphic-shirt.jpg'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Top Wear',
    subCategory: 'Shirts',
    productType: ['Printed', 'Oversized', 'Statement'],
    trend: ['Y2K', 'Graphic'],
    trendType: 'Trending',
    fabric: 'Fluidic',
    pattern: 'Prints',
    fit: 'Oversized Fit',
    productCode: 'TU-SHR-025-BLK-M-789',
    originCountry: 'India',
    manufacturedBy: 'Pronk, Unito Retail Pvt. Ltd., 12th floor, Room no.14, Chatterjee International Centre Building, 33 A, J L Nehru Road, Kolkata700071, West Bengal',
    inStock: true,
    variant: 'Multicolor'
  },
  {
    id: '4',
    brand: 'Pronk',
    name: 'Denim Oversized Shirt',
    description: 'Casual denim shirt with oversized fit for ultimate comfort',
    price: 1499,
    originalPrice: 2499,
    discount: 40,
    images: ['/products/denim-shirt.jpg'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Top Wear',
    subCategory: 'Shirts',
    productType: ['Denim', 'Oversized', 'Casual'],
    trend: ['Classic', 'Denim'],
    trendType: 'Evergreen',
    fabric: 'Denim',
    pattern: 'Solid',
    fit: 'Oversized Fit',
    productCode: 'TU-DNM-001-BLU-M-321',
    originCountry: 'India',
    manufacturedBy: 'Pronk, Unito Retail Pvt. Ltd., 12th floor, Room no.14, Chatterjee International Centre Building, 33 A, J L Nehru Road, Kolkata700071, West Bengal',
    inStock: true,
    variant: 'Blue'
  }
];

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

