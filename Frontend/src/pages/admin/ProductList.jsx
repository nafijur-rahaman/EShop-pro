import { useState } from "react";

export default function ProductList({ products, onDelete, onSave }) {
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState({
    name: "",
    price: 0,
    stock_unit: 0,
    sold: 0,
  });

  const startEdit = (product) => {
    setEditingId(product.id);
    setEditingData({
      name: product.name,
      price: product.price,
      stock_unit: product.stock_unit,
      sold: product.sold,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingData({ name: "", price: 0, stock_unit: 0, sold: 0 });
  };

  const saveEdit = async () => {
    if (onSave) {
      await onSave({ id: editingId, ...editingData });
    }
    cancelEdit();
  };

  if (!products || products.length === 0)
    return <p className="text-center text-gray-500 mt-6">No products found.</p>;

  return (
    <div className="overflow-x-auto mt-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Product List</h2>
      <table className="min-w-full bg-white shadow-lg rounded-xl overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-6 text-left text-gray-700 uppercase tracking-wider">ID</th>
            <th className="py-3 px-6 text-left text-gray-700 uppercase tracking-wider">Name</th>
            <th className="py-3 px-6 text-left text-gray-700 uppercase tracking-wider">Price</th>
            <th className="py-3 px-6 text-left text-gray-700 uppercase tracking-wider">Stock</th>
            <th className="py-3 px-6 text-left text-gray-700 uppercase tracking-wider">Sold</th>
            <th className="py-3 px-6 text-center text-gray-700 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, idx) => (
            <tr
              key={p.id}
              className={`border-b transition-all duration-200 ${
                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-blue-50`}
            >
              <td className="py-3 px-6 font-medium text-gray-700">{p.id}</td>
              <td className="py-3 px-6">
                {editingId === p.id ? (
                  <input
                    type="text"
                    value={editingData.name}
                    onChange={(e) =>
                      setEditingData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="border rounded px-2 py-1 w-full"
                  />
                ) : (
                  p.name
                )}
              </td>
              <td className="py-3 px-6">
                {editingId === p.id ? (
                  <input
                    type="number"
                    value={editingData.price}
                    onChange={(e) =>
                      setEditingData((prev) => ({ ...prev, price: Number(e.target.value) }))
                    }
                    className="border rounded px-2 py-1 w-full"
                  />
                ) : (
                  `$${p.price}`
                )}
              </td>
              <td className="py-3 px-6">
                {editingId === p.id ? (
                  <input
                    type="number"
                    value={editingData.stock_unit}
                    onChange={(e) =>
                      setEditingData((prev) => ({ ...prev, stock_unit: Number(e.target.value) }))
                    }
                    className="border rounded px-2 py-1 w-full"
                  />
                ) : (
                  p.stock_unit
                )}
              </td>
              <td className="py-3 px-6">
                {editingId === p.id ? (
                  <input
                    type="number"
                    value={editingData.sold}
                    onChange={(e) =>
                      setEditingData((prev) => ({ ...prev, sold: Number(e.target.value) }))
                    }
                    className="border rounded px-2 py-1 w-full"
                  />
                ) : (
                  p.sold
                )}
              </td>
              <td className="py-3 px-6 flex justify-center gap-2">
                {editingId === p.id ? (
                  <>
                    <button
                      onClick={saveEdit}
                      className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-400 transition"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEdit(p)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete && onDelete(p)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
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
}
