'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { getProductById } from '@/lib/data';

// Floating dots loader component
const FloatingDotsLoader = () => (
  <div className="flex items-center justify-center space-x-2 py-12">
    <div className="w-3 h-3 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    <div className="w-3 h-3 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
    <div className="w-3 h-3 bg-black rounded-full animate-bounce"></div>
  </div>
);

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const product = getProductById(productId);

  const [selectedSize, setSelectedSize] = useState('S');
  const [showTryOn, setShowTryOn] = useState(false);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [tryOnResult, setTryOnResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'specifications' | 'description'>('specifications');
  const [showTryOnModal, setShowTryOnModal] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Product not found</p>
      </div>
    );
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setUserImage(result);
    };
    reader.readAsDataURL(file);
  };

  const handleTryOn = async () => {
    if (!userImage) {
      alert('Please upload your image first');
      return;
    }

    setLoading(true);
    setTryOnResult(null);

    try {
      // Convert product image to base64
      const productImageResponse = await fetch(product.images[0]);
      const productImageBlob = await productImageResponse.blob();
      const productImageBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          resolve(result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(productImageBlob);
      });

      const response = await fetch('/api/virtual-tryon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personImage: userImage,
          productImage: productImageBase64,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate virtual try-on');
      }

      if (data.predictions && data.predictions.length > 0) {
        const resultBase64 = `data:${data.predictions[0].mimeType || 'image/png'};base64,${data.predictions[0].bytesBase64Encoded}`;
        setTryOnResult(resultBase64);
        setShowTryOn(true);
        setShowTryOnModal(false);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Error:', errorMessage);
      alert('Failed to generate try-on. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className='flex gap-2 items-center'>
          <button onClick={() => router.back()} className="text-lg text-black">
            ←
          </button>
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 px-2 py-1 rounded">
              <span className="text-white text-xs font-bold">⚡60 MIN</span>
            </div>
          </div>
          <div className="font-bold text-black">{product.brand}</div>
          </div>
          <div className="flex items-center gap-4">
            <FontAwesomeIcon icon={faSearch} className="text-xl text-black" />
            <FontAwesomeIcon icon={faHeart} className="text-xl text-black" />
          </div>
        </div>
      </header>

      {/* Product Image Carousel */}
      <div className="relative">
        <div className="relative aspect-4/5 bg-gray-100">
          {product?.images?.[0] && (
            <img
              src={tryOnResult || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/400x500?text=Product+Image';
              }}
            />
          )}

          {/* Virtual Try-On Button - Bottom Left Corner */}
          {tryOnResult ? (
            <button
              onClick={() => {
                setShowTryOn(false);
                setTryOnResult(null);
                setUserImage(null);
                setShowTryOnModal(true);
              }}
              className="absolute bottom-4 left-4 bg-green-600 text-white text-xs px-3 py-2 rounded font-semibold hover:bg-green-700 transition-colors"
            >
              Try Again
            </button>
          ) : (
            <button
              onClick={() => setShowTryOnModal(true)}
              className="absolute bottom-4 left-4 bg-black text-white text-xs px-3 py-2 rounded font-semibold hover:bg-gray-800 transition-colors"
            >
              VIRTUAL TRY-ON
            </button>
          )}
        </div>
      </div>

      {/* Product Details */}
      <div className="px-4 py-3 space-y-4">
        {/* Brand and Product Name */}
        <div>
          <p className="text-black text-lg font-bold">{product.brand}</p>
          <h1 className=" text-black">{product.name?.toUpperCase()}</h1>
        </div>

        {/* Price */}
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold text-black">₹{product.price}</span>
            <span className="font-bold text-sm text-gray-400 line-through">MRP ₹{product.originalPrice}</span>
            <span className="bg-green-100 text-green-700 px-3 text-xs font-bold rounded">
              {product.discount}% OFF
            </span>
          </div>
          <p className="text-xs text-gray-500">(Inclusive of all taxes)</p>
        </div>

        {/* Notify Me Button */}
        {!product.inStock && (
          <button className="w-full bg-black text-white py-4 font-semibold rounded">
            Notify me
          </button>
        )}

        {/* Size Selection */}
        <div>
          <p className="text-sm text-black font-semibold mb-1">SIZE</p>
          <div className="flex gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border rounded font-semibold ${
                  selectedSize === size
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black border-black'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-300">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('specifications')}
              className={`pb-2 font-semibold ${
                activeTab === 'specifications'
                  ? 'border-b-2 border-black text-black'
                  : 'text-gray-400'
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-2 font-semibold ${
                activeTab === 'description'
                  ? 'border-b-2 border-black text-black'
                  : 'text-gray-400'
              }`}
            >
              Description
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'specifications' && (
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Category:</span>
              <span className="font-semibold text-black">{product.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Sub Category:</span>
              <span className="font-semibold text-black">{product.subCategory}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Product Type:</span>
              <span className="font-semibold text-black">{product.productType.join(', ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Trend:</span>
              <span className="font-semibold text-black">{product.trend.join(', ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Trend Type:</span>
              <span className="font-semibold text-black">{product.trendType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Size:</span>
              <span className="font-semibold text-black">{selectedSize}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Fit:</span>
              <span className="font-semibold text-black">{product.fit}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Fabric:</span>
              <span className="font-semibold text-black">{product.fabric}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Pattern:</span>
              <span className="font-semibold text-black">{product.pattern}</span>
            </div>
          </div>
        )}

        {activeTab === 'description' && (
          <div>
            <p className="text-sm leading-relaxed text-gray-800">{product.description}</p>
          </div>
        )}

        {/* Product Code and Manufacturing */}
        <div className="pt-6 space-y-3 text-xs text-gray-600 border-t border-gray-200">
          <div>
            <p className="font-semibold mb-1">Product Code: {product.productCode}</p>
            <p>Origin Country: {product.originCountry}</p>
            <p className="mt-2">Manufactured By:</p>
            <p className="text-xs">{product.manufacturedBy}</p>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="px-4 py-6 bg-gray-50 mt-8">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <img src="/trust-badges/secure-payments.svg" alt="Secure Payments" className="w-12 h-12 mx-auto mb-1" />
            <p className="text-xs text-black font-medium">Secure Payments</p>
          </div>
          <div>
            <img src="/trust-badges/genuine-product.svg" alt="Genuine Product" className="w-12 h-12 mx-auto mb-1" />
            <p className="text-xs text-black font-medium">Genuine Product</p>
          </div>
          <div>
            <img src="/trust-badges/try-buy.svg" alt="Try & Buy" className="w-12 h-12 mx-auto mb-1" />
            <p className="text-xs text-black font-medium">Try & Buy</p>
          </div>
          <div>
            <img src="/trust-badges/7-day-return.svg" alt="7 Day Return" className="w-12 h-12 mx-auto mb-1" />
            <p className="text-xs text-black font-medium">7 Day Return</p>
          </div>
        </div>
      </div>

      {/* Virtual Try-On Modal */}
      {showTryOnModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-black">Virtual Try-On</h2>
              <button 
                onClick={() => setShowTryOnModal(false)}
                className="text-2xl text-gray-500 hover:text-black"
              >
                ×
              </button>
            </div>

            {!userImage ? (
              <label className="block w-full bg-black text-white py-3 px-4 text-center font-semibold rounded cursor-pointer hover:bg-gray-800">
                Upload Your Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            ) : (
              <>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-black mb-2">Your Photo</p>
                    <img src={userImage} alt="You" className="w-full h-48 object-cover rounded" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-black mb-2">Product</p>
                    <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover rounded" />
                  </div>
                </div>
                {loading ? (
                  <div className="bg-gray-50 rounded-lg p-8">
                    <div className="text-center mb-4">
                      <p className="text-sm font-semibold text-black mb-2">Generating your try-on...</p>
                      <p className="text-xs text-gray-600">This may take a moment</p>
                    </div>
                    <FloatingDotsLoader />
                  </div>
                ) : (
                  <>
                    <button 
                      onClick={handleTryOn}
                      disabled={loading}
                      className="w-full bg-black text-white py-3 px-4 text-center font-semibold rounded disabled:opacity-50 hover:bg-gray-800"
                    >
                      Generate Try-On
                    </button>
                    <label className="block text-center text-sm text-gray-600 underline cursor-pointer">
                      Change photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

