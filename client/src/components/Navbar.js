"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store/useAuthStore';
import { Menu, X, Code2, LogOut, User } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <nav className="fixed w-full z-[100] bg-surface/90 backdrop-blur-xl border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <Code2 className="text-primary w-8 h-8" />
              <span className="font-bold text-xl text-gradient">SkillSwap</span>
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/explore" className="text-text-secondary hover:text-white transition-colors">
              Explore
            </Link>
            
            {isAuthenticated ? (
              <div className="flex items-center gap-6">
                {user?.role === 'ADMIN' && (
                  <Link href="/admin" className="text-red-400 font-bold hover:text-red-300 transition-colors">
                    Admin Panel
                  </Link>
                )}
                <Link href="/requests" className="text-text-secondary hover:text-white transition-colors relative">
                  Requests
                  <span className="absolute -top-1 -right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                </Link>
                <Link href="/dashboard">
                  <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-1 text-text-secondary hover:text-white">
                    <User className="w-5 h-5" />
                    <span>{user?.name}</span>
                  </motion.div>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={logout}
                  className="flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <Link href="/login" className="text-text-secondary hover:text-white transition-colors font-medium">
                  Login
                </Link>
                <Link href="/register">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                  >
                    Get Started
                  </motion.button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-text-secondary hover:text-white p-2">
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
            className="md:hidden bg-surface border-t border-white/10 shadow-2xl relative z-40 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              <Link href="/explore" onClick={() => setIsOpen(false)}>
                <span className="block text-text-secondary hover:text-white pt-2 font-medium">Explore</span>
              </Link>
              
              {isAuthenticated ? (
                <>
                  {user?.role === 'ADMIN' && (
                    <Link href="/admin" onClick={() => setIsOpen(false)}>
                      <span className="block text-red-400 font-bold hover:text-red-300 pt-2">Admin Panel</span>
                    </Link>
                  )}
                  <Link href="/requests" onClick={() => setIsOpen(false)}>
                    <span className="block text-text-secondary hover:text-white pt-2 font-medium">Requests</span>
                  </Link>
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                    <span className="block text-text-secondary hover:text-white pt-2 font-medium">Dashboard</span>
                  </Link>
                  <button onClick={() => { logout(); setIsOpen(false); }} className="block text-red-400 hover:text-red-300 w-full text-left pt-2 font-medium">
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-4 pt-2">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <span className="block text-text-secondary hover:text-white font-medium">Login</span>
                  </Link>
                  <Link href="/register" onClick={() => setIsOpen(false)}>
                    <span className="block bg-primary hover:bg-primary-dark text-center rounded-xl py-3 text-white font-semibold transition-colors">
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
