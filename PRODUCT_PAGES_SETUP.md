# Product Pages Setup

## What's Been Created

### 1. Data Structure (`lib/data.ts`)

- Dummy product data for 4 products
- TypeScript interfaces for type safety
- Helper function to get products by ID

### 2. Product List Page (`app/page.tsx`)

- Mobile-optimized product grid
- Header with branding and search/wishlist icons
- Product cards showing:
  - Product image
  - Brand name
  - Product name (truncated if too long)
  - Price with discount badge
  - Out of stock badge when applicable

### 3. Product Detail Page (`app/products/[id]/page.tsx`)

- Mobile-first design matching the provided layout
- **Header**: Back button, delivery badge (60 MIN), search and wishlist icons
- **Image Area**:
  - Product carousel functionality
  - "OVERSIZE FIT" badge overlay
  - Fabric specifications overlay at bottom of image
  - Try & Buy button with file upload
- **Product Details**:
  - Brand name and product title
  - Price with original MRP and discount badge
  - Size selector (XS, S, M, L, XL)
  - Tabbed content (Specifications/Description)
  - Product code, origin, and manufacturing details
- **Trust Badges**: Secure Payments, Genuine Product, Try & Buy, 7 Day Return
- **Virtual Try-On Integration**:
  - Upload your photo
  - Click "TRY & BUY" to generate AI-powered try-on
  - Result shows in the carousel
  - Can try another photo

## Features Implemented

### Virtual Try-On Flow

1. User clicks on a product
2. On the detail page, user can upload their photo
3. Click "TRY & BUY" button
4. API call is made to `/api/virtual-tryon`
5. Result image is displayed in the carousel
6. User can try another photo

### Layout Features

- Mobile-optimized design
- Sticky header
- Product image carousel
- Size selection
- Tabbed specifications/description
- Trust badges at bottom
- Responsive grid layout for product list

## Next Steps

### Add Product Images

1. Add your product images to `public/products/`:

   - `nirvana-shirt.jpg`
   - `white-tee.jpg`
   - `graphic-shirt.jpg`
   - `denim-shirt.jpg`

2. Update image paths in `lib/data.ts` if your filenames differ

### Add More Products

Edit `lib/data.ts` and add more products to the `products` array. Each product needs:

- id
- brand
- name
- price, originalPrice, discount
- images (array of image paths)
- sizes
- specifications (category, fabric, pattern, etc.)
- manufacturing details

### Product List Page Design

You mentioned you'll provide a design for the list of products. Once you have that design, we can update the layout in `app/page.tsx` to match your specific requirements.

## Running the App

```bash
npm run dev
```

Then navigate to:

- Homepage: http://localhost:3000 (product list)
- Product detail: http://localhost:3000/products/[id] (e.g., /products/1)

## API Configuration

Make sure you have the Google Cloud environment variables set:

```bash
export GOOGLE_CLOUD_PROJECT_ID="your-project-id"
```

And that you're authenticated:

```bash
gcloud auth login
```

## Notes

- All functionality is implemented except for actual image files
- The try-on feature requires authentication with Google Cloud
- The layout is mobile-first and optimized for mobile viewing
- Product list uses a 2-column grid
- Product detail page has scrollable content
