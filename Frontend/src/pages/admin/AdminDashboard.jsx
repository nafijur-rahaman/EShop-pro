import { useEffect, useState } from "react";
import { useApi } from "../../hook/useApi";
import Navbar from "../../components/Navbar";
import StatsCard from "./StatsCard";
import ProductList from "./ProductList";
import CategoryList from "./CategoryList";
import CreateProductForm from "./CreateProductForm";
import CreateCategoryForm from "./CreateCategoryForm";

export default function AdminDashboard() {
  const api = useApi(); // { get, put, delete }
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("stats");

  useEffect(() => {
    async function fetchData() {
      try {
        const catData = await api.get("categories/");
        const prodData = await api.get("products/");
        setCategories(catData || []);
        setFilteredCategories(catData || []);
        setProducts(prodData || []);
        setFilteredProducts(prodData || []);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading)
    return <p className="text-center mt-20 text-gray-700">Loading dashboard...</p>;

  // Search handler
  const handleSearch = (query) => {
    const lowerQuery = query.toLowerCase();
    if (activeSection === "products") {
      const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(lowerQuery)
      );
      setFilteredProducts(filtered);
    } else if (activeSection === "categories") {
      const filtered = categories.filter((c) =>
        c.name.toLowerCase().includes(lowerQuery)
      );
      setFilteredCategories(filtered);
    }
  };

  // Category delete/save handlers
  const handleDeleteCategory = async (category) => {
    if (!window.confirm(`Delete "${category.name}"?`)) return;
    try {
      await api.delete(`categories/${category.id}/`);
      setCategories(prev => prev.filter(c => c.id !== category.id));
      setFilteredCategories(prev => prev.filter(c => c.id !== category.id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete category.");
    }
  };

  const handleSaveCategory = async (updatedCategory) => {
    try {
      await api.put(`categories/${updatedCategory.id}/`, updatedCategory);
      setCategories(prev => prev.map(c =>
        c.id === updatedCategory.id ? { ...c, ...updatedCategory } : c
      ));
      setFilteredCategories(prev => prev.map(c =>
        c.id === updatedCategory.id ? { ...c, ...updatedCategory } : c
      ));
    } catch (err) {
      console.error(err);
      alert("Failed to update category.");
    }
  };

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md p-6">
          <h1 className="text-2xl font-bold mb-8 text-center">Admin Panel</h1>
          <nav className="flex flex-col gap-4">
            <button
              className={`text-left py-2 px-4 rounded hover:bg-gray-200 ${
                activeSection === "stats" ? "bg-gray-200 font-semibold" : ""
              }`}
              onClick={() => setActiveSection("stats")}
            >
              Dashboard Stats
            </button>
            <button
              className={`text-left py-2 px-4 rounded hover:bg-gray-200 ${
                activeSection === "products" ? "bg-gray-200 font-semibold" : ""
              }`}
              onClick={() => setActiveSection("products")}
            >
              Product List
            </button>
            <button
              className={`text-left py-2 px-4 rounded hover:bg-gray-200 ${
                activeSection === "categories" ? "bg-gray-200 font-semibold" : ""
              }`}
              onClick={() => setActiveSection("categories")}
            >
              Category List
            </button>
            <button
              className={`text-left py-2 px-4 rounded hover:bg-gray-200 ${
                activeSection === "create-product" ? "bg-gray-200 font-semibold" : ""
              }`}
              onClick={() => setActiveSection("create-product")}
            >
              Create Product
            </button>
            <button
              className={`text-left py-2 px-4 rounded hover:bg-gray-200 ${
                activeSection === "create-category" ? "bg-gray-200 font-semibold" : ""
              }`}
              onClick={() => setActiveSection("create-category")}
            >
              Create Category
            </button>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          {/* Stats */}
          {activeSection === "stats" && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
              <StatsCard title="Total Products" value={products.length} />
              <StatsCard title="Total Categories" value={categories.length} />
              <StatsCard
                title="Stock Available"
                value={products.reduce((acc, p) => acc + (p.stock_unit || 0), 0)}
              />
              <StatsCard
                title="Total Sold"
                value={products.reduce((acc, p) => acc + (p.sold || 0), 0)}
              />
            </div>
          )}

          {/* Products */}
          {activeSection === "products" && (
            <ProductList
              products={filteredProducts}
              onDelete={async (product) => {
                if (!window.confirm(`Delete "${product.name}"?`)) return;
                try {
                  await api.delete(`products/${product.id}/`);
                  setProducts(prev => prev.filter(p => p.id !== product.id));
                  setFilteredProducts(prev => prev.filter(p => p.id !== product.id));
                } catch (err) {
                  console.error(err);
                  alert("Failed to delete product.");
                }
              }}
              onSave={async (updatedProduct) => {
                try {
                  await api.put(`products/${updatedProduct.id}/`, updatedProduct);
                  setProducts(prev => prev.map(p =>
                    p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p
                  ));
                  setFilteredProducts(prev => prev.map(p =>
                    p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p
                  ));
                } catch (err) {
                  console.error(err);
                  alert("Failed to update product.");
                }
              }}
            />
          )}

          {/* Categories */}
          {activeSection === "categories" && (
            <CategoryList
              categories={filteredCategories}
              onDelete={handleDeleteCategory}
              onSave={handleSaveCategory}
            />
          )}

          {/* Create Product */}
          {activeSection === "create-product" && <CreateProductForm categories={categories} />}

          {/* Create Category */}
          {activeSection === "create-category" && <CreateCategoryForm />}
        </main>
      </div>
    </>
  );
}
