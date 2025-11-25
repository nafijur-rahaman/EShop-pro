export default function StatsCard({ title, value }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center justify-center">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-2xl font-bold mt-2">{value}</h2>
    </div>
  );
}
