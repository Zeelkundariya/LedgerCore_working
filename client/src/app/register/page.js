"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { User, Mail, Lock, Sparkles, Zap, Globe, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const login = useAuthStore(state => state.login);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.toLowerCase().endsWith('@gmail.com')) {
      setError('Please use a valid @gmail.com address');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      login(data);
      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#F7F6F3]">
      
      {/* Left Side: Brand & Value Prop Panel */}
      <div className="hidden lg:flex w-1/2 bg-primary relative overflow-hidden items-center justify-center p-12">
        {/* Subtle grid on dark bg */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
        
        <div className="relative z-10 max-w-lg text-white">
          <Link href="/" className="inline-block mb-12">
            <span className="font-bold text-2xl tracking-tight">SkillSwap</span>
          </Link>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-xs font-bold uppercase tracking-widest text-white">Join the Elite Network</span>
            </div>
            
            <h1 className="text-5xl font-bold mb-6 leading-tight tracking-tight">
              Level up your career today.
            </h1>
            
            <p className="text-xl text-white/80 font-light leading-relaxed mb-12">
              Create an account in seconds. Trade your expertise, learn from industry leaders, and accelerate your growth—all without spending a dime.
            </p>

            <div className="space-y-4">
              {[
                { icon: Globe, text: "Connect with global experts" },
                { icon: Zap, text: "Instant real-time messaging & video" },
                { icon: ShieldCheck, text: "Verified reviews and ratings" }
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  className="flex items-center space-x-4 bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm"
                >
                  <div className="bg-white/10 p-2.5 rounded-lg">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium text-white/90">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side: Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 xl:p-24 bg-white relative">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden mb-12">
            <Link href="/" className="font-bold text-2xl text-primary tracking-tight">
              SkillSwap
            </Link>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-bold text-primary mb-3 tracking-tight">Create Account</h2>
            <p className="text-secondary font-medium">Start your skill-swapping journey today.</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm font-medium"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-primary block">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-secondary group-focus-within:text-primary transition-colors">
                  <User className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  required
                  autoComplete="name"
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-primary transition-all placeholder:text-black/30 font-medium shadow-sm"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-primary block">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-secondary group-focus-within:text-primary transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-primary transition-all placeholder:text-black/30 font-medium shadow-sm"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <p className="text-[11px] text-secondary/70 font-medium ml-1">* Only @gmail.com accounts are supported</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-primary block">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-secondary group-focus-within:text-primary transition-colors">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type="password"
                  required
                  autoComplete="new-password"
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-primary transition-all placeholder:text-black/30 font-medium shadow-sm"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-primary block">Confirm Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-secondary group-focus-within:text-primary transition-colors">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type="password"
                  required
                  autoComplete="new-password"
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-primary transition-all placeholder:text-black/30 font-medium shadow-sm"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={loading}
              type="submit"
              className="w-full py-4 mt-4 bg-primary hover:bg-[#152843] text-white rounded-xl font-bold text-lg shadow-md hover:shadow-xl transition-all disabled:opacity-70 flex justify-center items-center group"
            >
              {loading ? (
                <span className="flex items-center space-x-2">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </span>
              ) : (
                <span className="flex items-center justify-center w-full">
                  Create Account
                  <ArrowRight className="ml-2 w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </span>
              )}
            </motion.button>
          </form>

          <p className="text-center mt-10 text-secondary font-medium">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:text-[#152843] font-bold transition-colors underline decoration-primary/30 underline-offset-4">
              Log in instead
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
