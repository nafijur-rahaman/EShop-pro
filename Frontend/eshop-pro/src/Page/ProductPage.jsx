// src/pages/ProductPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router"; // ✅ important
import { useApi } from "../hooks/UseApi";

const ProductPage = () => {
  const { id } = useParams(); // ✅ "id" comes from route /products/:id
  const { get } = useApi();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!id) return; // 🧩 prevent fetch until id is ready
    const fetchProduct = async () => {
      const data = await get(`/products/${id}/`);
      if (data) setProduct(data);
    };
    fetchProduct();
  }, [id, get]);

  if (!product) return <p>Loading...</p>;
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </div>
  );
};

export default ProductPage;
