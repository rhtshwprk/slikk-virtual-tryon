'use client';

import Link from 'next/link';
import { products } from '@/lib/data';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 px-2 py-1 rounded">
              <span className="text-white text-xs font-bold">⚡60 MIN</span>
            </div>
            <span className="text-xl font-bold">Pronk</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-2xl">🔍</span>
            <span className="text-2xl">♡</span>
          </div>
        </div>
      </header>

      {/* Product Grid */}
      <div className="px-4 py-6">
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <Link 
              key={product.id} 
              href={`/products/${product.id}`}
              className="block"
            >
              <div className="bg-gray-50 rounded-lg overflow-hidden">
                <div className="relative aspect-square">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/300x300?text=Product+Image';
                    }}
                  />
                  {!product.inStock && (
                    <div className="absolute top-2 right-2 bg-black text-white px-2 py-1 text-xs rounded">
                      Out of Stock
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-xs text-gray-600 mb-1">{product.brand}</p>
                  <p className="text-sm font-semibold mb-2 line-clamp-2">{product.name}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-base font-bold">₹{product.price}</span>
                    <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 text-xs font-semibold rounded">
                      {product.discount}% OFF
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
