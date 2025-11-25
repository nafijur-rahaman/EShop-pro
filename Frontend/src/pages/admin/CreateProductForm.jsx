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
    setImages([...e.target.files]); // spread files into an array
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
      formData.append("price", price);
      formData.append("stock_unit", stock);
      formData.append("sold", sold);
      formData.append("category", category);

      // Append each image correctly
      images.forEach((img, index) => {
        formData.append(`uploaded_images`, img); // DRF ListField accepts repeated keys
      });

      await post("products/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product created successfully!");

      // Reset form
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
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 shadow-lg rounded-2xl flex flex-col gap-6 max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center">Create Product</h2>

      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border rounded-xl p-3"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="border rounded-xl p-3"
      />

      <input
        type="number"
        placeholder="Price"
        step="0.01"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        className="border rounded-xl p-3"
      />

      <input
        type="number"
        placeholder="Stock Units"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        required
        className="border rounded-xl p-3"
      />

      <input
        type="number"
        placeholder="Sold Units"
        value={sold}
        onChange={(e) => setSold(e.target.value)}
        className="border rounded-xl p-3"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        className="border rounded-xl p-3"
      >
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        className="border rounded-xl p-3"
      />

      {images.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {Array.from(images).map((img, i) => (
            <span key={i} className="text-sm bg-gray-200 px-2 py-1 rounded">
              {img.name}
            </span>
          ))}
        </div>
      )}

      <button
        type="submit"
        className="bg-blue-600 text-white py-3 rounded-xl font-semibold"
      >
        Create Product
      </button>
    </form>
  );
}
