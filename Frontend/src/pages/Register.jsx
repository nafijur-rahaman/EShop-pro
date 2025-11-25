import React, { useState } from 'react';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAuth } from '../hook/UseAuth';


const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await register(formData.username, formData.email, formData.password);
      alert("Account created successfully!");
      navigate('/login'); 
    } catch (err) {
      console.error(err);
      setError(err.response?.data || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 relative">
        <div className="w-full max-w-sm space-y-8 animate-fade-in">
          <h1 className="text-3xl font-bold tracking-tight">Create your account</h1>
          <p className="text-neutral-500">Enter your details to sign up.</p>

          {error && <p className="text-red-500 text-sm">{JSON.stringify(error)}</p>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium leading-none">Username</label>
              <input 
                type="text"
                name="username"
                placeholder="johndoe"
                value={formData.username}
                onChange={handleChange}
                className="flex h-12 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium leading-none">Email Address</label>
              <input 
                type="email"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                className="flex h-12 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium leading-none">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="flex h-12 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200 pr-10"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="text-[11px] text-neutral-400 mt-1">Must be at least 8 characters.</p>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="group relative w-full h-12 flex items-center justify-center rounded-lg bg-neutral-900 text-white font-medium text-sm transition-all duration-200 hover:bg-black hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed mt-6"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Create Account <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <div className="hidden lg:block w-1/2 relative bg-neutral-100">
        <img 
          src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=1600" 
          alt="Fashion Editorial" 
          className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
        />
      </div>
    </div>
  );
};

export default Register;
