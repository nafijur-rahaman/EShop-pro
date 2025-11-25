import { Link, NavLink, useNavigate } from "react-router";
import { useAuth } from "../hook/useAuth";
import { useState } from "react";
import { User as UserIcon, Search, ShoppingCart } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => setSearchQuery(e.target.value);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight hover:opacity-90 transition"
        >
          EshopPro
        </Link>

        {/* Links */}
        <div className="hidden md:flex gap-8 text-gray-700 font-medium">
          {["/", "/category", "/about"].map((path) => {
            const name =
              path === "/" ? "Home" : path.slice(1).charAt(0).toUpperCase() + path.slice(2);

            return (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `relative transition ${
                    isActive ? "text-indigo-600 font-semibold" : "hover:text-indigo-600"
                  }`
                }
              >
                {name}
                {/* Underline on active */}
                {path !== "/" && (
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-indigo-500 transition-all group-hover:w-full"></span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 shadow-inner focus-within:ring-2 focus-within:ring-indigo-300 transition">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="bg-transparent outline-none ml-2 w-56 placeholder-gray-500 text-gray-700"
          />
        </div>

        {/* Right side icons */}
        <div className="flex items-center gap-4">

          {/* Cart */}
          <Link
            to="/cart"
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 shadow-sm hover:shadow transition flex items-center"
          >
            <ShoppingCart className="w-5 h-5 text-gray-700" />
          </Link>

          {/* User */}
          {user ? (
            <div
              onClick={() => navigate("/profile-page")}
              className="flex items-center gap-2 cursor-pointer bg-gray-100 py-1 px-3 rounded-full hover:bg-gray-200 shadow-sm hover:shadow transition"
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-8 h-8 rounded-full border object-cover"
                />
              ) : (
                <UserIcon className="w-7 h-7 text-gray-500" />
              )}
              <span className="hidden md:block font-medium text-gray-700">
                {user.first_name || "User"}
              </span>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-5 py-1.5 rounded-full border border-gray-300 font-medium text-gray-700 hover:bg-gray-100 shadow-sm hover:shadow transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
