import React, { useState } from "react";
import { useApi } from "../../hooks/UseApi";

const AddProduct = () => {
  const { post, loading, error } = useApi();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock_unit: "",
    category: "",
    images: [],
  });
  const [status, setStatus] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, images: e.target.files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = new FormData();
    body.append("name", formData.name);
    body.append("description", formData.description);
    body.append("price", formData.price);
    body.append("stock_unit", formData.stock_unit);
    body.append("category", formData.category);

    Array.from(formData.images).forEach((file) => {
      body.append("images", file);
    });

    const result = await post("/products/", body);

    if (result) {
      setStatus("Product created successfully!");
      setFormData({
        name: "",
        description: "",
        price: "",
        stock_unit: "",
        category: "",
        images: [],
      });
    } else {
      setStatus(error?.response?.data?.message || "Failed to create product.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-3xl"
    >
      <div>
        <label className="block font-semibold mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block font-semibold mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Stock Unit</label>
          <input
            type="number"
            name="stock_unit"
            value={formData.stock_unit}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Category ID</label>
          <input
            type="number"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label className="block font-semibold mb-1">Images</label>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`px-4 py-2 rounded text-white ${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Submitting..." : "Create Product"}
      </button>

      {status && <p className="mt-4 text-gray-700">{status}</p>}
    </form>
  );
};

export default AddProduct;
