import { Link } from "react-router";

// Hardcoded images mapped by lowercase category name
const categoryImages = {
  electronics: "/images/electronics.jpg",
  woman: "/images/woman.jpg",
  man: "/images/man.jpg",
  groceries: "/images/groceries.jpg"
};

export default function CategoriesGrid({ categories, onCategoryClick }) {
  if (!categories || categories.length === 0)
    return (
      <p className="col-span-full text-center text-gray-400 mt-12">
        No categories available.
      </p>
    );

  return (
    <section className="mt-12 max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Explore Categories
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {categories.map((cat) => {
          if (!cat.name) return null; // skip invalid categories

          // Normalize name to lowercase for mapping
          const imageUrl =
            categoryImages[cat.name.toLowerCase()] || "https://via.placeholder.com/200";

          const content = (
            <div className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              {/* Category Image */}
              <img
                src={imageUrl}
                alt={cat.name}
                className="w-full h-40 object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end justify-center p-3 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white font-semibold text-center text-lg truncate">
                  {cat.name}
                </p>
              </div>
            </div>
          );

          return onCategoryClick ? (
            <button
              key={cat.name}
              type="button"
              onClick={() => onCategoryClick(cat.id)}
            >
              {content}
            </button>
          ) : (
            <Link key={cat.name} to={`/category/${cat.id}`}>
              {content}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
