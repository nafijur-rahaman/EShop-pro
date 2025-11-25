import { useState } from "react";

export default function CategoryList({ categories, onDelete, onSave }) {
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  const startEdit = (category) => {
    setEditingId(category.id);
    setEditingName(category.name);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  const saveEdit = async () => {
    if (onSave) {
      await onSave({ id: editingId, name: editingName });
    }
    setEditingId(null);
    setEditingName("");
  };

  if (!categories || categories.length === 0)
    return (
      <p className="text-center text-gray-500 mt-6">No categories found.</p>
    );

  return (
    <div className="overflow-x-auto mt-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Category List
      </h2>
      <table className="min-w-full bg-white shadow-lg rounded-xl overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-6 text-left text-gray-700 uppercase tracking-wider">
              ID
            </th>
            <th className="py-3 px-6 text-left text-gray-700 uppercase tracking-wider">
              Name
            </th>
            <th className="py-3 px-6 text-center text-gray-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c, idx) => (
            <tr
              key={c.id}
              className={`border-b transition-all duration-200 ${
                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-blue-50`}
            >
              <td className="py-3 px-6 font-medium text-gray-700">{c.id}</td>
              <td className="py-3 px-6 text-gray-800">
                {editingId === c.id ? (
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                  />
                ) : (
                  c.name
                )}
              </td>
              <td className="py-3 px-6 text-center flex justify-center gap-2">
                {editingId === c.id ? (
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
                      onClick={() => startEdit(c)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete && onDelete(c)}
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
