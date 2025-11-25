import { useEffect, useState } from "react";
import { useApi } from "../hook/useApi";
import HeroBanner from "../components/HeroBanner";
import CategoriesGrid from "../components/CategoriesGrid";
import ProductsGrid from "../components/ProductsGrid";

export default function Home() {
  const { get } = useApi();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const catRes = await get("categories/");
        const prodRes = await get("products/");
        setCategories(catRes || []);
        setProducts(prodRes || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const loadMore = () => setVisibleCount((prev) => prev + 8);

  if (loading)
    return (
      <div className="w-full h-[50vh] flex items-center justify-center text-xl font-semibold text-gray-600 animate-pulse">
        Loading Data...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Hero Section */}
      <div className="mt-6">
        <HeroBanner />
      </div>

      {/* Categories Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-2 h-6 bg-indigo-500 rounded-full"></span>
          Browse Categories
        </h2>

        <div className="bg-white rounded-3xl shadow-md p-6 hover:shadow-lg transition-all duration-300">
          <CategoriesGrid categories={categories} />
        </div>
      </div>

      {/* Products Section */}
      <div className="mt-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-2 h-6 bg-purple-500 rounded-full"></span>
          Featured Products
        </h2>

        <ProductsGrid
          products={products}
          visibleCount={visibleCount}
          loadMore={loadMore}
        />

        {/* Load More Button */}
        {visibleCount < products.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMore}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-2xl font-semibold shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
