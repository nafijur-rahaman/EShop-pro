import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div>
          <Link
            to="/"
            className="font-bold text-2xl cursor-pointer transform transition-transform duration-300 hover:scale-110"
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

        <div>
          <Link
            to="/signin"
            className="font-bold border-b-2 border-transparent hover:border-black cursor-pointer transform transition-transform hover:-translate-y-1 hover:scale-110"
          >
            Sign Up
          </Link>
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;
