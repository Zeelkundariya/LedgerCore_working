"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/useAuthStore';
import { CheckCircle2, XCircle, Clock, Send, Inbox, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('incoming');
  const [feedbackData, setFeedbackData] = useState({ rating: 5, comment: '', showFor: null });
  const { user, checkAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    if (!localStorage.getItem('token')) {
      router.push('/login');
    } else {
      fetchRequests();
    }
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/swaps/my-requests', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setRequests(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    try {
      const method = action === 'cancel' ? 'DELETE' : 'PUT';
      const res = await fetch(`http://localhost:5000/api/swaps/${id}/${action}`, {
        method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (res.ok) {
        fetchRequests();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const submitFeedback = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/swaps/${id}/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ rating: feedbackData.rating, comment: feedbackData.comment })
      });
      if (res.ok) {
        setFeedbackData({ rating: 5, comment: '', showFor: null });
        fetchRequests();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="flex-grow flex items-center justify-center min-h-[calc(100vh-4rem)]"><div className="animate-pulse w-12 h-12 bg-primary rounded-full"></div></div>;
  }

  const incoming = requests.filter(r => r.receiverId?._id === user?._id);
  const outgoing = requests.filter(r => r.senderId?._id === user?._id);

  const displayRequests = activeTab === 'incoming' ? incoming : outgoing;

  return (
    <div className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob pointer-events-none"></div>
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
        <h1 className="text-3xl font-bold mb-8">Swap Requests</h1>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('incoming')}
            className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === 'incoming' ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'glassmorphism text-text-secondary hover:text-white'}`}
          >
            <Inbox className="w-5 h-5 mr-2" /> Incoming ({incoming.length})
          </button>
          <button
            onClick={() => setActiveTab('outgoing')}
            className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === 'outgoing' ? 'bg-secondary text-white shadow-lg shadow-secondary/25' : 'glassmorphism text-text-secondary hover:text-white'}`}
          >
            <Send className="w-5 h-5 mr-2" /> Outgoing ({outgoing.length})
          </button>
        </div>

        {/* Requests List */}
        {displayRequests.length === 0 ? (
          <div className="text-center py-20 glassmorphism rounded-3xl">
            <h3 className="text-xl text-text-secondary">No {activeTab} requests found.</h3>
          </div>
        ) : (
          <div className="space-y-6">
            {displayRequests.map((req, idx) => {
              const otherUser = activeTab === 'incoming' ? req.senderId : req.receiverId;
              if (!otherUser) return null; // Safe guard

              return (
                <motion.div
                  key={req._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="glassmorphism p-6 rounded-2xl border border-white/10"
                >
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-white">{otherUser.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          req.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-300' :
                          req.status === 'ACCEPTED' ? 'bg-green-500/20 text-green-300' :
                          req.status === 'COMPLETED' ? 'bg-blue-500/20 text-blue-300' :
                          'bg-red-500/20 text-red-300'
                        }`}>
                          {req.status}
                        </span>
                      </div>
                      
                      <p className="text-gray-300 mb-4 bg-surface/50 p-3 rounded-lg border border-white/5 italic">
                        "{req.message || 'No message provided'}"
                      </p>

                      <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm">
                        <div>
                          <strong className="text-green-400 block mb-1">They Offer:</strong>
                          <div className="flex gap-2">{req.offeredSkills.map(s => <span key={s} className="bg-surface px-2 py-1 rounded text-gray-300">{s}</span>)}</div>
                        </div>
                        <div>
                          <strong className="text-purple-400 block mb-1">They Want:</strong>
                          <div className="flex gap-2">{req.requestedSkills.map(s => <span key={s} className="bg-surface px-2 py-1 rounded text-gray-300">{s}</span>)}</div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col space-y-3 min-w-[140px]">
                      {activeTab === 'incoming' && req.status === 'PENDING' && (
                        <>
                          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleAction(req._id, 'accept')} className="flex items-center justify-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
                            <CheckCircle2 className="w-4 h-4 mr-2" /> Accept
                          </motion.button>
                          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleAction(req._id, 'reject')} className="flex items-center justify-center px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors">
                            <XCircle className="w-4 h-4 mr-2" /> Reject
                          </motion.button>
                        </>
                      )}

                      {activeTab === 'outgoing' && req.status === 'PENDING' && (
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleAction(req._id, 'cancel')} className="flex items-center justify-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">
                          <XCircle className="w-4 h-4 mr-2" /> Cancel Request
                        </motion.button>
                      )}

                      {req.status === 'ACCEPTED' && (
                        <motion.button 
                          whileHover={{ scale: 1.05 }} 
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setFeedbackData({...feedbackData, showFor: req._id})}
                          className="flex items-center justify-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                        >
                          <Star className="w-4 h-4 mr-2" /> Complete & Rate
                        </motion.button>
                      )}
                    </div>
                  </div>

                  {/* Feedback Form inline */}
                  {feedbackData.showFor === req._id && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-6 pt-6 border-t border-white/10">
                      <h4 className="font-bold mb-3">Leave Feedback to Complete Swap</h4>
                      <div className="flex items-center space-x-2 mb-3">
                        {[1,2,3,4,5].map(star => (
                          <button key={star} onClick={() => setFeedbackData({...feedbackData, rating: star})}>
                            <Star className={`w-6 h-6 ${star <= feedbackData.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'}`} />
                          </button>
                        ))}
                      </div>
                      <textarea 
                        className="w-full bg-surface border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary outline-none mb-3"
                        placeholder="How was the swap experience?"
                        value={feedbackData.comment}
                        onChange={(e) => setFeedbackData({...feedbackData, comment: e.target.value})}
                      />
                      <div className="flex justify-end space-x-3">
                        <button onClick={() => setFeedbackData({ rating: 5, comment: '', showFor: null })} className="px-4 py-2 text-gray-400 hover:text-white">Cancel</button>
                        <button onClick={() => submitFeedback(req._id)} className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg">Submit & Complete</button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}
