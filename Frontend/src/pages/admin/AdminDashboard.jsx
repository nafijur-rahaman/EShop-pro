import { useEffect, useState } from "react";
import { useApi } from "../../hook/useApi";
import StatsCard from "./StatsCard";
import ProductList from "./ProductList";
import CategoryList from "./CategoryList";
import CreateProductForm from "./CreateProductForm";
import CreateCategoryForm from "./CreateCategoryForm";

export default function AdminDashboard() {
  const { get } = useApi();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeSection, setActiveSection] = useState("stats");

  useEffect(() => {
    async function fetchData() {
      try {
        const catData = await get("categories/");
        const prodData = await get("products/");
        setCategories(catData || []);
        setProducts(prodData || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-20">Loading dashboard...</p>;

  return (
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

        {activeSection === "products" && <ProductList products={products} />}
        {activeSection === "categories" && <CategoryList categories={categories} />}
        {activeSection === "create-product" && <CreateProductForm categories={categories} />}
        {activeSection === "create-category" && <CreateCategoryForm />}
      </main>
    </div>
  );
}
