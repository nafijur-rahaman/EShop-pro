import React, {  useContext, useEffect, useState } from "react";
import ProductCard from "./card/ProductCard";
import { useApi } from "../hooks/UseApi.jsx";
import { AuthContext } from "../Context/AuthContext";

const JustForYou = () => {
  const [products, setAllProducts] = useState([]);
const {loading} = useContext(AuthContext);
  const { get } = useApi();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await get("/products/");
        console.log(response)
        setAllProducts(response);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchPackages();
  }, [loading]);

  console.log(products);




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
