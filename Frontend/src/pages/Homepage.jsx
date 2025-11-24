import React from 'react';
import { ArrowRight, Truck, ShieldCheck, RefreshCcw, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router';

const categories = [
  { id: 1, name: 'Urban Collection', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800', size: 'large' },
  { id: 2, name: 'Summer Essentials', image: 'https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?auto=format&fit=crop&q=80&w=600', size: 'small' },
  { id: 3, name: 'Accessories', image: 'https://images.unsplash.com/photo-1576053139778-7e32f23d2d18?auto=format&fit=crop&q=80&w=600', size: 'small' },
];

const products = [
  { id: 1, name: 'Premium Wool Coat', price: '$299.00', category: 'Outerwear', image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=600' },
  { id: 2, name: 'Leather Weekend Bag', price: '$185.00', category: 'Accessories', image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=600' },
  { id: 3, name: 'Minimalist Watch', price: '$145.00', category: 'Watches', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=600' },
  { id: 4, name: 'Suede Loafers', price: '$120.00', category: 'Footwear', image: 'https://images.unsplash.com/photo-1614252235316-06f873845527?auto=format&fit=crop&q=80&w=600' },
];

const Homepage = () => {
  return (
    <div className="font-sans bg-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero" 
            className="w-full h-full object-cover object-center"
          />
          {/* Dark Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-xl text-white space-y-6 animate-fade-in">
            <span className="uppercase tracking-[0.2em] text-sm font-medium">New Season 2025</span>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Elegance in <br /> Every Detail.
            </h1>
            <p className="text-lg text-gray-200 max-w-md leading-relaxed">
              Discover our curated collection of premium essentials designed for the modern individual.
            </p>
            <button className="mt-8 bg-white text-black px-8 py-4 font-medium hover:bg-gray-100 transition-colors flex items-center gap-2">
              Shop Collection <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* 2. TRUST SIGNALS (Icon Strip) */}
      <section className="py-10 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4">
            <Truck className="text-neutral-400" size={24} />
            <div>
              <h4 className="font-semibold text-sm">Free Global Shipping</h4>
              <p className="text-neutral-500 text-xs">On all orders over $200</p>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-4">
            <ShieldCheck className="text-neutral-400" size={24} />
            <div>
              <h4 className="font-semibold text-sm">Secure Payment</h4>
              <p className="text-neutral-500 text-xs">100% protected transactions</p>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-4">
            <RefreshCcw className="text-neutral-400" size={24} />
            <div>
              <h4 className="font-semibold text-sm">30-Day Returns</h4>
              <p className="text-neutral-500 text-xs">Hassle-free return policy</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CATEGORIES (Bento Grid) */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center tracking-tight">Curated Collections</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[600px]">
          {/* Large Item */}
          <div className="relative group overflow-hidden cursor-pointer h-full">
            <img 
              src={categories[0].image} 
              alt={categories[0].name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-2xl font-bold">{categories[0].name}</h3>
              <span className="border-b border-white pb-1 inline-block mt-2 text-sm">Explore</span>
            </div>
          </div>

          {/* Right Column (Two Small Items) */}
          <div className="grid grid-rows-2 gap-4 h-full">
            {categories.slice(1).map((cat) => (
              <div key={cat.id} className="relative group overflow-hidden cursor-pointer h-full">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-bold">{cat.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. NEW ARRIVALS (Product Grid) */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-3xl font-bold tracking-tight">New Arrivals</h2>
            <a href="#" className="text-sm font-medium border-b border-black pb-0.5 hover:text-neutral-600 transition-colors">View All</a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-200 mb-4">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Quick Add Button (Appears on Hover) */}
                  <button className="absolute bottom-4 left-4 right-4 bg-white text-black py-3 text-sm font-medium opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg flex items-center justify-center gap-2">
                    <ShoppingBag size={16} /> Quick Add
                  </button>
                </div>
                
                {/* Product Info */}
                <div className="space-y-1">
                  <p className="text-xs text-neutral-500 uppercase tracking-wide">{product.category}</p>
                  <h3 className="font-medium text-neutral-900">{product.name}</h3>
                  <p className="text-neutral-900 font-semibold">{product.price}</p>
                </div>
              </div>

       
            ))}

            <Link to="/all-products" className="mt-8 w-full bg-black text-white py-4 font-medium hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2">
              View More Products <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. EDITORIAL / PROMO SECTION */}
      <section className="py-24 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-6">
            <span className="text-blue-500 font-medium tracking-widest text-sm uppercase">Limited Edition</span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">The Monochrome <br /> Collection</h2>
            <p className="text-neutral-400 max-w-md text-lg leading-relaxed">
              Designed for those who speak quietly but clearly. Experience the new standard of minimalist luxury with our latest drop.
            </p>
            <button className="bg-white text-black px-8 py-3 font-medium hover:bg-neutral-200 transition-colors">
              Explore The Look
            </button>
          </div>
          <div className="flex-1 relative">
             {/* Decorative background element */}
             <div className="absolute -inset-4 bg-blue-600/20 blur-2xl rounded-full"></div>
             <img 
               src="https://images.unsplash.com/photo-1485230405346-71acb9518d9c?auto=format&fit=crop&q=80&w=800" 
               alt="Editorial" 
               className="relative z-10 w-full h-auto grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
             />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;