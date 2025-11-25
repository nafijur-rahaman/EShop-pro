import ProductCard from "./ProductCard";

export default function ProductsGrid({ products, visibleCount, loadMore }) {
  if (!products || products.length === 0)
    return <p className="text-center text-gray-500 mt-6">No products available.</p>;

  return (
    <section className="mt-14 mb-20">
      <h2 className="text-2xl font-semibold mb-6">Just For You</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.slice(0, visibleCount).map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>

      {visibleCount < products.length && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={loadMore}
            className="px-6 py-2 border rounded-full hover:bg-gray-100"
          >
            Show More
          </button>
        </div>
      )}
    </section>
  );
}
