import { useState } from "react";
import { useApi } from "../../hook/useApi";

export default function CreateProductForm({ categories }) {
  const { post } = useApi();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [sold, setSold] = useState("");
  const [category, setCategory] = useState(categories[0]?.id || "");
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !price || !stock || !category) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price.toString());
      formData.append("stock_unit", stock.toString());
      formData.append("sold", sold.toString());
      formData.append("category", category);

      images.forEach((img) => formData.append("uploaded_images", img));

      await post("products/", formData); // DO NOT set Content-Type manually

      alert("Product created successfully!");

      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setSold("");
      setCategory(categories[0]?.id || "");
      setImages([]);
    } catch (err) {
      console.error("Error creating product:", err.response?.data || err);
      alert("Failed to create product. Check console for details.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 shadow-lg rounded-2xl flex flex-col gap-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 text-center">Create Product</h2>

      {/* Product Name */}
      <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} required className="border rounded-xl p-3" />

      {/* Description */}
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required className="border rounded-xl p-3" />

      {/* Price */}
      <input type="number" placeholder="Price" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required className="border rounded-xl p-3" />

      {/* Stock Units */}
      <input type="number" placeholder="Stock Units" value={stock} onChange={(e) => setStock(e.target.value)} required className="border rounded-xl p-3" />

      {/* Sold Units */}
      <input type="number" placeholder="Sold Units" value={sold} onChange={(e) => setSold(e.target.value)} className="border rounded-xl p-3" />

      {/* Category */}
      <select value={category} onChange={(e) => setCategory(e.target.value)} required className="border rounded-xl p-3">
        {categories.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      {/* Images */}
      <input type="file" multiple accept="image/*" onChange={handleImageChange} className="border rounded-xl p-3" />

      <button type="submit" className="bg-blue-600 text-white py-3 rounded-xl font-semibold">Create Product</button>
    </form>
  );
}
