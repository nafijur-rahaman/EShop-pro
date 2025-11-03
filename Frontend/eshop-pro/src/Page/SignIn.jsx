import React, { useState, useContext } from "react";
// Corrected: Imports should come from 'react-router-dom' for web
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
// Added: Import for the Google icon
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

function SignUpForm() {
  // Added: Get loginWithGoogle from the context
  const { RegisterUser, updateUserProfile, loginWithGoogle } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setMessage({ text: "", type: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage({ text: "Passwords do not match!", type: "error" });
      return;
    }

    try {
      // Create user in Firebase
      await RegisterUser(formData.email, formData.password);

      // Update Firebase profile with display name
      await updateUserProfile(formData.userName, "");

      Swal.fire({
        title: "Drag me!",
        icon: "success",
        text: "Regestration Successfull",
      });

      navigate("/user");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Sign up Failed.",
        text: err.message,
      });
    }

    // Clear form
    setFormData({
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  // Added: Handler for Google Sign-Up
  const handleGoogleSignUp = async () => {
    try {
      await loginWithGoogle();
      // After Google sign-in, user is already logged in,
      // so we navigate them directly to their user page.
      navigate("/user");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Sign up Failed.",
        text: err.message,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Create Your Account in <span className="text-blue-500">EshopPro</span>
        </h2>

        {message.text && (
          <div
            className={`p-3 rounded-md text-center ${
              message.type === "error"
                ? "bg-red-100 text-red-600 border border-red-300"
                : "bg-green-100 text-green-600 border border-green-300"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ... (Your form inputs for userName, email, password, confirmPassword are unchanged) ... */}
          <div>
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-gray-700"
            >
              User Name
            </label>
            <input
              id="userName"
              name="userName"
              type="text"
              required
              value={formData.userName}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:scale-105 transition-transform transform cursor-pointer"
            >
              Sign Up
            </button>
          </div>
        </form>

        {/* --- Added: Divider --- */}
        <div className="relative flex items-center justify-center my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative px-3 bg-white text-sm text-gray-500">OR</div>
        </div>

        {/* --- Added: Google Sign-Up Button --- */}
        <div>
          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="w-full flex justify-center items-center px-4 py-2 font-semibold text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:scale-105 transition-transform transform cursor-pointer"
          >
            <FcGoogle className="mr-2 text-xl" />
            Sign up with Google
          </button>
        </div>
        {/* --- End of Added Section --- */}

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpForm;
