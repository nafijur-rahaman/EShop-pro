import React, { useState } from 'react';
import { 
  User, Package, MapPin, CreditCard, Heart, LogOut, 
  Camera, ChevronRight, Settings, Bell 
} from 'lucide-react';

// --- MOCK DATA ---
const userProfile = {
  name: 'Alex J. Mercer',
  email: 'alex.mercer@example.com',
  phone: '+1 (555) 019-2834',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'
};

const orders = [
  { 
    id: '#ORD-7782', 
    date: 'Oct 24, 2025', 
    total: '$350.00', 
    status: 'Delivered', 
    items: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=100',
      'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=100'
    ]
  },
  { 
    id: '#ORD-7781', 
    date: 'Oct 12, 2025', 
    total: '$120.00', 
    status: 'Processing', 
    items: [
      'https://images.unsplash.com/photo-1614252235316-06f873845527?auto=format&fit=crop&q=80&w=100'
    ]
  }
];

const addresses = [
  { id: 1, type: 'Home', street: '123 Luxury Blvd, Penthouse 4', city: 'New York, NY 10012', default: true },
  { id: 2, type: 'Office', street: '45 Corporate Drive, Suite 200', city: 'New York, NY 10015', default: false }
];

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('orders'); // 'profile', 'orders', 'addresses', 'wishlist'

  const TabButton = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium transition-all duration-200 rounded-lg ${
        activeTab === id 
          ? 'bg-neutral-900 text-white shadow-md' 
          : 'text-neutral-600 hover:bg-neutral-100 hover:text-black'
      }`}
    >
      <Icon size={18} />
      {label}
      {activeTab === id && <ChevronRight size={16} className="ml-auto opacity-50" />}
    </button>
  );

  return (
    <div className="bg-neutral-50 min-h-screen font-sans py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-neutral-900">My Account</h1>
          <p className="text-neutral-500 text-sm mt-1">Manage your profile, orders, and preferences.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* LEFT SIDEBAR NAVIGATION */}
          <aside className="md:col-span-3 lg:col-span-3">
            <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden sticky top-24 shadow-sm">
              {/* User Mini Profile */}
              <div className="p-6 border-b border-neutral-100 flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <img src={userProfile.avatar} alt="User" className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md" />
                  <button className="absolute bottom-0 right-0 bg-black text-white p-1.5 rounded-full hover:bg-neutral-800 transition-colors">
                    <Camera size={12} />
                  </button>
                </div>
                <h3 className="font-bold text-neutral-900">{userProfile.name}</h3>
                <p className="text-xs text-neutral-500 mt-1">Diamond Member</p>
              </div>

              {/* Navigation Menu */}
              <nav className="p-2 space-y-1">
                <TabButton id="orders" icon={Package} label="My Orders" />
                <TabButton id="profile" icon={User} label="Profile Details" />
                <TabButton id="addresses" icon={MapPin} label="Addresses" />
                <TabButton id="wallet" icon={CreditCard} label="Payment Methods" />
                <TabButton id="wishlist" icon={Heart} label="Wishlist" />
                <TabButton id="notifications" icon={Bell} label="Notifications" />
              </nav>

              <div className="p-2 border-t border-neutral-100 mt-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <LogOut size={18} /> Log Out
                </button>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <main className="md:col-span-9 lg:col-span-9 space-y-6">
            
            {/* --- TAB: ORDERS --- */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden animate-fade-in">
                <div className="p-6 border-b border-neutral-100 flex justify-between items-center">
                  <h2 className="text-lg font-bold">Order History</h2>
                  <div className="text-sm text-neutral-500">Showing recent orders</div>
                </div>
                <div className="divide-y divide-neutral-100">
                  {orders.map((order) => (
                    <div key={order.id} className="p-6 hover:bg-neutral-50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-neutral-900">{order.id}</span>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                              order.status === 'Delivered' 
                                ? 'bg-green-50 text-green-700 border-green-200' 
                                : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-500 mt-1">Placed on {order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-neutral-900">{order.total}</p>
                          <button className="text-xs font-medium text-blue-600 hover:underline mt-1">View Invoice</button>
                        </div>
                      </div>
                      
                      {/* Order Items Preview */}
                      <div className="flex items-center gap-4">
                        <div className="flex -space-x-3">
                          {order.items.map((img, i) => (
                            <img key={i} src={img} alt="Item" className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" />
                          ))}
                        </div>
                        {order.items.length > 2 && <span className="text-xs text-neutral-500">+2 more items</span>}
                        <button className="ml-auto bg-neutral-900 text-white px-4 py-2 text-xs font-medium rounded hover:bg-black transition-colors">
                          Track Order
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* --- TAB: PROFILE SETTINGS --- */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl border border-neutral-200 shadow-sm animate-fade-in">
                <div className="p-6 border-b border-neutral-100">
                  <h2 className="text-lg font-bold">Personal Information</h2>
                </div>
                <div className="p-8">
                  <form className="space-y-6 max-w-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-neutral-500 tracking-wider">First Name</label>
                        <input type="text" defaultValue="Alex" className="w-full border border-neutral-200 rounded-md px-4 py-2.5 focus:ring-1 focus:ring-black focus:border-black outline-none transition-all text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-neutral-500 tracking-wider">Last Name</label>
                        <input type="text" defaultValue="Mercer" className="w-full border border-neutral-200 rounded-md px-4 py-2.5 focus:ring-1 focus:ring-black focus:border-black outline-none transition-all text-sm" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-neutral-500 tracking-wider">Email Address</label>
                      <input type="email" defaultValue={userProfile.email} className="w-full border border-neutral-200 rounded-md px-4 py-2.5 focus:ring-1 focus:ring-black focus:border-black outline-none transition-all text-sm bg-neutral-50 text-neutral-500" disabled />
                      <p className="text-[10px] text-neutral-400">Contact support to change your email address.</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-neutral-500 tracking-wider">Phone Number</label>
                      <input type="tel" defaultValue={userProfile.phone} className="w-full border border-neutral-200 rounded-md px-4 py-2.5 focus:ring-1 focus:ring-black focus:border-black outline-none transition-all text-sm" />
                    </div>

                    <div className="pt-6 border-t border-neutral-100 flex justify-end gap-3">
                      <button type="button" className="px-6 py-2.5 text-sm font-medium text-neutral-600 hover:text-black hover:bg-neutral-50 rounded-lg transition-colors">Cancel</button>
                      <button type="button" className="px-6 py-2.5 text-sm font-medium bg-neutral-900 text-white hover:bg-black rounded-lg shadow-lg transition-colors">Save Changes</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* --- TAB: ADDRESSES --- */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-xl border border-neutral-200 shadow-sm animate-fade-in">
                <div className="p-6 border-b border-neutral-100 flex justify-between items-center">
                  <h2 className="text-lg font-bold">Saved Addresses</h2>
                  <button className="text-xs font-bold uppercase border-b border-black pb-0.5 hover:text-neutral-600">Add New</button>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {addresses.map((addr) => (
                    <div key={addr.id} className={`border rounded-xl p-5 relative ${addr.default ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200'}`}>
                      {addr.default && <span className="absolute top-4 right-4 text-[10px] font-bold bg-neutral-900 text-white px-2 py-0.5 rounded">DEFAULT</span>}
                      <div className="flex items-start gap-3 mb-3">
                        <MapPin size={18} className="mt-0.5 text-neutral-400" />
                        <div>
                          <h4 className="font-bold text-sm">{addr.type}</h4>
                          <p className="text-sm text-neutral-600 mt-1 leading-relaxed">{addr.street}<br/>{addr.city}</p>
                        </div>
                      </div>
                      <div className="flex gap-4 mt-4 pl-8 text-xs font-medium text-neutral-500">
                        <button className="hover:text-black">Edit</button>
                        <button className="hover:text-red-600">Remove</button>
                      </div>
                    </div>
                  ))}
                  
                  {/* Add New Placeholer */}
                  <button className="border-2 border-dashed border-neutral-200 rounded-xl p-5 flex flex-col items-center justify-center text-neutral-400 hover:border-neutral-400 hover:text-neutral-600 transition-all min-h-[160px]">
                    <PlusIcon size={24} className="mb-2" />
                    <span className="text-sm font-medium">Add Address</span>
                  </button>
                </div>
              </div>
            )}
            
            {/* --- TAB: WISHLIST / CART SHORTCUT --- */}
            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-xl border border-neutral-200 shadow-sm animate-fade-in">
                <div className="p-6 border-b border-neutral-100">
                   <h2 className="text-lg font-bold">My Wishlist (Saved for Later)</h2>
                </div>
                {/* Empty State Mockup */}
                <div className="p-12 text-center">
                  <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-400">
                    <Heart size={24} />
                  </div>
                  <h3 className="text-neutral-900 font-medium">Your wishlist is empty</h3>
                  <p className="text-neutral-500 text-sm mt-2 mb-6">Start saving your favorite items to build your style.</p>
                  <button className="bg-neutral-900 text-white px-6 py-2.5 text-sm font-medium rounded-lg hover:bg-black transition-colors">
                    Browse Collections
                  </button>
                </div>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
};

// Simple helper for the placeholder icon
const PlusIcon = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

export default ProfilePage;