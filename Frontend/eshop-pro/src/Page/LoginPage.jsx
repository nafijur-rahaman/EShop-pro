import React from "react";
// Using 'react-router-dom' as it's the standard for web applications
import { Link } from "react-router"; 

const LoginPage = () => {
  return (
    // Main wrapper to center the form on the page
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Form container */}
      <div className="max-w-md w-full space-y-8 bg-white p-10 shadow-md rounded-2xl">
        
        {/* Header */}
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Log in to <span className="text-blue-500">EShopPro</span>
          </h2>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          {/* Input fields */}
          <div className="rounded-2xl shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                // Styles borrowed from your Navbar's search input
                className="appearance-none relative block w-full px-4 h-10 border border-sky-300 placeholder-gray-500 text-gray-900 rounded-t-2xl focus:outline-none focus:bg-sky-50 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                // Styles borrowed from your Navbar's search input
                className="appearance-none relative block w-full px-4 h-10 border border-sky-300 placeholder-gray-500 text-gray-900 rounded-b-2xl focus:outline-none focus:bg-sky-50 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          {/* Forgot password link */}
          <div className="flex items-center justify-end">
            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              // Styles borrowed from your Navbar's search button
              className="group relative w-full flex justify-center h-10 px-4 border border-transparent text-sm font-bold rounded-2xl text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </form>

        {/* Sign Up Link */}
        <div className="text-sm text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            {/* This assumes your Sign Up page is at '/signup' */}
            <Link
              to="/signin"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign Up
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;