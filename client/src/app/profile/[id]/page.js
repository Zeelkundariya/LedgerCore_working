"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/useAuthStore';
import { User, MapPin, ArrowLeft, Star, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';

export default function ProfileView() {
  const params = useParams();
  const id = params?.id;
  
  const router = useRouter();
  const { user: currentUser, checkAuth } = useAuthStore();
  
  const [targetUser, setTargetUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  if (loading) {
    return <div className="flex-grow flex items-center justify-center min-h-[calc(100vh-4rem)]"><div className="animate-pulse w-12 h-12 bg-primary rounded-full"></div></div>;
  }

  if (error || !targetUser) {
    return (
      <div className="flex-grow max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Oops!</h2>
        <p className="text-secondary mb-8">{error || 'User not found'}</p>
        <Link href="/matches">
          <button className="px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-sm hover:bg-[#152843]">
            Go Back
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/matches" className="inline-flex items-center text-secondary hover:text-primary font-bold mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Matches
      </Link>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl border border-black/10 shadow-lg overflow-hidden"
      >
        {/* Banner */}
        <div className="h-48 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative">
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
        
        <div className="px-8 pb-10 relative">
          {/* Avatar */}
          <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-xl flex items-center justify-center absolute -top-16 overflow-hidden z-10">
            {targetUser.profilePicture ? (
              <img src={targetUser.profilePicture} alt={targetUser.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary to-blue-800 flex items-center justify-center text-white text-4xl font-bold">
                {targetUser.name.charAt(0)}
              </div>
            )}
          </div>
          
          <div className="mt-20 flex flex-col md:flex-row md:justify-between md:items-start gap-6">
            <div>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight">{targetUser.name}</h1>
              <div className="flex items-center gap-4 text-gray-500 font-medium mt-3">
                <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm"><MapPin className="w-4 h-4 mr-1 text-primary" /> {targetUser.location || 'Remote'}</span>
                <span className="flex items-center bg-yellow-50 px-3 py-1 rounded-full text-yellow-700 text-sm"><Star className="w-4 h-4 mr-1 text-yellow-500 fill-yellow-500" /> 5.0 (12 Reviews)</span>
              </div>
            </div>
            
            <Link href={`/swap/${targetUser._id}`}>
              <button className="px-8 py-3 bg-primary text-white font-black rounded-xl hover:bg-[#152843] transition-colors shadow-md flex items-center group">
                <Zap className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" /> Request Swap
              </button>
            </Link>
          </div>
          
          {/* Badges Section */}
          <div className="mt-12 flex flex-wrap gap-3">
            <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-sm rounded-full shadow-sm">
              <ShieldCheck className="w-4 h-4 mr-2" /> Verified Member
            </span>
            <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-sm rounded-full shadow-sm">
              <Star className="w-4 h-4 mr-2" /> Top Teacher
            </span>
            <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-sm rounded-full shadow-sm">
              <Zap className="w-4 h-4 mr-2" /> Fast Responder
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
              <h3 className="text-lg font-black text-blue-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-blue-200 text-blue-700 rounded-lg flex items-center justify-center mr-3">🎓</span>
                Can Teach
              </h3>
              <div className="flex flex-wrap gap-2">
                {targetUser.skillsOffered.length > 0 ? targetUser.skillsOffered.map(skill => (
                  <span key={skill} className="px-4 py-2 bg-white text-blue-700 font-bold text-sm rounded-xl border border-blue-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-default">
                    {skill}
                  </span>
                )) : <span className="text-gray-500 italic">No skills listed yet.</span>}
              </div>
            </div>
            
            <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-100">
              <h3 className="text-lg font-black text-purple-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-purple-200 text-purple-700 rounded-lg flex items-center justify-center mr-3">🚀</span>
                Wants to Learn
              </h3>
              <div className="flex flex-wrap gap-2">
                {targetUser.skillsWanted.length > 0 ? targetUser.skillsWanted.map(skill => (
                  <span key={skill} className="px-4 py-2 bg-white text-purple-700 font-bold text-sm rounded-xl border border-purple-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-default">
                    {skill}
                  </span>
                )) : <span className="text-gray-500 italic">No skills listed yet.</span>}
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-black/5">
            <h3 className="text-sm font-bold text-secondary uppercase tracking-widest mb-4">Community Trust</h3>
            <div className="flex gap-4">
              <span className="inline-flex items-center px-3 py-1 bg-green-50 text-green-700 font-bold text-sm rounded-full border border-green-200">
                <ShieldCheck className="w-4 h-4 mr-1" /> Verified Member
              </span>
              <span className="inline-flex items-center px-3 py-1 bg-green-50 text-green-700 font-bold text-sm rounded-full border border-green-200">
                <ShieldCheck className="w-4 h-4 mr-1" /> Fast Responder
              </span>
            </div>
          </div>
          
        </div>
      </motion.div>
    </div>
  );
}
