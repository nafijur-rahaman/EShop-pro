import React from "react";
import { Star } from "lucide-react"; // Modern icon set
import { useNavigate } from "react-router";

const ProductCard = ({ id, title, image, price, rating = 0, sold = 0 }) => {
  const navigate = useNavigate();

  // ✅ Fixed function definition & URL template
  const goToProductDetail = () => {
    navigate(`/Product-details/${id}`);
  };

  return (
    <div className="w-56 m-4">
      {/* ✅ Click handler is now a function, not immediately invoked */}
      <div
        onClick={goToProductDetail}
        className="bg-white rounded-2xl shadow-lg overflow-hidden 
                   hover:scale-105 transition-transform transform-gpu cursor-pointer"
      >
        {/* ✅ Product image */}
        <img
          src={image}
          alt={title}
          className="w-full h-52 object-cover"
        />

        {/* ✅ Product info section */}
        <div className="p-4">
          <p className="font-semibold text-gray-900 truncate">{title}</p>

          {/* ✅ Star rating */}
          <div className="flex gap-1 items-center mt-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }
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
