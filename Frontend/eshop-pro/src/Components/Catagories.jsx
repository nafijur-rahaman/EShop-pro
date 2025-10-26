import React from "react";
import CardCatagories from "./card/CardCatagories";

const categoriesData = [
  { id: 1, title: "Mans World", image: "/images/offer-img-1.jpg" },
  { id: 2, title: "Womens World", image: "/images/offer-img-2.jpg" },
  { id: 3, title: "Kids Collection", image: "/images/offer-img-3.jpg" },
  { id: 4, title: "Accessories", image: "/images/offer-img-3.jpg" },
];

const Categories = () => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-4 text-center">
        <span className="text-2xl font-semibold border-b-2 border-gray-800">
          Categories
        </span>
      </div>
      <div className="flex flex-wrap justify-center">
        {categoriesData.map((category) => (
          <CardCatagories
            key={category.id}
            title={category.title}
            image={category.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
