import React, { useContext } from "react";
import { Link, useNavigate } from "react-router"; // Corrected: use react-router-dom
import { AuthContext } from "../Context/AuthContext"; // Import the context
import { FaUserCircle } from "react-icons/fa"; // Import a user icon

const Navbar = () => {
  // Get the user state and LogoutUser function from the context
  const { user, LogoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await LogoutUser();
      navigate("/"); // Redirect to homepage after logout
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div>
          <Link
            to="/"
            className="font-bold text-blue-500 text-2xl cursor-pointer transform transition-transform duration-300 hover:scale-110"
          >
            EShopPro
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex">
          <ul className="flex space-x-8 text-black font-medium">
            <li className="border-b-2 border-transparent hover:border-black cursor-pointer transform transition-transform hover:-translate-y-1 hover:scale-110">
              <Link to="/">Home</Link>
            </li>
            <li className="border-b-2 border-transparent hover:border-black cursor-pointer transform transition-transform hover:-translate-y-1 hover:scale-110">
              <Link to="/catagories">Category</Link>
            </li>
            <li className="border-b-2 border-transparent hover:border-black cursor-pointer transform transition-transform hover:-translate-y-1 hover:scale-110">
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>

        {/* Search Bar */}
        <div className="flex items-stretch w-full max-w-sm ml-4 transform transition-transform hover:-translate-y-1 hover:scale-110">
          <input
            type="text"
            placeholder="Search..."
            className="grow border border-sky-300 rounded-l-2xl px-4 h-10 focus:outline-none focus:bg-sky-50 hover:bg-sky-50 transition-transform duration-200"
          />
          <button className="bg-blue-500 text-white font-bold rounded-r-2xl px-4 h-10 hover:bg-blue-600 transition-colors duration-200 cursor-pointer">
            Search
          </button>
        </div>

        {/* --- DYNAMIC AUTH SECTION --- */}
        <div className="flex items-center space-x-4 ml-4">
          {user ? (
            // If user IS logged in
            <>
              <Link
                to="/user"
                className="text-gray-700 hover:text-blue-500 transition transform hover:scale-110"
                title="Go to Profile"
              >
                <FaUserCircle className="text-3xl" />
              </Link>
              <button
                onClick={handleLogout}
                className="font-medium text-gray-700 hover:text-red-500 transition whitespace-nowrap"
              >
                Logout
              </button>
            </>
          ) : (
            // If user is NOT logged in
            <>
              <Link
                to="/login" // Assuming '/login' is the route for your LoginPage
                className="font-medium text-gray-700 hover:text-blue-500 transition whitespace-nowrap"
              >
                Sign In
              </Link>
              <Link
                to="/signup" // From your LoginPage component
                className="font-bold bg-blue-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-600 transition whitespace-nowrap"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;