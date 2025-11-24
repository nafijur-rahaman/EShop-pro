import React, { useState } from 'react';
import { ShieldCheck, CreditCard, ArrowLeft, CheckCircle, Truck, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

const Checkout = () => {
  const [step, setStep] = useState(1); // 1: Info, 2: Payment, 3: Success
  const [loading, setLoading] = useState(false);

  // Mock Order Data
  const orderSummary = {
    subtotal: 300.00,
    shipping: 15.00,
    total: 315.00,
    items: [
      { id: 1, name: 'Merino Wool Cardigan', price: 180.00, size: 'M', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=200' },
      { id: 2, name: 'Slim Fit Chinos', price: 120.00, size: '32', image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=200' },
    ]
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep(3); // Go to Success
    }, 2000);
  };

  // --- VIEW 3: ORDER SUCCESS ---
  if (step === 3) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center animate-fade-in">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">Order Confirmed!</h1>
          <p className="text-neutral-500 mb-8">
            Thank you for your purchase. We've emailed your receipt to <b>alex@example.com</b>.
          </p>
          
          <div className="bg-neutral-50 rounded-lg p-4 mb-8 text-left border border-neutral-100">
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-wide mb-2">Order Number</p>
            <p className="text-lg font-mono font-medium">#LX-883492</p>
          </div>

          <button onClick={() => window.location.href = '/'} className="w-full bg-neutral-900 text-white py-4 font-medium rounded-lg hover:bg-black transition-colors">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // --- VIEWS 1 & 2: CHECKOUT FORM ---
  return (
    <div className="min-h-screen bg-white font-sans flex flex-col lg:flex-row">
      
      {/* LEFT COLUMN: FORMS */}
      <div className="w-full lg:w-3/5 px-4 sm:px-8 lg:px-20 py-12 order-2 lg:order-1">
        
        {/* Header Logo */}
        <div className="mb-10">
           <a href="/" className="text-2xl font-bold tracking-tighter text-neutral-900">
             LUXE<span className="text-blue-600">.</span>
           </a>
        </div>

        {/* Breadcrumb / Steps */}
        <div className="flex items-center gap-2 text-sm mb-10">
          <span className={step >= 1 ? "text-black font-medium" : "text-neutral-400"}>Shipping</span>
          <span className="text-neutral-300">/</span>
          <span className={step >= 2 ? "text-black font-medium" : "text-neutral-400"}>Payment</span>
          <span className="text-neutral-300">/</span>
          <span className="text-neutral-400">Review</span>
        </div>

        <form onSubmit={handlePayment}>
          {/* STEP 1: CONTACT & SHIPPING */}
          <div className={step === 1 ? "block space-y-8" : "hidden"}>
            <section>
              <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
              <input type="email" placeholder="Email address" className="w-full border border-neutral-300 rounded-md px-4 py-3 focus:ring-1 focus:ring-black outline-none transition-colors" required />
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="First name" className="col-span-1 border border-neutral-300 rounded-md px-4 py-3 focus:ring-1 focus:ring-black outline-none" />
                <input type="text" placeholder="Last name" className="col-span-1 border border-neutral-300 rounded-md px-4 py-3 focus:ring-1 focus:ring-black outline-none" />
                <input type="text" placeholder="Address" className="col-span-2 border border-neutral-300 rounded-md px-4 py-3 focus:ring-1 focus:ring-black outline-none" />
                <input type="text" placeholder="Apartment, suite, etc." className="col-span-2 border border-neutral-300 rounded-md px-4 py-3 focus:ring-1 focus:ring-black outline-none" />
                <input type="text" placeholder="City" className="col-span-1 border border-neutral-300 rounded-md px-4 py-3 focus:ring-1 focus:ring-black outline-none" />
                <input type="text" placeholder="ZIP Code" className="col-span-1 border border-neutral-300 rounded-md px-4 py-3 focus:ring-1 focus:ring-black outline-none" />
              </div>
            </section>

            <button type="button" onClick={() => setStep(2)} className="w-full bg-neutral-900 text-white py-4 rounded-md font-medium hover:bg-black transition-all mt-8 flex items-center justify-center gap-2">
              Continue to Payment
            </button>
          </div>

          {/* STEP 2: PAYMENT */}
          <div className={step === 2 ? "block space-y-8 animate-fade-in" : "hidden"}>
            
            <button type="button" onClick={() => setStep(1)} className="text-sm text-neutral-500 hover:text-black flex items-center gap-1 mb-6">
              <ArrowLeft size={16} /> Back to Shipping
            </button>

            <div className="border border-neutral-200 rounded-lg p-4 bg-neutral-50 flex justify-between items-center text-sm mb-8">
              <div className="flex gap-4 text-neutral-500">
                <span>Contact: alex@example.com</span>
                <span className="w-px h-4 bg-neutral-300"></span>
                <span>Ship to: 123 Luxury Blvd, NY</span>
              </div>
              <button type="button" onClick={() => setStep(1)} className="text-blue-600 hover:underline">Edit</button>
            </div>

            <section>
               <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
               <div className="border border-neutral-300 rounded-lg overflow-hidden">
                 {/* Credit Card Header */}
                 <div className="flex items-center justify-between p-4 border-b border-neutral-300 bg-neutral-50">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full border-4 border-black bg-white"></div>
                      <span className="font-medium">Credit Card</span>
                    </div>
                    <div className="flex gap-2">
                       {/* Visa/Mastercard Icons simulated */}
                       <div className="w-8 h-5 bg-white border border-neutral-200 rounded"></div>
                       <div className="w-8 h-5 bg-white border border-neutral-200 rounded"></div>
                    </div>
                 </div>
                 
                 {/* Card Form */}
                 <div className="p-6 space-y-4 bg-white">
                    <div className="relative">
                      <input type="text" placeholder="Card number" className="w-full border border-neutral-300 rounded-md px-4 py-3 pl-10 focus:ring-1 focus:ring-black outline-none" />
                      <CreditCard className="absolute left-3 top-3.5 text-neutral-400" size={20} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="Expiration (MM/YY)" className="border border-neutral-300 rounded-md px-4 py-3 focus:ring-1 focus:ring-black outline-none" />
                      <input type="text" placeholder="Security Code" className="border border-neutral-300 rounded-md px-4 py-3 focus:ring-1 focus:ring-black outline-none" />
                    </div>
                    <input type="text" placeholder="Name on card" className="w-full border border-neutral-300 rounded-md px-4 py-3 focus:ring-1 focus:ring-black outline-none" />
                 </div>
               </div>
            </section>

            <button type="submit" disabled={loading} className="w-full bg-neutral-900 text-white py-4 rounded-md font-medium hover:bg-black transition-all mt-8 flex items-center justify-center gap-2">
              {loading ? 'Processing...' : `Pay $${orderSummary.total.toFixed(2)}`}
            </button>
            
            <div className="flex items-center justify-center gap-2 text-xs text-neutral-500 mt-4">
              <ShieldCheck size={14} />
              <span>Payments are secure and encrypted</span>
            </div>
          </div>
        </form>

        <div className="mt-12 pt-6 border-t border-neutral-100 flex gap-6 text-xs text-neutral-500">
           <a href="#" className="hover:underline">Refund Policy</a>
           <a href="#" className="hover:underline">Shipping Policy</a>
           <a href="#" className="hover:underline">Terms of Service</a>
        </div>
      </div>

      {/* RIGHT COLUMN: ORDER SUMMARY (Sidebar) */}
      <div className="w-full lg:w-2/5 bg-neutral-50 border-l border-neutral-200 px-4 sm:px-8 lg:px-12 py-12 order-1 lg:order-2">
        <div className="lg:sticky lg:top-12">
          
          {/* Mobile Toggle for Order Summary (Only visible on small screens) */}
          <div className="lg:hidden flex items-center justify-between mb-6 pb-6 border-b border-neutral-200">
            <span className="font-semibold text-neutral-900">Order Summary</span>
            <span className="font-bold">${orderSummary.total.toFixed(2)}</span>
          </div>

          <div className="space-y-6">
            {orderSummary.items.map((item) => (
              <div key={item.id} className="flex gap-4 items-center">
                <div className="relative">
                  <div className="w-16 h-16 rounded-md overflow-hidden border border-neutral-200 bg-white">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="absolute -top-2 -right-2 bg-neutral-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">1</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-neutral-900">{item.name}</h4>
                  <p className="text-xs text-neutral-500">Size: {item.size}</p>
                </div>
                <p className="text-sm font-medium text-neutral-900">${item.price.toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-neutral-200 mt-6 pt-6 space-y-4">
            <div className="flex gap-2">
              <input type="text" placeholder="Gift card or discount code" className="flex-1 border border-neutral-300 rounded-md px-4 py-2.5 text-sm focus:ring-1 focus:ring-black outline-none" />
              <button className="bg-neutral-200 text-neutral-500 px-4 py-2.5 rounded-md text-sm font-medium hover:bg-neutral-300 hover:text-neutral-700 transition-colors">Apply</button>
            </div>
            
            <div className="space-y-2 text-sm text-neutral-600 pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-neutral-900">${orderSummary.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-medium text-neutral-900">${orderSummary.shipping.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-lg font-bold text-neutral-900 pt-4 border-t border-neutral-200">
              <span>Total</span>
              <div className="text-right">
                <span className="text-xs font-normal text-neutral-500 block">USD</span>
                ${orderSummary.total.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Checkout;