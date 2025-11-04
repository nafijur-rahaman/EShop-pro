import React, { useEffect, useState } from "react";
import { Plus, Home, Settings, Package, ShoppingCart, ShoppingBasket } from "lucide-react";
import AddProduct from "../../Components/DashBoard/AddProduct";
import DashboardInfo from "../../Components/DashBoard/DashboardInfo";
import ProductList from "../../Components/DashBoard/ProductList";
import { useApi } from "../../hooks/UseApi";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showProducts, setShowProducts] = useState(false);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalSold: 0,
    totalStock: 0,
  });
  const { get } = useApi();

  const fetchStats = async () => {
    const data = await get("/products/");
    if (data) {
      const totalProducts = data.length;
      const totalStock = data.reduce(
        (acc, product) => acc + product.stock_unit,
        0
      );
      const totalSold = data.reduce(
        (acc, product) => acc + (product.sold_units || 0),
        0
      );
      setStats({ totalProducts, totalSold, totalStock });
    }
  };

  useEffect(() => {
    if (activeTab === "dashboard") fetchStats();
  }, [activeTab]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-6 flex flex-col flex-1">
          <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
          <nav className="flex-1">
            <ul>
              <li
                className={`flex items-center gap-2 mb-4 p-2 rounded cursor-pointer hover:bg-gray-700 ${
                  activeTab === "dashboard" ? "bg-gray-700" : ""
                }`}
                onClick={() => setActiveTab("dashboard")}
              >
                <Home size={18} /> Dashboard
              </li>
              <li
                className={`flex items-center gap-2 mb-4 p-2 rounded cursor-pointer hover:bg-gray-700 ${
                  activeTab === "add-product" ? "bg-gray-700" : ""
                }`}
                onClick={() => setActiveTab("add-product")}
              >
                <Plus size={18} /> Add Product
              </li>
              <li
                className={`flex items-center gap-2 mb-4 p-2 rounded cursor-pointer hover:bg-gray-700 ${
                  activeTab === "add-product" ? "bg-gray-700" : ""
                }`}
                onClick={() => setActiveTab("showProducts")}
              >
                <ShoppingBasket size={18} /> see Products
              </li>
              <li
                className={`flex items-center gap-2 mb-4 p-2 rounded cursor-pointer hover:bg-gray-700 ${
                  activeTab === "settings" ? "bg-gray-700" : ""
                }`}
                onClick={() => setActiveTab("settings")}
              >
                <Settings size={18} /> Settings
              </li>
            </ul>
          </nav>
        </div>
      </aside>
.

      <main className="flex-1 p-10">
        <header className="mb-8">
          <h2 className="text-2xl font-semibold capitalize">
            {activeTab === "add-product" ? "Add Product" : activeTab}
          </h2>
        </header>

        {activeTab === "dashboard" && !showProducts && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DashboardInfo
              title="Total Products"
              value={stats.totalProducts}
              icon={<Package size={28} />}
              onView={() => setShowProducts(true)}
            />
            <DashboardInfo
              title="Products Sold"
              value={stats.totalSold}
              icon={<ShoppingCart size={28} />}
              onView={() => alert("Products Sold details coming soon")}
            />
            <DashboardInfo
              title="Stock Remaining"
              value={stats.totalStock}
              icon={<Package size={28} />}
              onView={() => alert("Stock details coming soon")}
            />
          </div>
        )}

        {activeTab === "dashboard" && showProducts && (
          <>
            <ProductList />
            <button
              onClick={() => setShowProducts(false)}
              className="mt-4 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
            >
              Back to Dashboard
            </button>
          </>
        )}

        {activeTab === "add-product" && <AddProduct />}
        {activeTab === "settings" && (
          <p className="text-gray-700">Settings content goes here...</p>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
