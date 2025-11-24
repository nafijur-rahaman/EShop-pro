import React, { useState, useEffect } from 'react';
import { ShoppingBag, User, Search, Menu, X, Heart, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';

// --- 1. CART DRAWER COMPONENT ---
const CartDrawer = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Merino Wool Cardigan', price: 180, size: 'M', color: 'Camel', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=200', quantity: 1 },
    { id: 2, name: 'Slim Fit Chinos', price: 120, size: '32', color: 'Olive', image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=200', quantity: 2 },
  ]);

  const freeShippingThreshold = 500;
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const progress = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  const updateQty = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Close drawer on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className={`fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-[70] transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-white">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <ShoppingBag size={20} /> Shopping Cart <span className="text-neutral-400 text-sm font-normal">({cartItems.length})</span>
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="px-6 py-4 bg-neutral-50 border-b border-neutral-100">
          <div className="flex justify-between text-xs font-medium mb-2">
            {progress < 100 ? (
              <span>Spend <b>${freeShippingThreshold - subtotal}</b> more for free shipping</span>
            ) : (
              <span className="text-green-600">You've unlocked Free Shipping!</span>
            )}
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-neutral-900 transition-all duration-500 ease-out" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Cart Items (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <ShoppingBag size={48} className="text-neutral-300" />
              <p className="text-neutral-500">Your cart is empty.</p>
              <button onClick={onClose} className="text-black font-medium underline">Continue Shopping</button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                <div className="w-20 h-24 bg-neutral-100 rounded-md overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-sm text-neutral-900 line-clamp-2">{item.name}</h3>
                      <button onClick={() => removeItem(item.id)} className="text-neutral-400 hover:text-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-xs text-neutral-500 mt-1">{item.color} / {item.size}</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="flex items-center border border-neutral-200 rounded">
                      <button onClick={() => updateQty(item.id, -1)} className="px-2 py-1 hover:bg-neutral-50"><Minus size={14} /></button>
                      <span className="text-xs font-medium w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="px-2 py-1 hover:bg-neutral-50"><Plus size={14} /></button>
                    </div>
                    <span className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-neutral-100 p-6 bg-white space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-neutral-500">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-neutral-500">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t border-neutral-100">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button className="w-full bg-neutral-900 text-white py-4 font-medium hover:bg-black transition-all flex items-center justify-center gap-2 group">
              Checkout <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

// --- 2. UPDATED NAVBAR COMPONENT ---
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Navigation Links Data
  const navLinks = [
    { name: 'New Arrivals', href: '#' },
    { name: 'Men', href: '#' },
    { name: 'Women', href: '#' },
    { name: 'Accessories', href: '#' },
    { name: 'Sale', href: '#', isHighlight: true },
  ];

  return (
    <>
      <header className="w-full font-sans">
        {/* Announcement Bar */}
        <div className="bg-neutral-900 text-white text-xs py-2 text-center tracking-wide">
          <p>Free Shipping on Orders Over $150 — <span className="underline cursor-pointer">Shop Now</span></p>
        </div>

        {/* Main Navbar */}
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              
              {/* Mobile Menu Button */}
              <div className="flex items-center md:hidden">
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-neutral-600 hover:text-black transition-colors"
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>

              {/* Logo */}
              <div className="flex-shrink-0 flex items-center justify-center md:justify-start flex-1 md:flex-none">
                <a href="/" className="text-2xl font-bold tracking-tighter text-neutral-900">
                  LUXE<span className="text-blue-600">.</span>
                </a>
              </div>

              {/* Desktop Links */}
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

              {/* Action Icons */}
              <div className="flex items-center space-x-4 md:space-x-6 justify-end flex-1 md:flex-none">
                <button className="hidden sm:block text-neutral-600 hover:text-black transition-colors">
                  <Search size={20} strokeWidth={2} />
                </button>
                <button className="hidden sm:block text-neutral-600 hover:text-black transition-colors">
                  <Heart size={20} strokeWidth={2} />
                </button>
                <button className="text-neutral-600 hover:text-black transition-colors">
                  <User size={20} strokeWidth={2} />
                </button>

                {/* Cart Trigger */}
                <button 
                  onClick={() => setIsCartOpen(true)}
                  className="group relative text-neutral-600 hover:text-black transition-colors"
                >
                  <ShoppingBag size={20} strokeWidth={2} />
                  <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full group-hover:bg-blue-700 transition-colors">
                    3
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="px-4 pt-2 pb-6 space-y-2 bg-white shadow-lg border-t border-neutral-100">
              <div className="relative mb-4 mt-2">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="w-full bg-neutral-100 text-sm px-4 py-2.5 rounded-full outline-none focus:ring-1 focus:ring-blue-500"
                />
                <Search size={16} className="absolute right-4 top-3 text-neutral-400" />
              </div>
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="block px-3 py-2 text-neutral-600 hover:text-black">{link.name}</a>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* Render the Drawer integrated with Navbar state */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};
export default Navbar;

