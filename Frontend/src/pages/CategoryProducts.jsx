import { useParams, useNavigate, Link } from "react-router";
import { useEffect, useState } from "react";
import { useApi } from "../hook/useApi";
import CategoriesGrid from "../components/CategoriesGrid";

export default function CategoryProducts() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { get } = useApi();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async (categoryId) => {
    setLoading(true);
    try {
      const catData = await get("categories/");
      setCategories(catData || []);

      if (categoryId) {
        // Fetch products only if categoryId exists
        const allProducts = await get("products/");
        const categoryProducts = allProducts.filter(
          (p) => p.category === parseInt(categoryId)
        );
        setProducts(categoryProducts);

        const cat = catData.find((c) => c.id === parseInt(categoryId));
        setCategoryName(cat?.name || "Unknown Category");
      } else {
        setProducts([]); // No products to show if no category selected
        setCategoryName(""); 
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(id); // fetch categories always, products only if id exists
  }, [id]);

  const handleCategoryClick = (categoryId) => {
    if (!categoryId) return;
    navigate(`/category/${categoryId}`);
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <section className="mt-12 max-w-7xl mx-auto px-4">
      {/* Show categories always */}
      <CategoriesGrid categories={categories} onCategoryClick={handleCategoryClick} />

      {/* Show products only if category selected */}
      {id && (
        <>
          <h2 className="text-2xl font-semibold mb-6 text-center mt-10">
            Products in "{categoryName}"
          </h2>

          {products.length === 0 ? (
            <div className="text-center text-gray-500">
              <p>No products found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col items-center"
                >
                  <img
                    src={product.images[0]?.image || "https://via.placeholder.com/150"}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-md mb-3"
                  />
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-gray-600">${product.price}</p>
                  <p className="text-sm text-gray-500">Stock: {product.stock_unit}</p>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
