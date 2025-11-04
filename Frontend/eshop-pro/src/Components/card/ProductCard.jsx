import React from "react";
import { useNavigate } from "react-router";

const ProductCard = ({ id, name, images = [], price, stock_unit, description }) => {
  const navigate = useNavigate();

  const goToProductDetail = () => {
    navigate(`/products/${id}`);
  };

  // Safely get the first image, fallback to placeholder
  const mainImage = images.length > 0 ? images[0].image || images[0] : "https://placehold.co/400x400/ccc/fff?text=No+Image";

  return (
    <div className="w-64 h-96 m-4">
      <div
        onClick={goToProductDetail}
        className="bg-white rounded-2xl shadow-lg overflow-hidden 
                   hover:bg-amber-600 hover:scale-105 
                   transition-transform transform-gpu cursor-pointer flex flex-col"
      >
        {/* PRODUCT IMAGE */}
        <div className="w-full h-40 overflow-hidden flex-shrink-0">
          <img
            src={mainImage}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/400x400/ccc/fff?text=No+Image";
            }}
          />
        </div>

        {/* PRODUCT INFO */}
        <div className="p-4 flex flex-col flex-1">
          <p className="font-semibold text-gray-900 truncate">{name}</p>
          <span className="text-xs text-sky-400 mt-1">In Stock: {stock_unit}</span>
          <p className="text-sm text-gray-500 mt-2 line-clamp-2 flex-1">{description}</p>
          <div className="mt-3">
            <span className="text-lg font-bold text-sky-600">${price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
