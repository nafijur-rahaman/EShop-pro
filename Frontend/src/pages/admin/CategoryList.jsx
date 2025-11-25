export default function CategoryList({ categories }) {
  if (!categories || categories.length === 0) return <p>No categories found.</p>;

  return (
    <div className="overflow-x-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">Category List</h2>
      <table className="min-w-full bg-white shadow-md rounded-xl">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left">ID</th>
            <th className="py-2 px-4 text-left">Name</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => (
            <tr key={c.id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">{c.id}</td>
              <td className="py-2 px-4">{c.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
