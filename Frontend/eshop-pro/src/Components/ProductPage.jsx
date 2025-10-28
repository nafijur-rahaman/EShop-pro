import React, { useState } from 'react';

// Mock Product Data for a professional item (e.g., a premium backpack)
const mockProduct = {
  name: "The Voyager Pro Backpack",
  tagline: "Engineered for excellence. Designed for the road.",
  price: 249.99,
  description: "Crafted from durable, water-resistant ballistic nylon, the Voyager Pro features dedicated, padded compartments for a 16-inch laptop and a tablet. It includes an integrated USB charging port and a smart luggage strap, making it essential for seamless business travel and daily commuting.",
  features: [
    { name: "Material", detail: "Ballistic Nylon (Water Resistant)" },
    { name: "Capacity", detail: "28 Liters" },
    { name: "Laptop Size", detail: "Up to 16 inches" },
    { name: "Feature", detail: "Integrated USB-C Charging Port" },
    { name: "Weight", detail: "1.5 kg" },
  ],
  variants: [
    { id: 1, color: 'Obsidian Black', hex: '#1e293b', image: 'https://placehold.co/800x600/1e293b/ffffff?text=Obsidian+Black' },
    { id: 2, color: 'Slate Grey', hex: '#64748b', image: 'https://placehold.co/800x600/64748b/ffffff?text=Slate+Grey' },
    { id: 3, color: 'Deep Navy', hex: '#0f172a', image: 'https://placehold.co/800x600/0f172a/ffffff?text=Deep+Navy' },
  ]
};

// Main App Component
const ProductPage = () => {
  const [selectedVariant, setSelectedVariant] = useState(mockProduct.variants[0]);
  const [mainImage, setMainImage] = useState(mockProduct.variants[0].image);

  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
    setMainImage(variant.image);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  // Icon for Checkmark (Lucide-react fallback using SVG)
  const CheckIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto shadow-2xl bg-white rounded-xl overflow-hidden">
        
        {/* Product Grid Layout */}
        <div className="md:grid md:grid-cols-2 gap-10 p-4 sm:p-10 lg:p-16">
          
          {/* ----- Left Column: Image Gallery ----- */}
          <div className="space-y-6">
            
            {/* Main Product Image */}
            <div className="bg-gray-100 rounded-xl overflow-hidden shadow-lg border-4 border-gray-100 transition duration-500 ease-in-out transform hover:scale-[1.01]">
              <img
                src={mainImage}
                alt={`${mockProduct.name} - ${selectedVariant.color}`}
                className="w-full h-auto object-cover aspect-square"
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x600/ccc/333?text=Image+Load+Error"; }}
              />
            </div>
            
            {/* Thumbnail/Variant Selector */}
            <div className="flex justify-center space-x-4 p-2 bg-gray-50 rounded-lg">
              {mockProduct.variants.map((variant) => (
                <div
                  key={variant.id}
                  className={`w-16 h-16 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    selectedVariant.id === variant.id ? 'ring-4 ring-indigo-600 ring-offset-2' : 'hover:ring-2 hover:ring-gray-300'
                  }`}
                  onClick={() => handleVariantSelect(variant)}
                >
                  <img
                    src={variant.image}
                    alt={variant.color}
                    className="w-full h-full object-cover rounded-md"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/64x64/aaa/fff?text=T"; }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ----- Right Column: Product Details & CTA ----- */}
          <div className="pt-8 md:pt-0 space-y-8">
            
            {/* Header & Pricing */}
            <div className="space-y-2 border-b pb-4 border-gray-100">
              <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
                {mockProduct.name}
              </h1>
              <p className="text-lg text-indigo-600 font-semibold">{mockProduct.tagline}</p>
              <p className="text-4xl font-bold text-gray-800 pt-2">
                {formatPrice(mockProduct.price)}
              </p>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-700">Overview</h3>
              <p className="text-gray-600 leading-relaxed">
                {mockProduct.description}
              </p>
            </div>

            {/* Variant Selector (Color) */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-gray-700">
                Color: <span className="font-normal text-gray-500">{selectedVariant.color}</span>
              </h3>
              <div className="flex space-x-3">
                {mockProduct.variants.map((variant) => (
                  <button
                    key={variant.id}
                    className={`w-10 h-10 rounded-full border-2 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-offset-2 ${
                      selectedVariant.id === variant.id
                        ? 'ring-indigo-600 border-white'
                        : 'border-gray-200 hover:ring-2 hover:ring-gray-300'
                    }`}
                    style={{ backgroundColor: variant.hex }}
                    onClick={() => handleVariantSelect(variant)}
                    aria-label={`Select color ${variant.color}`}
                  >
                    {selectedVariant.id === variant.id && (
                      <CheckIcon className="w-5 h-5 mx-auto text-white drop-shadow-lg" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Call to Action (CTA) */}
            <div className="space-y-4">
              <button
                className="w-full px-8 py-4 bg-blue-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-indigo-200 hover:bg-blue-700 transition duration-300 transform hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
                onClick={() => console.log(`Adding ${selectedVariant.color} ${mockProduct.name} to cart`)}
              >
                Add to Cart
              </button>
              <button
                className="w-full px-8 py-4 bg-white text-blue-600 font-semibold text-lg rounded-xl border border-blue-600 hover:bg-blue-50 transition duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
                onClick={() => alert('Proceeding to Checkout... (In a real app, this would use a modal)')}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* ----- Key Specifications Section (Bottom Full Width) ----- */}
        <div className="bg-gray-100 p-8 sm:p-16 border-t border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Key Specifications</h2>
          <dl className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-6 gap-x-8">
            {mockProduct.features.map((feature, index) => (
              <div key={index} className="space-y-1">
                <dt className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  {feature.name}
                </dt>
                <dd className="text-lg font-semibold text-gray-900">
                  {feature.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
