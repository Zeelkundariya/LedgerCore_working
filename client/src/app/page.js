"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Code, Palette, BookOpen, Music, Camera, Zap, Star, Users, CheckCircle2, Globe } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-text-primary overflow-hidden selection:bg-primary/30">
      
      {/* Interactive Global Background Glow */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139,92,246,0.07), transparent 40%)`
        }}
      />
      
      {/* Core Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary/20 blur-[120px] mix-blend-screen animate-blob" />
      <div className="absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-secondary/20 blur-[120px] mix-blend-screen animate-blob animation-delay-2000" />
      <div className="absolute bottom-[-10%] left-[20%] w-[45vw] h-[45vw] rounded-full bg-blue-500/20 blur-[120px] mix-blend-screen animate-blob animation-delay-4000" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      <div className="absolute inset-0 z-0" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>

      <main className="relative z-10 pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between">
        
        {/* Hero Text */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:w-1/2 text-center lg:text-left z-20"
        >
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]"></span>
            <span className="text-sm font-medium text-gray-300 tracking-wide">Platform is Live & Growing</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
            Master Any Skill. <br />
            <span className="text-shimmer font-black">
              Pay With Knowledge.
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            The world's most premium skill exchange network. Connect with experts, teach what you love, and learn what you need—completely free.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
            <Link href="/register">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 w-full sm:w-auto bg-gradient-to-r from-primary to-secondary text-white rounded-2xl font-bold text-lg shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(236,72,153,0.4)] transition-all flex items-center justify-center group"
              >
                Join the Network 
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
            
            <Link href="/explore">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 w-full sm:w-auto glassmorphism border border-white/20 text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center"
              >
                Explore Experts
              </motion.button>
            </Link>
          </div>
          
          <div className="mt-12 flex items-center justify-center lg:justify-start space-x-6 text-gray-400">
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-primary" />
              <span className="font-semibold text-white">10k+</span>&nbsp;Users
            </div>
            <div className="flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-500" />
              <span className="font-semibold text-white">4.9/5</span>&nbsp;Rating
            </div>
          </div>
        </motion.div>

        {/* Floating Badges Area (to be implemented next) */}
        <div className="lg:w-1/2 mt-20 lg:mt-0 relative h-[500px] w-full hidden md:block">
          {/* Badges go here */}
        </div>

      </main>

    </div>
  );
}
