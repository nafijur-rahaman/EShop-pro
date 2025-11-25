import { Link } from "react-router";

export default function CategoriesGrid({ categories, onCategoryClick }) {
  if (!categories || categories.length === 0)
    return (
      <p className="col-span-full text-center text-gray-500 mt-6">
        No categories available.
      </p>
    );

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold mb-6 text-center">Categories</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {categories.map((cat) => {
          if (!cat.id) return null; // skip invalid categories

          const content = (
            <div className="bg-white border rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition flex flex-col items-center justify-center p-4 text-center w-40">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-3 flex items-center justify-center">
                <img
                  src={cat.image || "https://via.placeholder.com/150"}
                  className="w-full h-full object-cover"
                  alt={cat.name}
                />
              </div>
              <p className="font-medium">{cat.name}</p>
            </div>
          );

          return onCategoryClick ? (
            <button
              key={cat.id}
              type="button"
              onClick={() => onCategoryClick(cat.id)}
            >
              {content}
            </button>
          ) : (
            <Link key={cat.id} to={`/category/${cat.id}`}>
              {content}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
