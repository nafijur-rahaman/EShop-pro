import { Link, NavLink, useNavigate } from "react-router";
import { useAuth } from "../hook/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tight">
          EshopPro
        </Link>

        {/* Links */}
        <div className="hidden md:flex gap-6 text-gray-700">
          <NavLink to="/" className="hover:text-black">Home</NavLink>
          <NavLink to="/categories" className="hover:text-black">Categories</NavLink>
          <NavLink to="/about" className="hover:text-black">About Us</NavLink>
        </div>

        {/* Search Bar */}
        <div className="hidden md:block">
          <input
            type="text"
            placeholder="Search products..."
            className="border rounded-full px-4 py-1 w-64 shadow-sm"
          />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          
          {/* Cart */}
          <Link to="/cart" className="hover:scale-105">
            🛒
          </Link>

          {/* User Auth */}
          {user ? (
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="px-4 py-1 border rounded-full hover:bg-gray-100"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="px-4 py-1 border rounded-full hover:bg-gray-100">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
