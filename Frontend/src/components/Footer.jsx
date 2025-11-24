import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, ArrowRight, CreditCard } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-300 font-sans pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Column 1: Brand & Newsletter (Spans 4 cols on lg) */}
          <div className="lg:col-span-4 space-y-6">
            <a href="/" className="text-2xl font-bold text-white tracking-tighter">
              LUXE<span className="text-blue-600">.</span>
            </a>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
              Elevating your lifestyle with curated premium goods. Quality meets modern design in every detail.
            </p>
            
            {/* Premium Newsletter Input */}
            <div className="pt-4">
              <h4 className="text-white text-sm font-semibold mb-3">Subscribe to our newsletter</h4>
              <form className="flex items-end border-b border-neutral-700 pb-2 max-w-sm group focus-within:border-white transition-colors">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="bg-transparent w-full outline-none text-white placeholder-neutral-500 text-sm"
                />
                <button type="button" className="text-neutral-400 hover:text-white transition-colors">
                  <ArrowRight size={20} />
                </button>
              </form>
            </div>
          </div>

          {/* Column 2: Shop (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-white font-medium mb-6">Shop</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bestsellers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Men</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Women</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
            </ul>
          </div>

          {/* Column 3: Support (Spans 2 cols on lg) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-medium mb-6">Support</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Order Status</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns & Warranty</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Store Locator</a></li>
            </ul>
          </div>

          {/* Column 4: Legal/Company (Spans 2 cols on lg) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-medium mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-800 my-8"></div>

        {/* Bottom Section: Copyright & Payment/Socials */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Social Icons */}
          <div className="flex space-x-6 order-2 md:order-1">
            <a href="#" className="text-neutral-400 hover:text-white transition-colors"><Instagram size={20} /></a>
            <a href="#" className="text-neutral-400 hover:text-white transition-colors"><Twitter size={20} /></a>
            <a href="#" className="text-neutral-400 hover:text-white transition-colors"><Facebook size={20} /></a>
            <a href="#" className="text-neutral-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
          </div>

          {/* Copyright */}
          <div className="text-neutral-500 text-xs order-3 md:order-2 text-center md:text-right">
            &copy; {new Date().getFullYear()} Luxe E-Commerce. All rights reserved.
          </div>

          {/* Payment Methods (Simulated) */}
          <div className="flex items-center space-x-3 order-1 md:order-3">
            {/* You can replace these with real SVGs later */}
            <div className="w-8 h-5 bg-neutral-800 rounded flex items-center justify-center text-[10px] text-neutral-500 border border-neutral-700">VISA</div>
            <div className="w-8 h-5 bg-neutral-800 rounded flex items-center justify-center text-[10px] text-neutral-500 border border-neutral-700">MC</div>
            <div className="w-8 h-5 bg-neutral-800 rounded flex items-center justify-center text-[10px] text-neutral-500 border border-neutral-700">PAY</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;