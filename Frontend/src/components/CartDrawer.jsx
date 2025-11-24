import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';

const CartDrawer = ({ isOpen, onClose }) => {
  // Mock Cart Items
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
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className={`fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
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
                {/* Image */}
                <div className="w-20 h-24 bg-neutral-100 rounded-md overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                {/* Info */}
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
                    {/* Qty Control */}
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

        {/* Footer (Total & Checkout) */}
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
            
            <p className="text-center text-[10px] text-neutral-400">
              Taxes and shipping calculated at checkout.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;