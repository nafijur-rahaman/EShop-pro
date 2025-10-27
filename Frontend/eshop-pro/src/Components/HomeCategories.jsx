import React from "react";
import { useNavigate } from "react-router";

const categories = [
  { id: 1, title: "Mans World", image: "/images/offer-img-1.jpg" },
  { id: 2, title: "Womens World", image: "/images/offer-img-2.jpg" },
  { id: 3, title: "Kids Collection", image: "/images/offer-img-3.jpg" },
  { id: 4, title: "Accessories", image: "/images/offer-img-4.jpg" },
];

const HomeCategories = () => {
  const navigate = useNavigate();

  const handleClick = (category) => {
    navigate(`/categories?selected=${encodeURIComponent(category.title)}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Categories</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="w-48 h-48 bg-gray-200 rounded-lg cursor-pointer flex items-center justify-center hover:scale-105 transition-transform"
            onClick={() => handleClick(cat)}
          >
            <h3 className="text-lg font-semibold text-center">{cat.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCategories;
