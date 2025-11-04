import React, { useEffect, useState } from "react";
import ProductCard from "./card/ProductCard";
import { useApi } from "../hooks/UseApi.jsx";

const JustForYou = () => {
  const [products, setProducts] = useState([]); // Full list from API
  const [visibleCount, setVisibleCount] = useState(8); // 🟢 Tracks how many products are currently visible
  const { get } = useApi();

  // Fetch all products from API
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await get("/products/");
        setProducts(response.data || response);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchPackages();
  }, []);

  // Optional: log products for debugging
  useEffect(() => {
    console.log(products);
  }, [products]);

  // 🟢 Load More button handler
  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 6); // Show 6 more products each click
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-6">
        <h2 className="inline-block text-2xl font-semibold border-b-2 border-gray-800 pb-1">
          Just For You
        </h2>
      </div>

      {/* 🟢 Render only products up to visibleCount */}
      <div className="flex flex-wrap justify-center">
        {products.slice(0, visibleCount).map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            stock_unit={product.stock_unit}
            images={product.images}
            name={product.name}
            description={product.description}
            price={product.price}
          />
        ))}
      </div>

      {/* 🟢 Load More button */}
      {visibleCount < products.length && (  // Hide button when all products are visible
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            className="inline-block border bg-blue-500 text-white font-bold rounded-2xl px-4 h-10 
                       hover:bg-blue-600 hover:scale-110 transition-transform duration-200 cursor-pointer"
          >
            LOAD MORE
          </button>
        </div>
      )}
    </div>
  );
};

export default JustForYou;
