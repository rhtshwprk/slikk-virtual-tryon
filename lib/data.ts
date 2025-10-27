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
    brand: 'THE SOULED STORE',
    name: 'Tropical Beat',
    description: 'Minimalist white oversized t-shirt for everyday comfort',
    price: 1169,
    originalPrice: 1299,
    discount: 10,
    images: ['/products/tss.webp'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Top Wear',
    subCategory: 'Shirts',
    productType: ['Casual', 'Relaxed', 'Basic'],
    trend: ['Hot', 'Classic'],
    trendType: 'Hot',
    fabric: 'Cotton',
    pattern: 'Printed',
    fit: 'Relaxed Fit',
    productCode: '254656',
    originCountry: 'India',
    manufacturedBy: 'The Souled Store, Survey Nos. 682,69,701,702,703A,708B,711A,711B,K Square Industrial Park, before Padgha Toll Naka,Nashik Mumbai Highway, after Pushkar Mela Hotel,Kurund Village Bhiwandi, Maharashtra 421101',
    inStock: true,
    variant: 'Orange'
  },
  {
    id: '3',
    brand: 'THE SOULED STORE',
    name: 'The Tailed Beast',
    description: 'Naruto inspired graphics on a comfortable t-shirt',
    price: 649,
    originalPrice: 1499,
    discount: 57,
    images: ['/products/naruto.webp'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Top Wear',
    subCategory: 'T-Shirts',
    productType: ['Printed', 'Oversized'],
    trend: ['Y2K', 'Graphic'],
    trendType: 'Trending',
    fabric: 'Cotton',
    pattern: 'Printed',
    fit: 'Oversized Fit',
    productCode: '285078',
    originCountry: 'India',
    manufacturedBy: 'The Souled Store, Survey Nos. 682,69,701,702,703A,708B,711A,711B,K Square Industrial Park, before Padgha Toll Naka,Nashik Mumbai Highway, after Pushkar Mela Hotel,Kurund Village Bhiwandi, Maharashtra 421101',
    inStock: true,
    variant: 'Off White'
  },
  {
    id: '4',
    brand: 'SOJANYA',
    name: 'Floral Printed Kurta',
    description: 'SOJANYA Floral Printed Regular Kurta & Churidar With Nehru Jacket',
    price: 2639,
    originalPrice: 5998,
    discount: 56,
    images: ['/products/kurta.webp'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Ethnic & Fusion Wear',
    subCategory: 'Kurta Sets',
    productType: ['Printed'],
    trend: ['Classic'],
    trendType: 'Evergreen',
    fabric: 'Silk Blend',
    pattern: 'Embroidered',
    fit: 'Straight Fit',
    productCode: 'V-SJR-SlkPrnt-48027-Py01-NJ-Daman-82-Blk-42',
    originCountry: 'India',
    manufacturedBy: 'Shri Ram Enterprises',
    inStock: true,
    variant: 'Green'
  }
];

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

