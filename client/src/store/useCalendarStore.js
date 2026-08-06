import { create } from 'zustand';
import { useAuthStore } from './useAuthStore';

export const useCalendarStore = create((set, get) => ({
  sessions: [],
  isLoading: false,
  error: null,

  fetchSessions: async () => {
    set({ isLoading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/swaps/my-requests', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch sessions');
      const data = await res.json();
      
      // Filter for accepted requests with a scheduled date
      const calendarSessions = data.filter(
        (swap) => swap.status === 'ACCEPTED' && swap.scheduledDate
      );
      set({ sessions: calendarSessions, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  rescheduleSession: async (swapId, newDate, newDuration) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/swaps/${swapId}/schedule`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ scheduledDate: newDate, duration: newDuration })
      });
      
      if (!res.ok) throw new Error('Failed to reschedule session');
      const updatedSwap = await res.json();

      set((state) => ({
        sessions: state.sessions.map((s) => (s._id === swapId ? updatedSwap : s))
      }));
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  updateAvailability: async (availabilityData) => {
    try {
      const token = localStorage.getItem('token');
      const availabilityString = JSON.stringify(availabilityData);
      
      const res = await fetch('http://localhost:5000/api/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ availability: availabilityString })
      });
      
      if (!res.ok) throw new Error('Failed to update availability');
      
      const updatedUser = await res.json();
      useAuthStore.getState().updateUser(updatedUser);
      
      return updatedUser;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}));
