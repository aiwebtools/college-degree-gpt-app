
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import GlassMorphism from './ui/GlassMorphism';
import AnimatedSection from './AnimatedSection';
import { Download, Swords, Link, Unlink } from 'lucide-react';
import { createTimePortalEffect } from '@/utils/timeEffects';

const Hero: React.FC = () => {
  const [videoPlaying, setVideoPlaying] = useState(true);
  
  const handleExternalLink = (url: string, buttonText: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    createTimePortalEffect(url, buttonText);
  };
  
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-liberation-night py-20 md:py-24">
      <div className="absolute inset-0 bg-hero-pattern opacity-10"></div>
      <div className="starry-background absolute inset-0"></div>
      
      {/* Enhanced divine orbs with more glow */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-red-500/40 to-purple-500/40 rounded-full filter blur-3xl opacity-40 animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-500/40 to-pink-500/40 rounded-full filter blur-3xl opacity-40 animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
      
      {/* Enhanced breaking chain animation */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 overflow-hidden pointer-events-none">
        <svg className="w-full h-full max-w-6xl animate-pulse" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path d="M30,50 L42,50 M58,50 L70,50" stroke="white" strokeWidth="6" strokeLinecap="round" filter="url(#glow)" />
          <path d="M42,45 L42,55 M58,45 L58,55" stroke="white" strokeWidth="6" strokeLinecap="round" filter="url(#glow)" />
          <path d="M48,50 L52,50" stroke="white" strokeWidth="6" strokeLinecap="round" className="animate-ping" filter="url(#glow)" />
        </svg>
      </div>

      {/* Enhanced IT'S FREE! badge */}
      <div className="absolute top-6 right-6 md:top-12 md:right-12 transform rotate-12 z-20">
        <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-black text-xl md:text-3xl uppercase py-3 px-5 md:py-4 md:px-8 rounded-xl shadow-2xl border-2 border-white animate-pulse backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-red-400/50 to-pink-400/50 rounded-xl blur-lg"></div>
          <span className="relative z-10">IT'S FREE!</span>
        </div>
      </div>

      <div className="section-container relative z-10 flex flex-col items-center justify-center space-y-8">
        <AnimatedSection animation="fade-in-down" className="mb-8">
          <span className="chip bg-gradient-to-r from-red-500/30 to-purple-500/30 text-white font-semibold border border-red-400/50 flex items-center gap-3 px-6 py-3 text-base backdrop-blur-lg">
            <Swords size={16} className="text-red-400" /> Liberation Education Movement
          </span>
        </AnimatedSection>
        
        <AnimatedSection animation="fade-in" className="text-center mb-8">
          <h1 className="heading text-5xl md:text-7xl lg:text-8xl mb-8 max-w-5xl font-black text-white leading-tight">
            Break Free From The <span className="text-transparent bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text">Education Debt Cycle</span>
          </h1>
          <p className="subheading text-xl md:text-2xl max-w-3xl mx-auto text-white bg-black/40 backdrop-blur-xl p-8 rounded-2xl border border-red-500/30">
            Complete college-level education on any subject, with no tuition, no debt, and no restrictions. The revolution in learning starts now.
          </p>
          <div className="mt-6 text-base text-white/90 max-w-4xl mx-auto space-y-3 bg-black/20 backdrop-blur-md p-6 rounded-xl border border-white/20">
            <p className="leading-relaxed">
              <em>Note: College Degree GPT provides a self-taught approach to learning and is not an accredited degree program. This is not affiliated with any academic institution and does not grant official college credits or degrees, but it does grant you <span className="text-red-400 font-semibold">freedom</span>.</em>
            </p>
            <p className="leading-relaxed">
              <em>This service cannot be used as a substitute for formal education requirements on job applications, professional licensing, or graduate school admissions.</em>
            </p>
          </div>
        </AnimatedSection>
        
        <AnimatedSection animation="fade-in-up" delay={0.2} className="mt-12 space-y-6 md:space-y-0 md:space-x-6 flex flex-col md:flex-row items-center">
          <Button 
            size="lg" 
            className="rounded-2xl px-10 py-8 text-lg font-bold bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 border border-red-400 shadow-2xl shadow-red-500/30 w-full md:w-auto transition-all duration-500 hover:scale-105"
            onClick={handleExternalLink('https://chatgpt.com/g/g-zF3j9G3Wd-college-degree-gpt', 'USE COLLEGE DEGREE GPT')}
          >
            USE COLLEGE DEGREE GPT
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="rounded-2xl px-10 py-8 text-lg border-2 border-white/50 text-white hover:bg-white/20 font-bold w-full md:w-auto backdrop-blur-lg transition-all duration-500 hover:scale-105"
            onClick={handleExternalLink('https://www.aiwebtools.ai', 'Explore AiWebTools.Ai')}
          >
            Explore AiWebTools.Ai
          </Button>
          <Button 
            size="lg" 
            variant="secondary" 
            className="rounded-2xl px-10 py-8 text-lg font-bold flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white w-full md:w-auto border border-blue-500/50 transition-all duration-500 hover:scale-105"
            onClick={handleExternalLink('https://docs.google.com/document/u/0/d/1TpVG9pncULpkHy9IhAjyXIgScyTW703Lf-IQKkXeJs4/pub?pli=1', 'Save This Prompt For Future Learning')}
          >
            <Download size={20} />
            Save This Prompt For Future Learning
          </Button>
        </AnimatedSection>
        
        <AnimatedSection animation="fade-in-up" delay={0.4} className="mt-20 w-full max-w-6xl">
          <GlassMorphism className="p-3 md:p-6 overflow-hidden rounded-3xl bg-black/60 border border-red-500/30 shadow-2xl backdrop-blur-xl">
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-video w-full shadow-inner">
              {/* Enhanced glow around video */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl blur-sm"></div>
              <iframe 
                src="https://www.youtube.com/embed/Cd8uvD-smlM?autoplay=1&mute=0&loop=1&playlist=Cd8uvD-smlM&controls=1&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3" 
                className="w-full h-full aspect-video relative z-10 rounded-2xl"
                title="College Degree GPT Tutorial"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </GlassMorphism>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Hero;
