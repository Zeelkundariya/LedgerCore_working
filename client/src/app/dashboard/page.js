"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/useAuthStore';
import { User, MapPin, Briefcase, Plus, X, Save, Clock, Lock, Globe } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const { user, token, checkAuth } = useAuthStore();

  const [profile, setProfile] = useState({
    name: '',
    location: '',
    availability: '',
    isPublic: true,
    skillsOffered: [],
    skillsWanted: [],
  });

  const [newOfferedSkill, setNewOfferedSkill] = useState('');
  const [newWantedSkill, setNewWantedSkill] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    checkAuth();
    if (!localStorage.getItem('token')) {
      router.push('/login');
    } else {
      fetchProfile();
    }
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/users/me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setProfile({
          name: data.name || '',
          location: data.location || '',
          availability: data.availability || '',
          isPublic: data.isPublic,
          skillsOffered: data.skillsOffered || [],
          skillsWanted: data.skillsWanted || []
        });
      }
    } catch (err) {
      console.error('Failed to fetch profile', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ text: '', type: '' });

    try {
      const res = await fetch('http://localhost:5000/api/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(profile)
      });

      if (res.ok) {
        setMessage({ text: 'Profile updated successfully!', type: 'success' });
      } else {
        setMessage({ text: 'Failed to update profile.', type: 'error' });
      }
    } catch (err) {
      setMessage({ text: 'An error occurred.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const addSkill = (type) => {
    if (type === 'offered' && newOfferedSkill.trim() && !profile.skillsOffered.includes(newOfferedSkill.trim())) {
      setProfile({ ...profile, skillsOffered: [...profile.skillsOffered, newOfferedSkill.trim()] });
      setNewOfferedSkill('');
    } else if (type === 'wanted' && newWantedSkill.trim() && !profile.skillsWanted.includes(newWantedSkill.trim())) {
      setProfile({ ...profile, skillsWanted: [...profile.skillsWanted, newWantedSkill.trim()] });
      setNewWantedSkill('');
    }
  };

  const removeSkill = (type, skillToRemove) => {
    if (type === 'offered') {
      setProfile({ ...profile, skillsOffered: profile.skillsOffered.filter(s => s !== skillToRemove) });
    } else {
      setProfile({ ...profile, skillsWanted: profile.skillsWanted.filter(s => s !== skillToRemove) });
    }
  };

  if (loading) {
    return <div className="flex-grow flex items-center justify-center min-h-[calc(100vh-4rem)]"><div className="animate-pulse w-12 h-12 bg-primary rounded-full"></div></div>;
  }

  return (
    <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Dashboard</h1>
          {message.text && (
            <span className={`px-4 py-2 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'}`}>
              {message.text}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Profile Form */}
          <div className="lg:col-span-2 glassmorphism rounded-2xl p-6 shadow-xl border border-white/10">
            <h2 className="text-xl font-semibold mb-6 flex items-center"><User className="mr-2 text-primary" /> Profile Settings</h2>

            <form onSubmit={handleSave} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-surface border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-white"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1"><MapPin className="inline w-4 h-4 mr-1" /> Location (Optional)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-surface border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-white"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1"><Clock className="inline w-4 h-4 mr-1" /> Availability</label>
                <input
                  type="text"
                  placeholder="e.g. Weekends, Evenings"
                  className="w-full px-4 py-3 bg-surface border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-white"
                  value={profile.availability}
                  onChange={(e) => setProfile({ ...profile, availability: e.target.value })}
                />
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setProfile({ ...profile, isPublic: !profile.isPublic })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${profile.isPublic ? 'bg-primary' : 'bg-gray-600'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${profile.isPublic ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
                <span className="text-sm text-gray-300 flex items-center">
                  {profile.isPublic ? <><Globe className="w-4 h-4 mr-1 text-green-400" /> Public Profile</> : <><Lock className="w-4 h-4 mr-1 text-yellow-400" /> Private Profile</>}
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={saving}
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold flex items-center justify-center mt-4 transition-colors disabled:opacity-50"
              >
                <Save className="w-5 h-5 mr-2" /> {saving ? 'Saving...' : 'Save Changes'}
              </motion.button>
            </form>
          </div>

          {/* Skills Management */}
          <div className="space-y-8">
            <div className="glassmorphism rounded-2xl p-6 shadow-xl border border-white/10">
              <h2 className="text-xl font-semibold mb-4 text-green-400 flex items-center"><Briefcase className="mr-2" /> Skills I Offer</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {profile.skillsOffered.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-surface border border-green-500/30 text-green-200 rounded-full text-sm flex items-center">
                    {skill}
                    <button type="button" onClick={() => removeSkill('offered', skill)} className="ml-2 text-gray-400 hover:text-red-400"><X className="w-3 h-3" /></button>
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Add skill..."
                  className="flex-grow px-3 py-2 bg-surface border border-white/10 rounded-lg text-sm text-white"
                  value={newOfferedSkill}
                  onChange={(e) => setNewOfferedSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill('offered')}
                />
                <button type="button" onClick={() => addSkill('offered')} className="p-2 bg-surface hover:bg-surface-hover rounded-lg text-green-400"><Plus className="w-5 h-5" /></button>
              </div>
            </div>

            <div className="glassmorphism rounded-2xl p-6 shadow-xl border border-white/10">
              <h2 className="text-xl font-semibold mb-4 text-purple-400 flex items-center"><Briefcase className="mr-2" /> Skills I Want</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {profile.skillsWanted.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-surface border border-purple-500/30 text-purple-200 rounded-full text-sm flex items-center">
                    {skill}
                    <button type="button" onClick={() => removeSkill('wanted', skill)} className="ml-2 text-gray-400 hover:text-red-400"><X className="w-3 h-3" /></button>
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Add skill..."
                  className="flex-grow px-3 py-2 bg-surface border border-white/10 rounded-lg text-sm text-white"
                  value={newWantedSkill}
                  onChange={(e) => setNewWantedSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill('wanted')}
                />
                <button type="button" onClick={() => addSkill('wanted')} className="p-2 bg-surface hover:bg-surface-hover rounded-lg text-purple-400"><Plus className="w-5 h-5" /></button>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
