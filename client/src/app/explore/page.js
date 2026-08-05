"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

export default function Explore() {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Popular skills to filter quickly
  const popularSkills = ['React', 'Design', 'Spanish', 'Python', 'Guitar', 'Marketing'];

  const router = useRouter();
  const { checkAuth, logout } = useAuthStore();

  useEffect(() => {
    checkAuth();
    if (!localStorage.getItem('token')) {
      router.push('/login');
    } else {
      searchUsers('');
    }
  }, []);

  const [error, setError] = useState(null);

  const searchUsers = async (searchQuery) => {
    setLoading(true);
    setError(null);
    try {
      const url = searchQuery
        ? `http://localhost:5000/api/users/search?skill=${searchQuery}`
        : 'http://localhost:5000/api/users/search';

      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const res = await fetch(url, { headers });
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      } else if (res.status === 401) {
        logout();
        router.push('/login');
      } else {
        setError('Failed to fetch data from the server.');
      }
    } catch (err) {
      setError('Could not connect to the server. Make sure the backend is running.');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchUsers(query);
  };

  return (
    <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 relative z-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Skills</h1>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
          Discover talented individuals offering the skills you want to learn.
        </p>

        <form onSubmit={handleSearch} className="mt-8 max-w-2xl mx-auto relative">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full pl-12 pr-4 py-4 bg-surface border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary text-white text-lg transition-all shadow-lg"
              placeholder="Search for a skill (e.g. React, Spanish)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute inset-y-2 right-2 px-6 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {popularSkills.map(skill => (
            <motion.button
              key={skill}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setQuery(skill); searchUsers(skill); }}
              className="px-4 py-2 glassmorphism rounded-full text-sm font-medium hover:bg-white/10 transition-colors"
            >
              {skill}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Results Grid */}
      <div className="relative z-10 min-h-[400px]">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse w-12 h-12 bg-primary rounded-full"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20 glassmorphism rounded-3xl border border-red-500/20 bg-red-500/5">
            <h3 className="text-2xl font-semibold mb-2 text-red-400">Connection Error</h3>
            <p className="text-text-secondary">{error}</p>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-20 glassmorphism rounded-3xl">
            <h3 className="text-2xl font-semibold mb-2">No users found</h3>
            <p className="text-text-secondary">Try searching for a different skill.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map(user => (
              <motion.div 
                key={user._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-black/5 hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
                    {user.profilePicture ? (
                      <img src={user.profilePicture} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <User className="w-6 h-6 text-primary" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-primary">{user.name}</h3>
                    <div className="flex items-center text-secondary text-sm">
                      <MapPin className="w-3 h-3 mr-1" />
                      {user.location || 'Remote'}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 flex-grow">
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-secondary font-bold mb-2">Offers</h4>
                    <div className="flex flex-wrap gap-2">
                      {user.skillsOffered.slice(0, 3).map(s => (
                        <span key={s} className="px-2 py-1 bg-primary/5 rounded-md text-xs font-medium text-primary border border-primary/10">{s}</span>
                      ))}
                      {user.skillsOffered.length > 3 && <span className="px-2 py-1 text-xs text-secondary font-medium">+{user.skillsOffered.length - 3}</span>}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-secondary font-bold mb-2">Wants</h4>
                    <div className="flex flex-wrap gap-2">
                      {user.skillsWanted.slice(0, 3).map(s => (
                        <span key={s} className="px-2 py-1 bg-black/5 rounded-md text-xs font-medium text-black/70 border border-black/10">{s}</span>
                      ))}
                      {user.skillsWanted.length > 3 && <span className="px-2 py-1 text-xs text-secondary font-medium">+{user.skillsWanted.length - 3}</span>}
                    </div>
                  </div>
                </div>

                <Link href={`/swap/${user._id}`} className="mt-6 w-full">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2.5 bg-primary hover:bg-[#152843] text-white rounded-xl text-sm font-bold transition-all shadow-sm flex justify-center items-center group"
                  >
                    Request Swap <ArrowRight className="w-4 h-4 ml-1 opacity-70 group-hover:opacity-100 transition-all translate-x-0 group-hover:translate-x-1" />
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
