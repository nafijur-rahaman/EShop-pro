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
      <div className="w-full h-[50vh] flex items-center justify-center text-xl">
        Loading...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4">
      <HeroBanner />
      <CategoriesGrid categories={categories} />
      <ProductsGrid products={products} visibleCount={visibleCount} loadMore={loadMore} />
    </div>
  );
}
