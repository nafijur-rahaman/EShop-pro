import { useState } from "react";
import { useApi } from "../../hook/useApi";

export default function CreateCategoryForm() {
  const { post } = useApi();
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return; // Prevent empty submission
    try {
      await post("categories/", { name });
      alert("Category created successfully!");
      setName("");
    } catch (err) {
      console.error(err);
      alert("Failed to create category");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 shadow-lg rounded-2xl flex flex-col gap-6 max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center">Create Category</h2>

      <input
        type="text"
        placeholder="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg"
      >
        Create Category
      </button>
    </form>
  );
}
