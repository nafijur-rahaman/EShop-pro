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
      formData.append("stock_unit", parseInt(stock));
      formData.append("sold", parseInt(sold));
      formData.append("category", category);

      // DEBUG: log FormData
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      // POST request without uploaded_images
      await post("products/", formData);

      alert("Product created successfully!");

      // Reset form
      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setSold("");
      setCategory(categories[0]?.id || "");
    } catch (err) {
      console.error("Error creating product:", err.response?.data || err);
      alert("Failed to create product. Check console for details.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 shadow-lg rounded-2xl flex flex-col gap-6 max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        Create Product
      </h2>

      {/* Product Name */}
      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700">Product Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          rows={4}
          required
        />
      </div>

      {/* Price */}
      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700">Price</label>
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        />
      </div>

      {/* Stock Units */}
      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700">Stock Units</label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        />
      </div>

      {/* Sold Units */}
      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700">Sold Units</label>
        <input
          type="number"
          value={sold}
          onChange={(e) => setSold(e.target.value)}
          className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Category */}
      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg"
      >
        Create Product
      </button>
    </form>
  );
}
