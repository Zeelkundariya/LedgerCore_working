"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/useAuthStore';
import { User, Send, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';

export default function RequestSwap() {
  // Fix for Next.js 15+ where params is a Promise
  const params = useParams();
  const id = params?.id;
  
  const router = useRouter();
  const { user, checkAuth } = useAuthStore();
  
  const [targetUser, setTargetUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  // Form State
  const [message, setMessage] = useState('');
  const [selectedOffered, setSelectedOffered] = useState([]);
  const [selectedWanted, setSelectedWanted] = useState([]);

  useEffect(() => {
    checkAuth();
    if (!localStorage.getItem('token')) {
      router.push('/login');
    } else if (id) {
      fetchTargetUser(id);
    }
  }, [id]);

  const fetchTargetUser = async (userId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/search`);
      const allUsers = await res.json();
      const found = allUsers.find(u => u._id === userId);
      if (found) {
        setTargetUser(found);
      } else {
        setError('User not found.');
      }
    } catch (err) {
      setError('Error fetching user.');
    } finally {
      setLoading(false);
    }
  };

  const toggleSelection = (skill, list, setList) => {
    if (list.includes(skill)) {
      setList(list.filter(s => s !== skill));
    } else {
      setList([...list, skill]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedOffered.length === 0 || selectedWanted.length === 0) {
      setError('Please select at least one skill you offer and one skill you want.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/swaps/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          receiverId: targetUser._id,
          message,
          offeredSkills: selectedOffered,
          requestedSkills: selectedWanted
        })
      });

      if (res.ok) {
        router.push('/requests');
      } else {
        const data = await res.json();
        setError(data.message || 'Failed to send request');
      }
    } catch (err) {
      setError('An error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="flex-grow flex items-center justify-center min-h-[calc(100vh-4rem)]"><div className="animate-pulse w-12 h-12 bg-primary rounded-full"></div></div>;
  }

  if (!targetUser) {
    return <div className="flex-grow flex items-center justify-center min-h-[calc(100vh-4rem)] text-xl">User not found</div>;
  }

  return (
    <div className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none"></div>

      <Link href="/explore" className="inline-flex items-center text-text-secondary hover:text-white mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Explore
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glassmorphism rounded-3xl p-8 border border-white/10 shadow-2xl relative z-10"
      >
        <div className="flex items-center space-x-4 mb-8 pb-8 border-b border-white/10">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
            <User className="text-primary w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Request Swap with {targetUser.name}</h1>
            <p className="text-text-secondary">Propose a skill exchange</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-purple-400">1. What skills do you want from them?</h3>
            <div className="flex flex-wrap gap-3">
              {targetUser.skillsOffered.map(skill => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => toggleSelection(skill, selectedWanted, setSelectedWanted)}
                  className={`px-4 py-2 rounded-xl border transition-all ${selectedWanted.includes(skill) ? 'bg-purple-500/20 border-purple-500 text-purple-200 shadow-[0_0_10px_rgba(168,85,247,0.3)]' : 'bg-surface border-white/10 text-gray-400 hover:border-purple-500/50'}`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-green-400">2. What skills can you offer them in return?</h3>
            <p className="text-sm text-text-secondary mb-3">These are the skills they are looking for, or you can offer your other skills.</p>
            <div className="flex flex-wrap gap-3">
              {user?.skillsOffered?.map(skill => {
                const isHighlyDesired = targetUser.skillsWanted.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSelection(skill, selectedOffered, setSelectedOffered)}
                    className={`px-4 py-2 rounded-xl border transition-all ${selectedOffered.includes(skill) ? 'bg-green-500/20 border-green-500 text-green-200 shadow-[0_0_10px_rgba(34,197,94,0.3)]' : 'bg-surface border-white/10 text-gray-400 hover:border-green-500/50'}`}
                  >
                    {skill} {isHighlyDesired && '⭐'}
                  </button>
                )
              })}
            </div>
            {(!user?.skillsOffered || user.skillsOffered.length === 0) && (
              <p className="text-yellow-400 text-sm mt-2">You haven't listed any offered skills on your profile yet.</p>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-white">3. Send a message</h3>
            <textarea
              className="w-full px-4 py-3 bg-surface border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-white transition-all h-32"
              placeholder="Hi! I'd love to learn React from you. In return, I can teach you Spanish..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={submitting}
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(139,92,246,0.3)] flex items-center justify-center disabled:opacity-50"
          >
            <Send className="w-5 h-5 mr-2" /> {submitting ? 'Sending Request...' : 'Send Swap Request'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
