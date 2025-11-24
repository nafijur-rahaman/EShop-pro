import React from 'react';
import { ArrowRight } from 'lucide-react';

const Login = () => {
  return (
    <div className="min-h-screen flex">
      
      {/* LEFT: Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white">
        <div className="w-full max-w-sm space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-neutral-500">Please enter your details to sign in.</p>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Email</label>
              <input 
                type="email" 
                placeholder="name@example.com" 
                className="flex h-12 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium leading-none">Password</label>
                <a href="#" className="text-sm text-neutral-500 hover:text-black hover:underline">Forgot password?</a>
              </div>
              <input 
                type="password" 
                className="flex h-12 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <button className="inline-flex items-center justify-center w-full h-12 rounded-md bg-neutral-900 text-sm font-medium text-white shadow hover:bg-black transition-colors">
              Sign In
            </button>

            <button className="inline-flex items-center justify-center w-full h-12 rounded-md border border-neutral-200 bg-white text-sm font-medium text-neutral-900 shadow-sm hover:bg-neutral-50 transition-colors">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 mr-2" />
              Sign in with Google
            </button>
          </form>

          <div className="text-center text-sm text-neutral-500">
            Don't have an account? <a href="#" className="font-semibold text-black hover:underline">Sign up</a>
          </div>
        </div>
      </div>

      {/* RIGHT: Image Section (Hidden on Mobile) */}
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