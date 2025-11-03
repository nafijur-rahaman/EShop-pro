import React from "react";
import { Star } from "lucide-react";
import { useNavigate } from "react-router";

const ProductCard = ({ id, name, images, price, stock_unit, description }) => {
  const navigate = useNavigate();

  const goToProductDetail = () => {
    navigate(`/Product-details/${id}`);
  };

  return (
    <div className="w-64 h-96 m-4">
      {/* Clickable card container */}
      <div
        onClick={goToProductDetail}
        className="bg-white rounded-2xl shadow-lg overflow-hidden 
                   hover:bg-amber-600 hover:scale-105 
                   transition-transform transform-gpu cursor-pointer flex flex-col"
      >
        {/* PRODUCT IMAGE */}
        <div className="w-full h-40 overflow-hidden flex-shrink-0">
          <img
            src={images}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* PRODUCT INFO */}
        <div className="p-4 flex flex-col flex-1">
          {/* Product name */}
          <p className="font-semibold text-gray-900 truncate">{name}</p>

          {/* Stock info */}
          <span className="text-xs text-sky-400 mt-1">In Stock: {stock_unit}</span>

          {/* Description */}
          <p className="text-sm text-gray-500 mt-2 line-clamp-2 flex-1">{description}</p>

          {/* Price */}
          <div className="mt-3">
            <span className="text-lg font-bold text-sky-600">${price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
