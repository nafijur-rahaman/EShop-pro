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
import axiosInstance from "../api/axiosInstance";

const ProfilePage = () => {
  const { user, logout } = useAuth();

  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        // GET Orders
        const ordersRes = await axiosInstance.get("orders/");

        // GET User Profile (contains address details)
        const profileRes = await axiosInstance.get("profile/");

        setOrders(ordersRes.data);
        setProfile(profileRes.data);

      } catch (err) {
        console.error(err);
        setError("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

        {/* PAGE HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-neutral-900">My Account</h1>
          <p className="text-neutral-500 text-sm">
            Manage your profile, orders, and preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

          {/* LEFT SIDEBAR */}
          <aside className="md:col-span-3">
            <div className="bg-white rounded-xl border border-neutral-200 shadow-sm sticky top-20">

              {/* USER HEADER */}
              <div className="p-6 border-b">
                <div className="relative mx-auto mb-4 w-fit">
                  <img
                    src={profile.avatar || "https://via.placeholder.com/80"}
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
                <p className="text-xs text-neutral-500 mt-1">
                  {profile.membership || "Member"}
                </p>
              </div>

              {/* NAVIGATION TABS */}
              <nav className="p-2 space-y-1">
                <TabButton id="orders" icon={Package} label="My Orders" />
                <TabButton id="profile" icon={User} label="Profile Details" />
                <TabButton id="addresses" icon={MapPin} label="Addresses" />
                <TabButton id="wallet" icon={CreditCard} label="Payment Methods" />
                <TabButton id="wishlist" icon={Heart} label="Wishlist" />
                <TabButton id="notifications" icon={Bell} label="Notifications" />
              </nav>

              {/* LOGOUT BUTTON */}
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

          {/* MAIN CONTENT */}
          <main className="md:col-span-9 space-y-6">
            {loading ? (
              <p className="text-center text-neutral-500">Loading...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
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
