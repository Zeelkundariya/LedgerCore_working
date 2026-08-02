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

      <main className="relative z-10 pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Hero Text */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left z-20 w-full pt-10 lg:pt-0"
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

        {/* Floating Badges Area */}
        <div className="lg:w-1/2 mt-20 lg:mt-0 relative h-[500px] w-full hidden md:block">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, type: "spring" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-2xl"
          />
          
          {/* Main Center Badge */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 animate-float"
            style={{ animationDuration: '5s' }}
          >
            <div className="glassmorphism p-6 rounded-3xl border border-white/20 shadow-[0_0_50px_rgba(139,92,246,0.3)] flex flex-col items-center">
              <div className="bg-primary/20 p-4 rounded-2xl mb-3">
                <Code className="w-10 h-10 text-primary" />
              </div>
              <p className="font-bold text-white text-lg">Web Dev</p>
              <p className="text-sm text-green-400 font-medium mt-1">High Demand</p>
            </div>
          </motion.div>

          {/* Top Right Badge */}
          <motion.div 
            className="absolute top-10 right-10 z-20 animate-float"
            style={{ animationDuration: '7s', animationDelay: '1s' }}
          >
            <div className="glassmorphism p-5 rounded-3xl border border-white/10 shadow-xl flex items-center space-x-4">
              <div className="bg-pink-500/20 p-3 rounded-xl">
                <Palette className="w-6 h-6 text-pink-500" />
              </div>
              <div>
                <p className="font-bold text-white">UI Design</p>
                <div className="flex -space-x-2 mt-1">
                  {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-gray-600 border border-surface" />)}
                  <span className="text-xs text-gray-400 ml-3">+42 offers</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom Left Badge */}
          <motion.div 
            className="absolute bottom-10 left-10 z-20 animate-float"
            style={{ animationDuration: '6s', animationDelay: '2s' }}
          >
            <div className="glassmorphism p-4 rounded-3xl border border-white/10 shadow-xl flex items-center space-x-3">
              <div className="bg-blue-500/20 p-3 rounded-xl">
                <Globe className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="font-bold text-white">Languages</p>
                <p className="text-xs text-blue-300">Spanish ↔ English</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Infinite Scrolling Marquee */}
      <section className="relative z-10 py-10 border-y border-white/5 bg-surface/30 backdrop-blur-md overflow-hidden flex flex-col items-center">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-6">Popular Skills Being Swapped Right Now</p>
        <div className="flex w-[200%] md:w-[150%] lg:w-[120%] space-x-8 animate-marquee whitespace-nowrap">
          {/* Duplicate the list for seamless looping */}
          {[1, 2].map((group) => (
            <div key={group} className="flex space-x-8 min-w-full justify-around items-center">
              {['React.js', 'Figma', 'Spanish', 'Python', 'SEO', 'Video Editing', 'Guitar', 'AWS', 'Copywriting'].map(skill => (
                <span key={skill} className="text-2xl font-black text-gray-600 hover:text-white transition-colors duration-300">
                  {skill}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative z-10 py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">How It Works</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Three simple steps to start trading your knowledge and leveling up your skills.</p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-blue-500 transform -translate-y-1/2 hidden md:block opacity-20"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Step 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative glassmorphism p-8 rounded-3xl border border-white/10 hover:border-primary/50 transition-all group"
            >
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-black text-xl shadow-[0_0_20px_rgba(139,92,246,0.6)]">1</div>
              <div className="bg-primary/10 p-5 rounded-2xl w-fit mb-6 text-primary group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Create Your Profile</h3>
              <p className="text-gray-400 leading-relaxed">List the skills you are an expert in, and the skills you want to learn. Set your availability to match with others.</p>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative glassmorphism p-8 rounded-3xl border border-white/10 hover:border-secondary/50 transition-all group"
            >
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center font-black text-xl shadow-[0_0_20px_rgba(236,72,153,0.6)]">2</div>
              <div className="bg-secondary/10 p-5 rounded-2xl w-fit mb-6 text-secondary group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Find a Match</h3>
              <p className="text-gray-400 leading-relaxed">Browse the explore page or let our algorithm suggest perfect matches. Send a swap request to connect.</p>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative glassmorphism p-8 rounded-3xl border border-white/10 hover:border-blue-500/50 transition-all group"
            >
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-black text-xl shadow-[0_0_20px_rgba(59,130,246,0.6)]">3</div>
              <div className="bg-blue-500/10 p-5 rounded-2xl w-fit mb-6 text-blue-500 group-hover:scale-110 transition-transform">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Swap & Learn</h3>
              <p className="text-gray-400 leading-relaxed">Meet up via video call, trade your knowledge, and leave feedback for each other to build your reputation.</p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Discover Capabilities / Features Section */}
      <section className="relative z-10 py-32 border-t border-white/10 bg-surface/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Master Any Category</h2>
            <p className="text-text-secondary text-xl max-w-2xl mx-auto">Explore thousands of skills being taught by passionate experts right now.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Code className="w-8 h-8 text-primary" />, title: "Programming", desc: "Learn to code from experts and teach your own skills.", color: "group-hover:border-primary/50 group-hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]" },
              { icon: <Palette className="w-8 h-8 text-pink-500" />, title: "Design", desc: "Swap your design expertise for development help.", color: "group-hover:border-pink-500/50 group-hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]" },
              { icon: <BookOpen className="w-8 h-8 text-blue-500" />, title: "Languages", desc: "Exchange language lessons with native speakers.", color: "group-hover:border-blue-500/50 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]" },
              { icon: <Music className="w-8 h-8 text-purple-500" />, title: "Music", desc: "Trade guitar lessons for vocal coaching.", color: "group-hover:border-purple-500/50 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]" },
              { icon: <Camera className="w-8 h-8 text-green-500" />, title: "Photography", desc: "Share your camera skills for editing tips.", color: "group-hover:border-green-500/50 group-hover:shadow-[0_0_30px_rgba(34,197,94,0.15)]" },
              { icon: <Zap className="w-8 h-8 text-yellow-500" />, title: "Productivity", desc: "Exchange time management strategies.", color: "group-hover:border-yellow-500/50 group-hover:shadow-[0_0_30px_rgba(234,179,8,0.15)]" }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className={`group glassmorphism p-8 rounded-3xl border border-white/5 transition-all duration-300 relative overflow-hidden ${feature.color}`}
              >
                {/* Spotlight effect background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative z-10">
                  <div className="p-4 bg-white/5 rounded-2xl w-fit mb-6 shadow-inner border border-white/10 group-hover:bg-white/10 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">{feature.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Glowing CTA Section */}
      <section className="relative z-10 py-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/30 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring" }}
            className="glassmorphism p-12 md:p-16 rounded-[3rem] border border-white/20 shadow-[0_0_80px_rgba(139,92,246,0.2)]"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Ready to Level Up?</h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">Join thousands of others who are trading skills and advancing their careers without spending a dime.</p>
            
            <Link href="/register">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white text-background rounded-full font-black text-xl shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:shadow-[0_0_60px_rgba(255,255,255,0.6)] transition-all flex items-center justify-center mx-auto group"
              >
                Create Free Account 
                <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="relative z-10 border-t border-white/10 py-8 text-center text-text-secondary bg-background">
        <p>© {new Date().getFullYear()} SkillSwap. Built with passion.</p>
      </footer>

    </div>
  );
}
