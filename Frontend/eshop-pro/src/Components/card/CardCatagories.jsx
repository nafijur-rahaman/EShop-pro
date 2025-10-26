import React from "react";

const CardCategories = ({ title, image }) => {
  return (
    // ✅ Move margin to outer wrapper
    <div className="w-48 m-4">
      {/* ✅ Inner card handles hover scale without affecting layout */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden
                      hover:scale-105 transition-transform transform-gpu cursor-pointer">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4 text-center">
          <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
        </div>
      </div>
    </div>
  );
};

export default CardCategories;
