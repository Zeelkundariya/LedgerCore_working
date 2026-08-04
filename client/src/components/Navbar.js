"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store/useAuthStore';
import { Menu, X, Code2, LogOut, User, Sparkles, Map } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout, checkAuth } = useAuthStore();
  const pathname = usePathname();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const isActive = (path) => pathname === path;

  return (
    <nav className="fixed w-full z-[100] bg-white/90 backdrop-blur-xl border-b border-black/5 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-2"
            >
              <Code2 className="text-primary w-8 h-8" />
              <span className="font-bold text-xl text-primary tracking-tight">SkillSwap</span>
            </motion.div>
          </Link>

            <div className="hidden md:flex items-center gap-2">
              <Link 
                href="/explore" 
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${isActive('/explore') ? 'bg-primary text-white shadow-sm' : 'text-secondary hover:text-primary hover:bg-black/5'}`}
              >
                Explore
              </Link>
              <Link 
                href="/matches" 
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center ${isActive('/matches') ? 'bg-primary text-white shadow-sm' : 'text-secondary hover:text-primary hover:bg-black/5'}`}
              >
                <Sparkles className="w-4 h-4 mr-1.5" /> AI Match
              </Link>
              <Link 
                href="/roadmap" 
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center ${isActive('/roadmap') ? 'bg-primary text-white shadow-sm' : 'text-secondary hover:text-primary hover:bg-black/5'}`}
              >
                <Map className="w-4 h-4 mr-1.5" /> Roadmap
              </Link>

              {isAuthenticated ? (
              <div className="flex items-center gap-6 ml-4">
                {user?.role === 'ADMIN' && (
                  <Link href="/admin" className="text-red-500 font-bold hover:text-red-600 transition-colors">
                    Admin Panel
                  </Link>
                )}
                <Link href="/requests" className="text-secondary hover:text-primary font-medium transition-colors relative">
                  Requests
                  <span className="absolute -top-1 -right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                </Link>
                <Link href="/dashboard">
                  <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-1 text-secondary hover:text-primary font-medium transition-colors">
                    <User className="w-5 h-5" />
                    <span>{user?.name}</span>
                  </motion.div>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={logout}
                  className="flex items-center gap-1 text-red-500 hover:text-red-600 font-medium transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <Link href="/login" className="text-secondary hover:text-primary font-medium transition-colors">
                  Login
                </Link>
                <Link href="/register">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-primary hover:bg-[#152843] text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-md hover:shadow-lg"
                  >
                    Get Started
                  </motion.button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-primary hover:text-[#152843] p-2 transition-colors">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-black/5 shadow-2xl relative z-40 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-8 space-y-4">
              <Link href="/explore" onClick={() => setIsOpen(false)}>
                <span className="block text-secondary hover:text-primary py-2 font-medium">Explore</span>
              </Link>

              {isAuthenticated ? (
                <>
                  {user?.role === 'ADMIN' && (
                    <Link href="/admin" onClick={() => setIsOpen(false)}>
                      <span className="block text-red-500 font-bold hover:text-red-600 py-2">Admin Panel</span>
                    </Link>
                  )}
                  <Link href="/requests" onClick={() => setIsOpen(false)}>
                    <span className="block text-secondary hover:text-primary py-2 font-medium">Requests</span>
                  </Link>
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                    <span className="block text-secondary hover:text-primary py-2 font-medium">Dashboard</span>
                  </Link>
                  <button onClick={() => { logout(); setIsOpen(false); }} className="block text-red-500 hover:text-red-600 w-full text-left py-2 font-medium">
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-4 pt-4 border-t border-black/5">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <span className="block text-secondary hover:text-primary font-medium py-2">Login</span>
                  </Link>
                  <Link href="/register" onClick={() => setIsOpen(false)}>
                    <span className="block bg-primary hover:bg-[#152843] text-center rounded-xl py-3 text-white font-semibold transition-all shadow-md">
                      Get Started
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
