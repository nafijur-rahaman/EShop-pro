import React, { useState, useEffect } from "react";
import {
  User,
  Package,
  MapPin,
  CreditCard,
  Heart,
  LogOut,
  Camera,
  ChevronRight,
  Bell,
} from "lucide-react";

import { useAuth } from "../hook/useAuth";
import { useApi } from "../hook/useApi";   // <-- NEW HOOK

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const api = useApi(); 

 

  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [profile, setProfile] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;

    const fetchAll = async () => {
      setError("");

      try {
        const [ordersRes, profileRes] = await Promise.all([
          api.get("orders/"),
          api.get("profile/"),
        ]);

        setOrders(ordersRes);
        setProfile(profileRes);

        setOrders(ordersRes);
        setProfile(profileRes);
      } catch (err) {
        console.error(err);
        setError("Failed to load profile data.");
      }
    };

    fetchAll();
  }, [user]);

  const TabButton = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium rounded-lg transition-all ${
        activeTab === id
          ? "bg-black text-white shadow"
          : "text-neutral-600 hover:bg-neutral-100"
      }`}
    >
      <Icon size={18} />
      {label}
      {activeTab === id && (
        <ChevronRight size={16} className="ml-auto opacity-70" />
      )}
    </button>
  );

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center text-neutral-500">
        Please log in to view your profile.
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-neutral-900">My Account</h1>
          <p className="text-neutral-500 text-sm">
            Manage your profile, orders, and preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <aside className="md:col-span-3">
            <div className="bg-white rounded-xl border border-neutral-200 shadow-sm sticky top-20">
              <div className="p-6 border-b">
                <div className="relative mx-auto mb-4 w-fit">
                  <img
                    src={"/images/user.jpeg" || "https://via.placeholder.com/80"}
                    alt="User Avatar"
                    className="w-20 h-20 rounded-full object-cover border shadow"
                  />
                  <button className="absolute bottom-0 right-0 bg-black text-white p-1.5 rounded-full">
                    <Camera size={12} />
                  </button>
                </div>

                <h3 className="text-lg font-bold">
                  {profile.first_name} {profile.last_name}
                </h3>

              </div>

              {/* NAVIGATION */}
              <nav className="p-2 space-y-1">
                <TabButton id="orders" icon={Package} label="My Orders" />
                <TabButton id="profile" icon={User} label="Profile Details" />

              </nav>

              <div className="p-2 border-t">
                <button
                  onClick={logout}
                  className="w-full py-3 flex items-center gap-3 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <LogOut size={18} /> Log Out
                </button>
              </div>
            </div>
          </aside>

          <main className="md:col-span-9 space-y-6">
            {api.loading ? (
              <p className="text-center text-neutral-500">Loading...</p>
            ) : error ? (
              <p className="text-center text-red-500">{JSON.stringify(error)}</p>
            ) : (
              <>
                {activeTab === "orders" && <OrdersTab orders={orders} />}
                {activeTab === "profile" && <ProfileTab user={profile} />}
                {activeTab === "addresses" && (
                  <AddressesTab
                    address={{
                      street: profile.address,
                      city: profile.city,
                      country: profile.country,
                      postal_code: profile.postal_code,
                    }}
                  />
                )}
                {activeTab === "wallet" && <WalletTab />}
                {activeTab === "wishlist" && <WishlistTab />}
                {activeTab === "notifications" && <NotificationsTab />}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;


/* -------------------------
   TAB COMPONENTS 
------------------------- */

const OrdersTab = ({ orders }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">My Orders</h2>
    {orders.length === 0 ? (
      <p className="text-neutral-500">No orders found.</p>
    ) : (
      <div className="space-y-4">
        {orders.map((o) => (
          <div
            key={o.id}
            className="p-4 bg-white border rounded-xl shadow-sm flex justify-between"
          >
            <div>
              <p className="font-semibold">Order #{o.id}</p>
              <p className="text-sm text-neutral-500">
                {o.status || "Pending"}
              </p>
            </div>
            <p className="font-semibold">${o.total_amount}</p>
          </div>
        ))}
      </div>
    )}
  </div>
);

const ProfileTab = ({ user }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Profile Details</h2>

    <div className="bg-white p-6 rounded-xl border shadow-sm space-y-3">
      <p><strong>Name:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
    </div>
  </div>
);






