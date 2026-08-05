"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/useAuthStore';
import { LayoutDashboard, Users, Calendar, Activity, Settings, User, Check, Star } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const router = useRouter();
  const { user, checkAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [swaps, setSwaps] = useState([]);

  useEffect(() => {
    checkAuth();
    if (!localStorage.getItem('token')) {
      router.push('/login');
    } else {
      fetchDashboardData();
    }
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/swaps/my-requests', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.ok) {
        const data = await res.json();
        setSwaps(data);
      }
    } catch (err) {
      console.error('Failed to fetch dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="animate-pulse w-12 h-12 bg-primary rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="flex-grow bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-6">
        
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24"
          >
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 leading-tight">{user?.name || 'User'}</h3>
                <p className="text-sm text-gray-500">Skill Swapper</p>
              </div>
            </div>

            <nav className="space-y-2">
              <Link href="/dashboard" className="flex items-center px-4 py-3 bg-primary text-white font-medium rounded-xl shadow-sm transition-all">
                <LayoutDashboard className="w-5 h-5 mr-3" /> Dashboard
              </Link>
              <Link href="/matches" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary font-medium rounded-xl transition-all">
                <Users className="w-5 h-5 mr-3" /> My Matches
              </Link>
              <Link href="/requests" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary font-medium rounded-xl transition-all">
                <Calendar className="w-5 h-5 mr-3" /> Requests
              </Link>
              <Link href={`/profile/${user?._id}`} className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary font-medium rounded-xl transition-all">
                <Settings className="w-5 h-5 mr-3" /> Profile Settings
              </Link>
            </nav>
          </motion.div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow space-y-6 overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Overview</h1>
            <p className="text-gray-500">Welcome back, let's see what's happening.</p>
          </motion.div>

          {/* Grid Layout Placeholder for Push 2, 3, 4 */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            
            {/* Left Column (Stats & Upcoming) */}
            <div className="xl:col-span-2 space-y-6">
              {/* Push 2: Stats Component */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div whileHover={{ y: -5 }} className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 shadow-md text-white">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-blue-100 font-medium">Total Swaps</p>
                      <h3 className="text-3xl font-bold mt-1">{swaps.filter(s => s.status === 'completed' || s.status === 'accepted').length}</h3>
                    </div>
                    <div className="bg-white/20 p-2 rounded-xl">
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <p className="text-sm text-blue-100">+2 this week</p>
                </motion.div>
                
                <motion.div whileHover={{ y: -5 }} className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 shadow-md text-white">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-purple-100 font-medium">Hours Learned</p>
                      <h3 className="text-3xl font-bold mt-1">45.5</h3>
                    </div>
                    <div className="bg-white/20 p-2 rounded-xl">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <p className="text-sm text-purple-100">+5 hrs this month</p>
                </motion.div>

                <motion.div whileHover={{ y: -5 }} className="bg-gradient-to-br from-[#dd6b20] to-orange-600 rounded-2xl p-6 shadow-md text-white">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-orange-100 font-medium">Profile Rating</p>
                      <h3 className="text-3xl font-bold mt-1">4.9</h3>
                    </div>
                    <div className="bg-white/20 p-2 rounded-xl">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <p className="text-sm text-orange-100">Top 5% of users</p>
                </motion.div>
              </div>

              {/* Push 3: Upcoming Meetings */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Upcoming Swaps</h2>
                  <button className="text-sm text-primary font-bold hover:underline">View All</button>
                </div>
                
                <div className="space-y-4">
                  {swaps.filter(s => s.status === 'accepted').length === 0 ? (
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <h3 className="text-lg font-bold text-gray-900">No upcoming swaps</h3>
                      <p className="text-gray-500 text-sm mt-1 mb-4">You have no scheduled meetings yet.</p>
                      <Link href="/matches" className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-sm hover:bg-[#152843] transition-colors">
                        Find Matches
                      </Link>
                    </div>
                  ) : (
                    swaps.filter(s => s.status === 'accepted').map((swap) => (
                      <motion.div key={swap._id} whileHover={{ scale: 1.01 }} className="flex items-center p-4 border border-gray-100 rounded-xl hover:shadow-sm transition-all cursor-pointer group">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 group-hover:bg-primary transition-colors">
                          <Calendar className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-bold text-gray-900">{swap.skillWanted} session</h4>
                          <p className="text-sm text-gray-500">with {swap.sender._id === user._id ? swap.receiver.name : swap.sender.name}</p>
                        </div>
                        <div className="text-right">
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Confirmed</span>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Right Column (Activity Feed) */}
            <div className="space-y-6">
              {/* Push 4: Activity Feed */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                </div>
                
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-6 md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                  {[
                    { title: 'New match found!', desc: 'Sarah matches 95% of your skills.', time: '2 hours ago', icon: <Users className="w-4 h-4 text-white" />, color: 'bg-blue-500' },
                    { title: 'Swap completed', desc: 'You completed a 1hr swap with John.', time: 'Yesterday', icon: <Check className="w-4 h-4 text-white" />, color: 'bg-green-500' },
                    { title: 'Earned a badge', desc: 'You unlocked the "Top Teacher" badge!', time: '3 days ago', icon: <Star className="w-4 h-4 text-white" />, color: 'bg-orange-500' },
                    { title: 'Profile updated', desc: 'You added "Python" to your offered skills.', time: '1 week ago', icon: <Settings className="w-4 h-4 text-white" />, color: 'bg-gray-500' }
                  ].map((act, i) => (
                    <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm ${act.color} z-10`}>
                        {act.icon}
                      </div>
                      
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-gray-900 text-sm">{act.title}</h4>
                          <time className="text-xs text-gray-400 font-medium">{act.time}</time>
                        </div>
                        <p className="text-sm text-gray-600">{act.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
