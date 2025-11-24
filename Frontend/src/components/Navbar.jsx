import React, { useState } from 'react';
import { ShoppingBag, User, Search, Menu, X, Heart } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation Links Data
  const navLinks = [
    { name: 'New Arrivals', href: '#' },
    { name: 'Men', href: '#' },
    { name: 'Women', href: '#' },
    { name: 'Accessories', href: '#' },
    { name: 'Sale', href: '#', isHighlight: true },
  ];

  return (
    <header className="w-full font-sans">
      {/* Announcement Bar - Premium Touch */}
      <div className="bg-neutral-900 text-white text-xs py-2 text-center tracking-wide">
        <p>Free Shipping on Orders Over $150 — <span className="underline cursor-pointer">Shop Now</span></p>
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* 1. Mobile Menu Button (Left on Mobile) */}
            <div className="flex items-center md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-neutral-600 hover:text-black transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* 2. Logo (Center on Mobile, Left on Desktop) */}
            <div className="flex-shrink-0 flex items-center justify-center md:justify-start flex-1 md:flex-none">
              <a href="/" className="text-2xl font-bold tracking-tighter text-neutral-900">
                LUXE<span className="text-blue-600">.</span>
              </a>
            </div>

            {/* 3. Desktop Navigation Links (Center) */}
            <div className="hidden md:flex space-x-8 mx-auto">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    link.isHighlight 
                      ? 'text-red-600 hover:text-red-700' 
                      : 'text-neutral-600 hover:text-black'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* 4. Action Icons (Right) */}
            <div className="flex items-center space-x-4 md:space-x-6 justify-end flex-1 md:flex-none">
              {/* Search - Hidden on small mobile */}
              <button className="hidden sm:block text-neutral-600 hover:text-black transition-colors">
                <Search size={20} strokeWidth={2} />
              </button>

              {/* Wishlist - Hidden on mobile */}
              <button className="hidden sm:block text-neutral-600 hover:text-black transition-colors">
                <Heart size={20} strokeWidth={2} />
              </button>

              {/* Account */}
              <button className="text-neutral-600 hover:text-black transition-colors">
                <User size={20} strokeWidth={2} />
              </button>

              {/* Cart with Badge */}
              <button className="group relative text-neutral-600 hover:text-black transition-colors">
                <ShoppingBag size={20} strokeWidth={2} />
                <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full group-hover:bg-blue-700 transition-colors">
                  3
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-4 pt-2 pb-6 space-y-2 bg-white shadow-lg border-t border-neutral-100">
            {/* Mobile Search */}
            <div className="relative mb-4 mt-2">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full bg-neutral-100 text-sm px-4 py-2.5 rounded-full outline-none focus:ring-1 focus:ring-blue-500"
              />
              <Search size={16} className="absolute right-4 top-3 text-neutral-400" />
            </div>

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  link.isHighlight 
                    ? 'text-red-600 bg-red-50' 
                    : 'text-neutral-700 hover:text-black hover:bg-neutral-50'
                }`}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-neutral-100 mt-4">
              <a href="#" className="block px-3 py-2 text-base font-medium text-neutral-600 hover:text-black">
                My Account
              </a>
              <a href="#" className="block px-3 py-2 text-base font-medium text-neutral-600 hover:text-black">
                Wishlist
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;