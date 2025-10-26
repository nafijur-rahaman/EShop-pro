import React from "react";
import { Star } from "lucide-react"; // ⭐ Optional: modern icon set (already available in shadcn/lucide)

const ProductCard = ({ title, image, price, rating, sold }) => {
  return (
    // ✅ Moved margin to outer container to prevent layout shift when scaling
    <div className="w-56 m-4">
      {/* ✅ Inner card handles hover scale without affecting layout */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden 
                      hover:scale-105 transition-transform transform-gpu cursor-pointer">
        {/* ✅ Product image */}
        <img
          src={image}
          alt={title}
          className="w-full h-52 object-cover"
        />

        {/* ✅ Product info section */}
        <div className="p-4">
          {/* Product title */}
          <p className="font-semibold text-gray-900 truncate">{title}</p>

          {/* ✅ Star rating */}
          <div className="flex gap-1">
            <div className="flex items-center mt-1">

            {[...Array(5)].map((_, i) => (
                <Star
                key={i}
                size={16}
                className={`${
                    i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
                />
            ))}
            </div>
            <span className="text-xs text-sky-400">({sold})</span>
          </div>

          {/* ✅ Price */}
          <div className="mt-2">
            <span className="text-lg font-bold text-sky-600">${price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
