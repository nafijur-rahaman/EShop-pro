import React, { useState } from 'react';
import { Star, Minus, Plus, Heart, Share2, ChevronDown, ChevronUp, Ruler, Truck, Shield } from 'lucide-react';

const ProductDetails = () => {
  // Mock Data
  const product = {
    id: 1,
    title: "The Merino Wool Structured Coat",
    price: 350.00,
    rating: 4.8,
    reviews: 124,
    description: "Expertly crafted from Italian merino wool, this structured coat defines modern elegance. Featuring a tailored silhouette, notch lapels, and a sustainable viscose lining for effortless layering.",
    colors: [
      { name: 'Camel', hex: '#C19A6B' },
      { name: 'Midnight', hex: '#191970' },
      { name: 'Charcoal', hex: '#36454F' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1515347619252-60a6bf4fffce?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&q=80&w=800"
    ]
  };

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [openAccordion, setOpenAccordion] = useState('details'); // 'details', 'shipping', 'care'

  const handleQuantity = (type) => {
    if (type === 'dec' && quantity > 1) setQuantity(quantity - 1);
    if (type === 'inc' && quantity < 5) setQuantity(quantity + 1);
  };

  const toggleAccordion = (section) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <div className="bg-white font-sans text-neutral-900 pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="text-sm text-neutral-500 mb-8 flex items-center gap-2">
          <a href="/" className="hover:text-black transition-colors">Home</a> / 
          <a href="/shop" className="hover:text-black transition-colors">Outerwear</a> / 
          <span className="text-black font-medium">The Merino Coat</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: Image Gallery (Vertical Stack or Grid on Desktop) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Main Active Image */}
            <div className="aspect-[3/4] bg-neutral-100 w-full overflow-hidden relative group">
              <img 
                src={product.images[activeImage]} 
                alt={product.title} 
                className="w-full h-full object-cover"
              />
              {/* Zoom Hint (Optional) */}
              <div className="absolute top-4 right-4 bg-white/80 backdrop-blur px-3 py-1 text-xs font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Hover to Zoom
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`aspect-[3/4] bg-neutral-100 overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-neutral-900 opacity-100' : 'border-transparent opacity-70 hover:opacity-100'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Product Info (Sticky) */}
          <div className="lg:col-span-5 relative">
            <div className="lg:sticky lg:top-24 space-y-8">
              
              {/* Header */}
              <div className="space-y-4 border-b border-neutral-200 pb-6">
                <div className="flex justify-between items-start">
                  <h1 className="text-3xl font-bold tracking-tight leading-tight">
                    {product.title}
                  </h1>
                  <button className="text-neutral-400 hover:text-red-500 transition-colors">
                    <Heart size={24} />
                  </button>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-medium">${product.price.toFixed(2)}</span>
                  <div className="flex items-center gap-1 text-sm text-neutral-500 border-l border-neutral-300 pl-4">
                    <Star size={16} className="fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-black">{product.rating}</span>
                    <span className="underline cursor-pointer hover:text-black">({product.reviews} Reviews)</span>
                  </div>
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <span className="text-sm font-medium text-neutral-500">Color: <span className="text-black">{selectedColor.name}</span></span>
                <div className="flex gap-3 mt-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${selectedColor.name === color.name ? 'border-neutral-900' : 'border-transparent hover:border-neutral-300'}`}
                    >
                      <div 
                        className="w-8 h-8 rounded-full border border-neutral-200 shadow-sm"
                        style={{ backgroundColor: color.hex }} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-neutral-500">Size: <span className="text-black">{selectedSize}</span></span>
                  <button className="flex items-center gap-1 text-xs font-medium text-neutral-500 hover:text-black transition-colors underline">
                    <Ruler size={14} /> Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 text-sm font-medium border transition-all ${
                        selectedSize === size 
                          ? 'border-neutral-900 bg-neutral-900 text-white' 
                          : 'border-neutral-200 text-neutral-600 hover:border-neutral-900 hover:text-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {/* Low Stock Indicator */}
                {selectedSize === 'M' && (
                  <p className="text-xs text-red-600 font-medium mt-2 animate-pulse">
                    High demand! Only 3 items left in this size.
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="space-y-4 pt-4">
                <div className="flex gap-4">
                  {/* Quantity Counter */}
                  <div className="flex items-center border border-neutral-300 w-32 justify-between px-4 py-3.5">
                    <button onClick={() => handleQuantity('dec')} className="text-neutral-500 hover:text-black"><Minus size={16} /></button>
                    <span className="font-medium">{quantity}</span>
                    <button onClick={() => handleQuantity('inc')} className="text-neutral-500 hover:text-black"><Plus size={16} /></button>
                  </div>
                  
                  {/* Add to Cart */}
                  <button className="flex-1 bg-neutral-900 text-white font-medium hover:bg-black transition-colors py-3.5 shadow-lg">
                    Add to Cart - ${(product.price * quantity).toFixed(2)}
                  </button>
                </div>
                <p className="text-center text-xs text-neutral-500">Free 3-5 day shipping • 30-day returns</p>
              </div>

              {/* Accordions (Details) */}
              <div className="border-t border-neutral-200 pt-6 space-y-1">
                {/* Description Item */}
                <div className="border-b border-neutral-200">
                  <button onClick={() => toggleAccordion('details')} className="flex justify-between items-center w-full py-4 text-left">
                    <span className="font-medium text-sm">Description</span>
                    {openAccordion === 'details' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {openAccordion === 'details' && (
                    <div className="pb-4 text-sm text-neutral-600 leading-relaxed animate-fade-in">
                      {product.description}
                      <ul className="list-disc pl-5 mt-3 space-y-1 text-neutral-500">
                        <li>100% Merino Wool</li>
                        <li>Slim fit, take your normal size</li>
                        <li>Model is 6'1" and wearing size M</li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Delivery Item */}
                <div className="border-b border-neutral-200">
                  <button onClick={() => toggleAccordion('shipping')} className="flex justify-between items-center w-full py-4 text-left">
                    <span className="font-medium text-sm flex items-center gap-2"><Truck size={16} /> Shipping & Returns</span>
                    {openAccordion === 'shipping' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {openAccordion === 'shipping' && (
                    <div className="pb-4 text-sm text-neutral-600 leading-relaxed">
                      We offer free standard shipping on all orders over $200. Returns are accepted within 30 days of purchase.
                    </div>
                  )}
                </div>

                 {/* Care Item */}
                 <div className="border-b border-neutral-200">
                  <button onClick={() => toggleAccordion('care')} className="flex justify-between items-center w-full py-4 text-left">
                    <span className="font-medium text-sm flex items-center gap-2"><Shield size={16} /> Fabric & Care</span>
                    {openAccordion === 'care' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {openAccordion === 'care' && (
                    <div className="pb-4 text-sm text-neutral-600 leading-relaxed">
                      Dry clean only. Do not bleach. Iron on low heat if necessary. Store in a cool, dry place.
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
        
        {/* Recommendation Section */}
        <div className="mt-32">
          <h2 className="text-2xl font-bold mb-8">Complete the Look</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
             {/* Mock Items */}
             {[1, 2, 3, 4].map((item) => (
                <div key={item} className="group cursor-pointer">
                  <div className="aspect-[3/4] bg-neutral-100 mb-3 overflow-hidden">
                     <img 
                       src={`https://images.unsplash.com/photo-${item === 1 ? '1591047139829-d91aecb6caea' : item === 2 ? '1521572163474-6864f9cf17ab' : '1473966968600-fa801b869a1a'}?auto=format&fit=crop&w=400`} 
                       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                       alt="Related"
                     />
                  </div>
                  <h4 className="text-sm font-medium">Essential Piece {item}</h4>
                  <p className="text-xs text-neutral-500">$120.00</p>
                </div>
             ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;