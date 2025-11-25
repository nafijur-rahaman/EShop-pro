import { Link, NavLink, useNavigate } from "react-router";
import { useAuth } from "../hook/useAuth";
import { useState } from "react";
import { User as UserIcon } from "lucide-react";

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
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tight">
          EshopPro
        </Link>

        {/* Links */}
        <div className="hidden md:flex gap-6 text-gray-700">
          {["/", "/category", "/about"].map((path) => {
            const name = path === "/" ? "Home" : path.slice(1).charAt(0).toUpperCase() + path.slice(2);
            return (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  isActive ? "text-black font-semibold" : "hover:text-black"
                }
              >
                {name}
              </NavLink>
            );
          })}
        </div>

        {/* Search */}
        <div className="hidden md:block">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="border rounded-full px-4 py-1 w-64 shadow-sm"
          />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <Link to="/cart" className="hover:scale-105">🛒</Link>

          {user ? (
            <div
              onClick={() => navigate("/profile-page")}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-full"
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={`${user.first_name}'s avatar`}
                  className="w-8 h-8 rounded-full border object-cover"
                />
              ) : (
                <UserIcon className="w-8 h-8 text-gray-400" />
              )}
              <span className="hidden md:block font-medium text-gray-700">
                {user.first_name || "User"}
              </span>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-1 border rounded-full hover:bg-gray-100"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
