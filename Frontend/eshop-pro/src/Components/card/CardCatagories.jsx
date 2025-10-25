import React from "react";

const CardCategories = ({ title, image }) => {
  return (
    <div className="w-48 bg-white rounded-2xl shadow-lg overflow-hidden m-4 hover:border-b-sky-400 hover:border-b-2 hover:scale-110 transition-transform cursor-pointer">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 text-center">
        <h1 className="text-lg font-semibold text-gray-800 ">{title}</h1>
      </div>
    </div>
  );
};

export default CardCategories;
