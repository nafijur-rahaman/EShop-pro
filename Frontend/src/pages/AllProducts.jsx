import React, { useState } from 'react';
import { Filter, ChevronDown, ChevronUp, X, ShoppingBag, Heart } from 'lucide-react';


const products = [
  { id: 1, name: 'Merino Wool Cardigan', price: 180, category: 'Tops', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=600', colors: ['#D2B48C', '#000000'] },
  { id: 2, name: 'Slim Fit Chinos', price: 120, category: 'Bottoms', image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=600', colors: ['#556B2F', '#F5F5DC'] },
  { id: 3, name: 'Leather Chelsea Boots', price: 250, category: 'Footwear', image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=600', colors: ['#3E2723', '#000000'] },
  { id: 4, name: 'Classic White Tee', price: 45, category: 'Tops', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600', colors: ['#FFFFFF', '#000000', '#000080'] },
  { id: 5, name: 'Structured Blazer', price: 320, category: 'Outerwear', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=600', colors: ['#000000', '#808080'] },
  { id: 6, name: 'Silk Scarf', price: 85, category: 'Accessories', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=600', colors: ['#FFC0CB', '#FFFFFF'] },
];

const filters = {
  categories: ['New Arrivals', 'Tops', 'Bottoms', 'Outerwear', 'Footwear', 'Accessories'],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  colors: [
    { name: 'Black', code: '#000000' },
    { name: 'White', code: '#FFFFFF' },
    { name: 'Navy', code: '#000080' },
    { name: 'Beige', code: '#F5F5DC' },
    { name: 'Olive', code: '#556B2F' },
  ]
};

const AllProducts = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [activeSort, setActiveSort] = useState('Featured');
  
  // Filter Sections State (Collapsible)
  const [openSections, setOpenSections] = useState({
    category: true,
    price: true,
    size: true,
    color: true
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="bg-white min-h-screen font-sans pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER & SORTING */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-neutral-200 pb-6">
          <div>
            <span className="text-neutral-500 text-sm">Home / Shop</span>
            <h1 className="text-3xl font-bold text-neutral-900 mt-2">All Products</h1>
          </div>
          
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            {/* Mobile Filter Toggle */}
            <button 
              className="md:hidden flex items-center gap-2 text-sm font-medium border border-neutral-300 px-4 py-2 rounded-full hover:bg-neutral-50"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <Filter size={16} /> Filters
            </button>

            {/* Desktop Sort */}
            <div className="relative group">
              <button className="flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-black">
                Sort by: {activeSort} <ChevronDown size={16} />
              </button>
              {/* Dropdown */}
              <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-neutral-100 shadow-xl rounded-lg py-2 hidden group-hover:block z-20">
                {['Featured', 'Newest', 'Price: Low to High', 'Price: High to Low'].map((opt) => (
                  <button 
                    key={opt}
                    onClick={() => setActiveSort(opt)}
                    className="block w-full text-left px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-black"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            
            <span className="text-sm text-neutral-500 hidden md:block">{products.length} Products</span>
          </div>
        </div>

        <div className="flex gap-12">
          
          {/* SIDEBAR FILTERS (Desktop) */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              
              {/* Categories */}
              <div className="border-b border-neutral-200 pb-6">
                <button onClick={() => toggleSection('category')} className="flex justify-between items-center w-full mb-4">
                  <h3 className="font-semibold text-sm uppercase tracking-wider">Category</h3>
                  {openSections.category ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openSections.category && (
                  <div className="space-y-2">
                    {filters.categories.map(cat => (
                      <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 border-neutral-300 rounded text-neutral-900 focus:ring-0" />
                        <span className="text-neutral-600 group-hover:text-black transition-colors text-sm">{cat}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Range */}
              <div className="border-b border-neutral-200 pb-6">
                <button onClick={() => toggleSection('price')} className="flex justify-between items-center w-full mb-4">
                  <h3 className="font-semibold text-sm uppercase tracking-wider">Price</h3>
                  {openSections.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openSections.price && (
                  <div className="flex gap-4 text-sm">
                     <input type="text" placeholder="$0" className="w-full border border-neutral-300 p-2 rounded" />
                     <span className="text-neutral-400 self-center">-</span>
                     <input type="text" placeholder="$1000" className="w-full border border-neutral-300 p-2 rounded" />
                  </div>
                )}
              </div>

              {/* Colors */}
              <div className="border-b border-neutral-200 pb-6">
                 <button onClick={() => toggleSection('color')} className="flex justify-between items-center w-full mb-4">
                  <h3 className="font-semibold text-sm uppercase tracking-wider">Colors</h3>
                  {openSections.color ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openSections.color && (
                  <div className="flex flex-wrap gap-3">
                    {filters.colors.map(color => (
                      <button 
                        key={color.name}
                        title={color.name}
                        className={`w-6 h-6 rounded-full border border-neutral-200 shadow-sm hover:scale-110 transition-transform ${color.name === 'White' ? 'bg-white' : ''}`}
                        style={{ backgroundColor: color.code }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Sizes */}
              <div>
                <button onClick={() => toggleSection('size')} className="flex justify-between items-center w-full mb-4">
                  <h3 className="font-semibold text-sm uppercase tracking-wider">Size</h3>
                  {openSections.size ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openSections.size && (
                  <div className="grid grid-cols-3 gap-2">
                    {filters.sizes.map(size => (
                      <button key={size} className="border border-neutral-200 py-2 text-sm text-neutral-600 hover:border-black hover:text-black transition-colors">
                        {size}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* PRODUCT GRID */}
          <main className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {products.map((product) => (
                <div key={product.id} className="group cursor-pointer">
                  {/* Image Area */}
                  <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden mb-4">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Hover Actions */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-white p-2 rounded-full shadow-md text-neutral-600 hover:text-red-500 transition-colors">
                        <Heart size={18} />
                      </button>
                    </div>

                    <button className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm text-neutral-900 py-4 font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-2 border-t border-neutral-100">
                      <ShoppingBag size={18} /> Add to Cart
                    </button>
                  </div>

                  {/* Product Details */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-neutral-900">{product.name}</h3>
                      <span className="font-semibold text-neutral-900">${product.price}</span>
                    </div>
                    <p className="text-sm text-neutral-500">{product.category}</p>
                    
                    {/* Color Preview */}
                    <div className="flex gap-2 pt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {product.colors.map((c, i) => (
                         <div key={i} className="w-3 h-3 rounded-full border border-neutral-200" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination / Load More */}
            <div className="mt-16 text-center">
              <button className="bg-neutral-900 text-white px-8 py-3 text-sm font-medium hover:bg-neutral-800 transition-colors">
                Load More Products
              </button>
            </div>
          </main>
        </div>
      </div>

      {/* MOBILE FILTER SIDEBAR OVERLAY */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
          />
          
          {/* Drawer */}
          <div className="relative w-full max-w-xs bg-white h-full p-6 overflow-y-auto animate-slide-in-right">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold">Filters</h2>
              <button onClick={() => setMobileFiltersOpen(false)}>
                <X size={24} />
              </button>
            </div>
            
            {/* Mobile Filter Content (Simplified) */}
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Categories</h3>
                <div className="space-y-2">
                  {filters.categories.map(cat => (
                    <label key={cat} className="flex items-center gap-3">
                      <input type="checkbox" className="w-5 h-5 border-neutral-300 rounded text-black" />
                      <span className="text-neutral-600">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <button className="w-full bg-black text-white py-3 mt-8 font-medium">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;