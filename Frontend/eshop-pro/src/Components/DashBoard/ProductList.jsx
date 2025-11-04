import React, { useState, useEffect } from "react";
import { useApi } from "../../hooks/UseApi";

const ProductList = () => {
  const { get, put, del } = useApi();
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  // Fetch products
  const fetchProducts = async () => {
    const data = await get("/products/");
    if (data) setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Start editing a row
  const handleEditClick = (product) => {
    setEditingId(product.id);
    setEditData({ ...product });
  };

  // Handle changes in editable fields
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  // Save edited product
  const handleSave = async (id) => {
    await put(`/products/${id}/`, editData);
    setEditingId(null);
    fetchProducts();
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    await del(`/products/${id}/`);
    fetchProducts();
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">All Products</h3>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2">ID</th>
            <th className="border-b p-2">Name</th>
            <th className="border-b p-2">Price</th>
            <th className="border-b p-2">Stock</th>
            <th className="border-b p-2">Category</th>
            <th className="border-b p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td className="border-b p-2">{p.id}</td>
              <td className="border-b p-2">
                {editingId === p.id ? (
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleEditChange}
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  p.name
                )}
              </td>
              <td className="border-b p-2">
                {editingId === p.id ? (
                  <input
                    type="number"
                    name="price"
                    value={editData.price}
                    onChange={handleEditChange}
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  `$${p.price}`
                )}
              </td>
              <td className="border-b p-2">
                {editingId === p.id ? (
                  <input
                    type="number"
                    name="stock_unit"
                    value={editData.stock_unit}
                    onChange={handleEditChange}
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  p.stock_unit
                )}
              </td>
              <td className="border-b p-2">
                {editingId === p.id ? (
                  <input
                    type="number"
                    name="category"
                    value={editData.category}
                    onChange={handleEditChange}
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  p.category
                )}
              </td>
              <td className="border-b p-2 space-x-2">
                {editingId === p.id ? (
                  <>
                    <button
                      onClick={() => handleSave(p.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditClick(p)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
