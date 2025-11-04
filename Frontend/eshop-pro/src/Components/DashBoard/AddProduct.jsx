import React, { useState } from "react";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock_unit: "",
    category: "",
    uploaded_images: [], // File objects
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      uploaded_images: Array.from(e.target.files),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const body = new FormData();
    body.append("name", formData.name);
    body.append("description", formData.description);
    body.append("price", formData.price);
    body.append("stock_unit", formData.stock_unit);
    body.append("category", formData.category);

    // Append each file under "uploaded_images"
    formData.uploaded_images.forEach((file) => {
      body.append("uploaded_images", file);
    });

    try {
      const res = await fetch("http://localhost:8000/api/products/", {
        method: "POST",
        body, // FormData automatically sets Content-Type
      });

      if (!res.ok) {
        const err = await res.json();
        setStatus(err.message || "Upload failed");
      } else {
        setStatus("Product created successfully!");
        setFormData({
          name: "",
          description: "",
          price: "",
          stock_unit: "",
          category: "",
          uploaded_images: [],
        });
      }
    } catch (err) {
      console.error(err);
      setStatus("Error uploading product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-3xl"
    >
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="number"
        name="stock_unit"
        placeholder="Stock Unit"
        value={formData.stock_unit}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="number"
        name="category"
        placeholder="Category ID"
        value={formData.category}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />~
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="w-full border px-3 py-2 rounded"
        required
      />
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
