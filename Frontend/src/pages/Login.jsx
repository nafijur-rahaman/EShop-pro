import React, { useState } from 'react';
import { useAuth } from '../hook/useAuth';
import { useNavigate, Link } from 'react-router';

const Login = () => {
  const { login } = useAuth(); // AuthContext login function
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Call login from AuthContext
      await login(username, password);
      navigate('/profile-page'); // redirect after successful login
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT: Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white">
        <div className="w-full max-w-sm space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-neutral-500">Please enter your details to sign in.</p>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Username</label>
              <input 
                type="text" 
                placeholder="your username" 
                className="flex h-12 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-black"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium leading-none">Password</label>
                <Link to="/forgot-password" className="text-sm text-neutral-500 hover:text-black hover:underline">
                  Forgot password?
                </Link>
              </div>
              <input 
                type="password" 
                className="flex h-12 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center w-full h-12 rounded-md bg-neutral-900 text-sm font-medium text-white shadow hover:bg-black transition-colors"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>

            <button className="inline-flex items-center justify-center w-full h-12 rounded-md border border-neutral-200 bg-white text-sm font-medium text-neutral-900 shadow-sm hover:bg-neutral-50 transition-colors">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 mr-2" />
              Sign in with Google
            </button>
          </form>

          {/* Sign up link */}
          <div className="text-center text-sm text-neutral-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-black hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>

      {/* RIGHT: Image Section */}
      <div className="hidden lg:block w-1/2 relative bg-neutral-900">
        <img 
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1200" 
          alt="Fashion Editorial" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-12 left-12 text-white max-w-md">
          <blockquote className="text-xl font-medium italic mb-4">
            "Style is a way to say who you are without having to speak."
          </blockquote>
          <p className="text-sm text-neutral-400">— Rachel Zoe</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
