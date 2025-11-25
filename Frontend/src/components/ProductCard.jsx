import { Link } from "react-router";

export default function ProductCard({ product }) {
  if (!product) return null;

  return (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 p-5 flex flex-col items-center text-center w-64">
      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="relative w-full">
        <div className="w-full h-52 rounded-2xl overflow-hidden flex items-center justify-center bg-gray-100 group">
          <img
            src={product.images?.[0]?.image || "https://via.placeholder.com/200"}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Optional overlay on hover */}
          <div className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
        </div>
      </Link>

      {/* Product Info */}
      <h3 className="font-semibold text-lg text-gray-900 mt-4 line-clamp-2">
        {product.name}
      </h3>

      <p className="text-gray-500 text-sm mt-1 line-clamp-2">
        {product.description || "No description available."}
      </p>

      {/* Badges */}
      <div className="flex gap-2 mt-3">
        <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
          Stock: {product.stock_unit}
        </span>
        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
          Sold: {product.sold || 0}
        </span>
        <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
          ⭐ {product.review || 0}
        </span>
      </div>

      {/* Price */}
      <p className="text-xl font-bold text-gray-900 mt-3">₹{product.price}</p>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-4 w-full">
        <Link
          to={`/checkout?product=${product.id}`}
          className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 rounded-2xl font-semibold shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all text-sm"
        >
          Buy Now
        </Link>
        <button className="flex-1 border border-gray-300 py-2 rounded-2xl font-semibold hover:bg-gray-50 transition-all text-sm">
          Add Cart
        </button>
      </div>
    </div>
  );
}
