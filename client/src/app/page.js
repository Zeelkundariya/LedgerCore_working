"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Code, Palette, BookOpen, Music, Camera, Zap } from 'lucide-react';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const features = [
    { icon: <Code className="w-8 h-8 text-primary" />, title: "Programming", desc: "Learn to code from experts and teach your own skills." },
    { icon: <Palette className="w-8 h-8 text-pink-500" />, title: "Design", desc: "Swap your design expertise for development help." },
    { icon: <BookOpen className="w-8 h-8 text-blue-500" />, title: "Languages", desc: "Exchange language lessons with native speakers." },
    { icon: <Music className="w-8 h-8 text-purple-500" />, title: "Music", desc: "Trade guitar lessons for vocal coaching." },
    { icon: <Camera className="w-8 h-8 text-green-500" />, title: "Photography", desc: "Share your camera skills for editing tips." },
    { icon: <Zap className="w-8 h-8 text-yellow-500" />, title: "Productivity", desc: "Exchange time management strategies." }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] pt-20 pb-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background blobs for premium feel */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-secondary/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-40 w-72 h-72 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

      <motion.div 
        className="z-10 text-center max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Trade Your Skills, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Expand Your World
          </span>
        </motion.h1>
        
        <motion.p variants={itemVariants} className="text-lg md:text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
          Welcome to SkillSwap, the premium community where you can teach what you know and learn what you need, completely free.
        </motion.p>
        
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/register">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-full font-bold text-lg flex items-center shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all"
            >
              Join the Community <ArrowRight className="ml-2 w-5 h-5" />
            </motion.button>
          </Link>
          <Link href="/explore">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 glassmorphism text-white rounded-full font-bold text-lg hover:bg-white/10 transition-colors"
            >
              Explore Skills
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div 
        className="mt-32 w-full max-w-7xl z-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Discover Endless Possibilities</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">Find experts in hundreds of different fields ready to swap knowledge with you.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glassmorphism p-8 rounded-2xl flex flex-col items-start transition-all hover:border-primary/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]"
            >
              <div className="p-3 bg-white/5 rounded-xl mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
              <p className="text-text-secondary leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
