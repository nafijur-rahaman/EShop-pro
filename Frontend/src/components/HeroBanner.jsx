export default function HeroBanner({ image }) {
  return (
    <section className="mt-6">
      <div className="w-full h-60 md:h-80 rounded-xl overflow-hidden shadow-md">
        <img
          src={image || "https://images.unsplash.com/photo-1542834369-f10ebf06d3cb?w=1600"}
          className="w-full h-full object-cover hover:scale-105 transition duration-500"
          alt="Hero Banner"
        />
      </div>
    </section>
  );
}
