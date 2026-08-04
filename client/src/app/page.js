"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Star, Clock, Video, MessageCircle } from 'lucide-react';
import { useRef } from 'react';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="relative bg-background text-text-primary overflow-x-hidden selection:bg-accent selection:text-white editorial-grid font-sans min-h-screen">

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 w-full min-h-[90vh] flex items-center pt-24 pb-12">
        <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Hero Left: Editorial Typography */}
          <motion.div 
            style={{ y, opacity }}
            className="z-20 w-full flex flex-col justify-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-6xl sm:text-7xl lg:text-[5.5rem] font-bold text-primary leading-[0.95] tracking-tight mb-8">
                Master Skills.<br/>
                Share Knowledge.<br/>
                <span className="text-accent">Grow Together.</span>
              </h1>
              
              <p className="text-xl text-secondary max-w-lg mb-12 leading-relaxed font-light">
                A community built on the pure exchange of knowledge. Trade what you know for what you want to learn. No transactions, just human connection.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Link href="/register" className="btn-primary w-full sm:w-auto">
                    Start Exchanging
                    <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
                <div className="flex items-center gap-3 text-sm font-medium text-secondary">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-slate-200">
                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full rounded-full object-cover" />
                      </div>
                    ))}
                  </div>
                  Join 50,000+ Learners
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Right: Node Visualization */}
          <div className="relative w-full aspect-square lg:aspect-auto lg:h-[600px] hidden md:block">
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <motion.path 
                d="M100,100 Q200,300 400,200 T600,400" 
                fill="transparent" 
                stroke="rgba(31, 58, 95, 0.1)" 
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <motion.path 
                d="M600,100 Q400,200 300,400 T100,500" 
                fill="transparent" 
                stroke="rgba(201, 124, 43, 0.1)" 
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />
            </svg>
            
            {/* Nodes */}
            {[
              { top: '15%', left: '15%', size: 60, img: '10' },
              { top: '40%', left: '70%', size: 90, img: '20' },
              { top: '70%', left: '30%', size: 70, img: '30' },
              { top: '80%', left: '80%', size: 50, img: '40' },
              { top: '20%', left: '85%', size: 45, img: '50' }
            ].map((node, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border-4 border-white shadow-xl overflow-hidden cursor-pointer"
                style={{ top: node.top, left: node.left, width: node.size, height: node.size }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.2, type: 'spring', stiffness: 100 }}
                whileHover={{ scale: 1.1, zIndex: 10 }}
              >
                <img src={`https://i.pravatar.cc/200?img=${node.img}`} alt="Node" className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS (Timeline) --- */}
      <section className="py-32 bg-white border-y border-black/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tight">The Exchange Process</h2>
            <p className="text-xl text-secondary font-light max-w-2xl">A seamless framework designed to connect you with the perfect learning partner.</p>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-stretch gap-6 relative">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/10 hidden lg:block -z-10"></div>
            
            {[
              { step: '01', title: 'Create Profile', desc: 'List your skills and what you want to learn.' },
              { step: '02', title: 'Smart Match', desc: 'Our algorithm finds your perfect knowledge partner.' },
              { step: '03', title: 'Live Session', desc: 'Connect via integrated high-quality video call.' },
              { step: '04', title: 'Grow', desc: 'Exchange ratings to build your reputation.' }
            ].map((item, index) => (
              <motion.div 
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="bg-white p-6 md:p-8 flex-1 border border-black/5 rounded-2xl shadow-sm hover:shadow-xl transition-shadow"
              >
                <span className="text-accent font-bold text-lg mb-4 block">{item.step}</span>
                <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-secondary text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- EXPLORE SKILLS (3D Orbital Ecosystem) --- */}
      <section className="py-32 bg-[#F7F6F3] overflow-hidden border-b border-black/5 relative">
        {/* Subtle grid background */}
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(#1F3A5F 1px, transparent 1px), linear-gradient(90deg, #1F3A5F 1px, transparent 1px)', backgroundSize: '100px 100px' }}></div>
        
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="mb-12 text-center relative z-20">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tight">Knowledge Orbit</h2>
            <p className="text-xl text-secondary font-light">A multi-dimensional network of global skills.</p>
          </div>
          
          <div 
            className="relative w-[350px] h-[350px] md:w-[700px] md:h-[700px] mx-auto flex items-center justify-center -my-20 md:-my-32"
            style={{ perspective: '1200px' }}
          >
            {/* The 3D Floor */}
            <div 
              className="absolute inset-0"
              style={{ transform: 'rotateX(65deg)', transformStyle: 'preserve-3d' }}
            >
              {/* Concentric 3D Orbit Rings */}
              <div className="absolute inset-0 rounded-full border-[1.5px] border-primary/10 border-dashed"></div>
              <div className="absolute inset-16 md:inset-32 rounded-full border border-primary/5"></div>
              <div className="absolute inset-24 md:inset-48 rounded-full border border-primary/15 border-dashed"></div>
              
              {/* Center Node (Stands up) */}
              <div 
                className="absolute top-1/2 left-1/2 z-40"
                style={{ transform: 'translate(-50%, -50%) rotateX(-65deg)', transformStyle: 'preserve-3d' }}
              >
                <motion.div 
                  className="w-24 h-24 md:w-36 md:h-36 bg-primary rounded-full flex flex-col items-center justify-center shadow-[0_20px_40px_rgba(31,58,95,0.4)] border-4 border-white cursor-pointer relative"
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <div className="absolute -inset-4 rounded-full bg-primary/20 animate-ping"></div>
                  <span className="text-white/70 text-[10px] uppercase tracking-widest mb-1">Your</span>
                  <span className="text-white font-bold tracking-widest uppercase text-lg">Brain</span>
                </motion.div>
              </div>
              
              {/* Orbiting Nodes Wrapper */}
              <motion.div 
                className="absolute inset-0 z-30"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateZ: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              >
                {[
                  { skill: 'React.js', color: '#1F3A5F', angle: 0, radius: '48%' },
                  { skill: 'Music Theory', color: '#C97C2B', angle: 45, radius: '28%' },
                  { skill: 'UI/UX Design', color: '#2E8B57', angle: 90, radius: '48%' },
                  { skill: 'Culinary Arts', color: '#7A8B99', angle: 135, radius: '28%' },
                  { skill: 'Python AI', color: '#1F3A5F', angle: 180, radius: '48%' },
                  { skill: 'Spanish', color: '#C97C2B', angle: 225, radius: '28%' },
                  { skill: 'Fitness', color: '#2E8B57', angle: 270, radius: '48%' },
                  { skill: 'Digital Marketing', color: '#7A8B99', angle: 315, radius: '28%' },
                ].map((item, i) => {
                  return (
                    <div
                      key={item.skill}
                      className="absolute inset-0 origin-center"
                      style={{ 
                        transform: `rotateZ(${item.angle}deg)`, 
                        transformStyle: 'preserve-3d' 
                      }}
                    >
                      {/* Connecting Line on the floor */}
                      <div 
                        className="absolute left-1/2 bottom-1/2 w-[1px] origin-bottom"
                        style={{ 
                          height: item.radius,
                          background: `linear-gradient(to top, transparent, ${item.color}40)` 
                        }}
                      ></div>

                      {/* Node Placement */}
                      <div 
                        className="absolute left-1/2"
                        style={{ 
                          top: `calc(50% - ${item.radius})`,
                          transform: `translate(-50%, -50%)`,
                          transformStyle: 'preserve-3d'
                        }}
                      >
                        {/* Dynamic Counter-Rotation for spin */}
                        <motion.div
                          style={{ transformStyle: 'preserve-3d' }}
                          animate={{ rotateZ: [-item.angle, -360 - item.angle] }}
                          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        >
                          {/* Tilt up to face camera */}
                          <div style={{ transform: 'rotateX(-65deg)', transformStyle: 'preserve-3d' }}>
                            <motion.div
                              className="bg-white shadow-[0_15px_30px_rgb(0,0,0,0.12)] border border-black/5 rounded-full px-5 py-3 flex items-center gap-3 cursor-pointer whitespace-nowrap"
                              whileHover={{ scale: 1.1, y: -5, boxShadow: `0 20px 40px ${item.color}30` }}
                            >
                              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                              <span className="font-bold text-[11px] uppercase tracking-widest text-primary">{item.skill}</span>
                            </motion.div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </section>



      {/* --- STATISTICS (Oversized Typography) --- */}
      <section className="py-32 bg-primary text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 border-t border-white/20 pt-16">
            {[
              { label: 'People Connected', val: '50K+' },
              { label: 'Countries', val: '120+' },
              { label: 'Successful Matches', val: '98%' },
              { label: 'Sessions Completed', val: '100K+' }
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col"
              >
                <span className="text-6xl md:text-7xl font-bold font-display text-accent mb-4 tracking-tighter">{stat.val}</span>
                <span className="text-lg font-medium text-white/70 uppercase tracking-widest">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS (Chat Bubbles) --- */}
      <section className="py-32 bg-background overflow-hidden relative">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-12 text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tight">Real Connections</h2>
          <p className="text-xl text-secondary font-light">See what happens when knowledge flows freely.</p>
        </div>

        <div className="max-w-[800px] mx-auto px-6 relative flex flex-col gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex gap-4 self-start max-w-[85%]"
          >
            <img src="https://i.pravatar.cc/100?img=12" className="w-10 h-10 rounded-full mt-auto" />
            <div className="bg-white p-5 rounded-2xl rounded-bl-none shadow-sm border border-black/5">
              <p className="text-primary font-medium leading-relaxed">"I traded my Spanish lessons for React tutoring. I just landed my first Junior Developer role today! 😭🚀"</p>
              <span className="text-xs text-secondary mt-2 block">Maria G. • 2 hours ago</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex gap-4 self-end max-w-[85%] flex-row-reverse"
          >
            <img src="https://i.pravatar.cc/100?img=68" className="w-10 h-10 rounded-full mt-auto" />
            <div className="bg-primary text-white p-5 rounded-2xl rounded-br-none shadow-md">
              <p className="font-medium leading-relaxed">"That's incredible Maria! The UX feedback you gave me on my portfolio was game-changing too. SkillSwap is the best."</p>
              <span className="text-xs text-white/70 mt-2 block">James T. • 1 hour ago</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- FOOTER (Editorial) --- */}
      <footer className="bg-white border-t border-black/10 pt-32 pb-12">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">
            <div>
              <h2 className="text-5xl font-bold text-primary tracking-tight mb-8">Ready to grow?</h2>
              <Link href="/register">
                <button className="btn-primary text-lg px-10 py-5">
                  Join SkillSwap Free
                </button>
              </Link>
            </div>
            
            <div className="grid grid-cols-2 gap-10">
              <div className="flex flex-col gap-4">
                <h4 className="font-bold text-primary mb-4 uppercase tracking-widest text-sm">Platform</h4>
                <Link href="/explore" className="text-secondary hover:text-accent transition-colors">Explore Experts</Link>
                <Link href="/how-it-works" className="text-secondary hover:text-accent transition-colors">How it Works</Link>
                <Link href="/pricing" className="text-secondary hover:text-accent transition-colors">Pricing (Free)</Link>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="font-bold text-primary mb-4 uppercase tracking-widest text-sm">Company</h4>
                <Link href="/about" className="text-secondary hover:text-accent transition-colors">About Us</Link>
                <Link href="/guidelines" className="text-secondary hover:text-accent transition-colors">Community Guidelines</Link>
                <Link href="/contact" className="text-secondary hover:text-accent transition-colors">Contact</Link>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between border-t border-black/10 pt-8 text-sm text-secondary font-medium">
            <p>© 2026 SkillSwap Inc. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-primary transition-colors">Twitter</a>
              <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-primary transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
