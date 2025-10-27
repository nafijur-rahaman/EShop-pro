import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Categories from "../Components/Categories";
import { products } from "../mockProducts";
import ProductCard from "../Components/card/ProductCard";

function CatagoriesPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategoryParam = queryParams.get("selected");

  const [selectedCategory, setSelectedCategory] = useState(
    selectedCategoryParam ? { title: selectedCategoryParam } : null
  );

  // Update selected category if query param changes
  useEffect(() => {
    if (selectedCategoryParam) {
      setSelectedCategory({ title: selectedCategoryParam });
    }
  }, [selectedCategoryParam]);

  // Filter products
  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory.title)
    : [];

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <Categories
        onCategoryClick={setSelectedCategory}
        selectedCategory={selectedCategory}
      />

      <div className="mt-8">
        {selectedCategory && (
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Products in {selectedCategory.title}
          </h2>
        )}

        <div className="flex flex-wrap justify-center gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={`${product.category}-${product.id}`}
                title={product.title}
                image={product.image}
                price={product.price}
                rating={product.rating || 4}
                sold={product.sold || 4}
              />
            ))
          ) : selectedCategory ? (
            <p className="text-center">No products available for this category.</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default CatagoriesPage;
