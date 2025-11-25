export default function ProductList({ products }) {
  if (!products || products.length === 0) return <p>No products found.</p>;

  return (
    <div className="overflow-x-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      <table className="min-w-full bg-white shadow-md rounded-xl">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left">ID</th>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Price</th>
            <th className="py-2 px-4 text-left">Stock</th>
            <th className="py-2 px-4 text-left">Sold</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">{p.id}</td>
              <td className="py-2 px-4">{p.name}</td>
              <td className="py-2 px-4">{p.price}</td>
              <td className="py-2 px-4">{p.stock_unit}</td>
              <td className="py-2 px-4">{p.sold}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
