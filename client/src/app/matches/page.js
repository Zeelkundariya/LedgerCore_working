"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/useAuthStore';
import { User, MapPin, ArrowRight, CheckCircle2, Star, Target, Sparkles } from 'lucide-react';
import Link from 'next/link';

// Deterministic mock data generator based on user ID
const getMockStats = (id) => {
  let hash = 0;
  if (!id) return { rating: "4.8", swaps: 12 };
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  const rating = 4 + (Math.abs(hash) % 11) / 10; // 4.0 to 5.0
  const swaps = 5 + (Math.abs(hash) % 45); // 5 to 50
  return { rating: rating.toFixed(1), swaps };
};

export default function AIMatches() {
  const router = useRouter();
  const { user: currentUser, checkAuth } = useAuthStore();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(true);

  useEffect(() => {
    checkAuth();
    if (!localStorage.getItem('token')) {
      router.push('/login');
    } else {
      fetchUsers();
    }
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/users/search', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
        
        // Simulate AI Analysis thinking time
        setTimeout(() => {
          setAnalyzing(false);
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      setAnalyzing(false);
    } finally {
      setLoading(false);
    }
  };

  const calculateCompatibility = (otherUser) => {
    if (!currentUser) return { score: 0, explanations: [] };

    let score = 0;
    const explanations = [];

    // 1. They teach what you want
    const theyTeachYouWant = otherUser.skillsOffered.filter(skill => 
      currentUser.skillsWanted.some(w => w.toLowerCase() === skill.toLowerCase())
    );
    if (theyTeachYouWant.length > 0) {
      score += 40;
      explanations.push(`They can teach you ${theyTeachYouWant.join(', ')}`);
    }

    // 2. You teach what they want
    const youTeachTheyWant = currentUser.skillsOffered.filter(skill => 
      otherUser.skillsWanted.some(w => w.toLowerCase() === skill.toLowerCase())
    );
    if (youTeachTheyWant.length > 0) {
      score += 40;
      explanations.push(`You can teach them ${youTeachTheyWant.join(', ')}`);
    }

    // 3. Location match
    const myLoc = currentUser.location?.toLowerCase() || '';
    const theirLoc = otherUser.location?.toLowerCase() || '';
    if (myLoc && theirLoc && myLoc === theirLoc) {
      score += 10;
      explanations.push('Both in the same city');
    } else if (theirLoc.includes('remote') || theirLoc === '') {
      score += 5;
      explanations.push('Available for remote sessions');
    }

    // 4. Availability match
    const myAvail = currentUser.availability?.toLowerCase() || '';
    const theirAvail = otherUser.availability?.toLowerCase() || '';
    if (myAvail && theirAvail) {
      const myWords = myAvail.split(/[,\s]+/);
      const theirWords = theirAvail.split(/[,\s]+/);
      const intersect = myWords.filter(w => w.length > 3 && theirWords.includes(w));
      if (intersect.length > 0) {
        score += 10;
        explanations.push(`Both available on ${intersect[0]}`);
      }
    }

    // Base bump for having any overlap at all
    if (score > 0 && score < 20) score += 20;

    // Add deterministic randomness based on ID for visual variety
    const stats = getMockStats(otherUser._id);
    if (score === 80) score = 85 + (stats.swaps % 13); 
    if (score > 98) score = 98; // Cap at 98% for realism

    return { score, explanations, stats };
  };

  if (loading || !currentUser) {
    return <div className="flex-grow flex items-center justify-center min-h-[calc(100vh-4rem)]"><div className="animate-pulse w-12 h-12 bg-primary rounded-full"></div></div>;
  }

  // Calculate scores and sort
  const scoredUsers = users.map(user => {
    const matchData = calculateCompatibility(user);
    return { ...user, ...matchData };
  }).filter(u => u.score > 0).sort((a, b) => b.score - a.score);

  const recommendedMatches = scoredUsers.filter(u => u.score >= 70);
  const otherMatches = scoredUsers.filter(u => u.score < 70 && u.score > 20);

  return (
    <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center space-x-3 mb-2">
        <Sparkles className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold text-primary">AI Skill Match</h1>
      </div>
      <p className="text-secondary font-medium mb-4 text-lg">Intelligent learning partner recommendations based on your profile.</p>
      
      <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-xl mb-10 flex items-start sm:items-center">
        <Sparkles className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5 sm:mt-0" />
        <span className="text-sm font-bold">Discover New Partners: These are recommended users you haven't connected with yet. Review their profiles to send a swap request!</span>
      </div>

      {analyzing ? (
        <div className="flex flex-col items-center justify-center py-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mb-6"
          />
          <h2 className="text-xl font-bold text-primary">Analyzing Compatibility...</h2>
          <p className="text-secondary mt-2">Matching your skills, location, and goals with our network.</p>
        </div>
      ) : (
        <>
          {recommendedMatches.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-bold text-primary mb-6 flex items-center">
                <Target className="w-5 h-5 mr-2" /> Recommended for You
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {recommendedMatches.map((user, idx) => (
                  <MatchCard key={user._id} user={user} idx={idx} />
                ))}
              </div>
            </div>
          )}

          {otherMatches.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-primary mb-6 text-opacity-80">
                Other Potential Matches
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {otherMatches.map((user, idx) => (
                  <MatchCard key={user._id} user={user} idx={idx} />
                ))}
              </div>
            </div>
          )}

          {scoredUsers.length === 0 && (
            <div className="bg-white border border-black/10 rounded-2xl p-10 text-center shadow-sm">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">No strong matches found yet</h3>
              <p className="text-secondary max-w-md mx-auto">Try adding more skills to your "Skills I Want" or "Skills I Offer" lists on your Dashboard to help the AI find better matches.</p>
              <Link href="/dashboard" className="inline-block mt-6 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-[#152843] transition-colors shadow-sm">
                Update Profile
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function MatchCard({ user, idx }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.1 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-black/10 hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-6 relative overflow-hidden"
    >
      {/* Decorative background element for very high matches */}
      {user.score >= 85 && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-0 pointer-events-none"></div>
      )}

      {/* Left Column: Profile & Score */}
      <div className="flex flex-col items-center sm:items-start min-w-[120px] relative z-10">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20 mb-4 overflow-hidden relative">
          {user.profilePicture ? (
            <img src={user.profilePicture} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <User className="w-10 h-10 text-primary" />
          )}
        </div>
        
        <div className="text-center sm:text-left mb-4">
          <h3 className="text-lg font-bold text-primary">{user.name}</h3>
          <div className="flex items-center justify-center sm:justify-start text-secondary text-sm mt-1">
            <MapPin className="w-3 h-3 mr-1" />
            {user.location || 'Remote'}
          </div>
        </div>

        <div className="flex items-center space-x-1 text-sm font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-200 mb-2">
          <Star className="w-4 h-4 fill-yellow-500" />
          <span>{user.stats.rating}</span>
          <span className="text-yellow-600/70 font-medium ml-1">({user.stats.swaps})</span>
        </div>
      </div>

      {/* Right Column: Explanations & Action */}
      <div className="flex-1 flex flex-col relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="text-3xl font-black text-primary tracking-tight">{user.score}%</div>
            <div className="ml-2 text-xs font-bold text-secondary uppercase tracking-wider leading-tight">Match<br/>Score</div>
          </div>
          {/* Circular Progress (CSS based) */}
          <div className="relative w-12 h-12">
            <svg className="w-12 h-12 transform -rotate-90">
              <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-black/5" />
              <motion.circle 
                cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" 
                strokeDasharray={125.6} 
                initial={{ strokeDashoffset: 125.6 }}
                animate={{ strokeDashoffset: 125.6 - (125.6 * user.score) / 100 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className={`${user.score >= 70 ? 'text-green-500' : 'text-primary'}`} 
              />
            </svg>
          </div>
        </div>

        <div className="bg-black/5 rounded-xl p-4 mb-5 border border-black/5 flex-1">
          <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-3">Why they match</h4>
          <ul className="space-y-2">
            {user.explanations.map((exp, i) => (
              <li key={i} className="flex items-start text-sm font-medium text-secondary">
                <CheckCircle2 className="w-4 h-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                {exp}
              </li>
            ))}
          </ul>
        </div>

        <Link href={`/swap/${user._id}`} className="w-full">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm flex justify-center items-center group ${user.score >= 70 ? 'bg-primary hover:bg-[#152843] text-white' : 'bg-white border border-black/10 hover:border-primary/40 text-primary hover:bg-black/5'}`}
          >
            Review Profile <ArrowRight className="w-4 h-4 ml-1 opacity-70 group-hover:opacity-100 transition-all translate-x-0 group-hover:translate-x-1" />
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}
