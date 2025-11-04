// src/components/ProductDetails.jsx
import React, { useState } from "react";

const ProductDetails = ({ product }) => {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.[0] || null
  );

  const mainImage =
    selectedVariant?.image ||
    product.images?.[0] ||
    "https://placehold.co/400x400/ccc/fff?text=No+Image";

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div>
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-md object-cover"
          />
          <div className="flex gap-3 mt-4">
            {product.variants?.map((variant) => (
              <img
                key={variant.id}
                src={variant.image}
                alt={variant.color}
                className={`w-16 h-16 rounded-lg cursor-pointer border-2 ${
                  selectedVariant?.id === variant.id
                    ? "border-blue-500"
                    : "border-gray-200"
                }`}
                onClick={() => setSelectedVariant(variant)}
              />
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-lg text-gray-600">{product.description}</p>
          <p className="text-2xl font-semibold mt-4 text-blue-600">
            {formatPrice(product.price)}
          </p>

          <button className="mt-6 w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
