import React from "react";
import ProductCard from "./card/ProductCard";

const products = [
  { id: 1, title: "Stylish Shirt", image: "/images/product-1.jpg", price: 29.99, rating: 4, sold:65 },
  { id: 2, title: "Casual Shoes", image: "/images/product-2.jpg", price: 49.99, rating: 5, sold:65 },
  { id: 3, title: "Elegant Watch", image: "/images/product-3.jpg", price: 79.99, rating: 3, sold:65 },
  { id: 4, title: "Leather Bag", image: "/images/product-4.jpg", price: 59.99, rating: 4, sold:65 },
  { id: 5, title: "Sunglasses", image: "/images/product-5.jpg", price: 19.99, rating: 5, sold:65 },
  { id: 5, title: "Sunglasses", image: "/images/product-6.jpg", price: 19.99, rating: 5, sold:65 },
  { id: 5, title: "Sunglasses", image: "/images/product-7.jpg", price: 19.99, rating: 5,sold:65 },
  { id: 5, title: "Sunglasses", image: "/images/product-8.jpg", price: 19.99, rating: 5, sold:65 },
];

const JustForYou = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-6">
        <h2 className="inline-block text-2xl font-semibold border-b-2 border-gray-800 pb-1">
          Just For You
        </h2>
      </div>

      <div className="flex flex-wrap justify-center">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            image={product.image}
            price={product.price}
            rating={product.rating}
            sold={product.sold}
          />
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <button className="inline-block border bg-blue-500 text-white font-bold rounded-2xl px-4 h-10 hover:bg-blue-600 hover:scale-110 transition-transform duration-200 cursor-pointer">
          LOAD MORE
        </button>
      </div>
    </div>
  );
};

export default JustForYou;
