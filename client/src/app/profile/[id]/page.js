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
        <div className="h-32 bg-primary/5"></div>
        
        <div className="px-8 pb-10 relative">
          {/* Avatar */}
          <div className="w-24 h-24 bg-white rounded-full border-4 border-white shadow-md flex items-center justify-center absolute -top-12 overflow-hidden">
            {targetUser.profilePicture ? (
              <img src={targetUser.profilePicture} alt={targetUser.name} className="w-full h-full object-cover" />
            ) : (
              <User className="w-12 h-12 text-primary" />
            )}
          </div>
          
          <div className="mt-16 flex flex-col md:flex-row md:justify-between md:items-start gap-6">
            <div>
              <h1 className="text-3xl font-black text-primary">{targetUser.name}</h1>
              <div className="flex items-center gap-4 text-secondary font-medium mt-2">
                <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> {targetUser.location || 'Remote'}</span>
                <span className="flex items-center"><Star className="w-4 h-4 mr-1 text-yellow-500 fill-yellow-500" /> 4.9 Average Rating</span>
              </div>
            </div>
            
            <Link href={`/swap/${targetUser._id}`}>
              <button className="px-8 py-3 bg-primary text-white font-black rounded-xl hover:bg-[#152843] transition-colors shadow-md flex items-center group">
                <Zap className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" /> Request Swap
              </button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div>
              <h3 className="text-sm font-bold text-secondary uppercase tracking-widest mb-4">Skills They Offer</h3>
              <div className="flex flex-wrap gap-2">
                {targetUser.skillsOffered.length > 0 ? targetUser.skillsOffered.map(skill => (
                  <span key={skill} className="px-3 py-1.5 bg-blue-50 text-blue-700 font-bold text-sm rounded-lg border border-blue-200">
                    {skill}
                  </span>
                )) : <span className="text-secondary italic">No skills listed yet.</span>}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-bold text-secondary uppercase tracking-widest mb-4">Skills They Want</h3>
              <div className="flex flex-wrap gap-2">
                {targetUser.skillsWanted.length > 0 ? targetUser.skillsWanted.map(skill => (
                  <span key={skill} className="px-3 py-1.5 bg-black/5 text-primary font-bold text-sm rounded-lg border border-black/10">
                    {skill}
                  </span>
                )) : <span className="text-secondary italic">No skills listed yet.</span>}
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
