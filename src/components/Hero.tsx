import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import GlassMorphism from './ui/GlassMorphism';
import AnimatedSection from './AnimatedSection';
import { Download, Swords, Link, Unlink } from 'lucide-react';
import { createTimePortalEffect } from '@/utils/timeEffects';

const Hero: React.FC = () => {
  // Set video playing to true by default
  const [videoPlaying, setVideoPlaying] = useState(true);
  
  const handleExternalLink = (url: string, buttonText: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    createTimePortalEffect(url, buttonText);
  };
  
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-liberation-night py-16 md:py-20">
      <div className="absolute inset-0 bg-hero-pattern opacity-5"></div>
      <div className="starry-background absolute inset-0"></div>
      
      {/* Red and blue glowing orbs symbolizing freedom */}
      <div className="absolute top-40 left-10 w-64 h-64 bg-red-500/30 rounded-full filter blur-3xl opacity-30 animate-float"></div>
      <div className="absolute bottom-40 right-10 w-72 h-72 bg-blue-500/30 rounded-full filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
      
      {/* Breaking chain animation in the background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 overflow-hidden pointer-events-none">
        <svg className="w-full h-full max-w-4xl animate-pulse" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M30,50 L42,50 M58,50 L70,50" stroke="white" strokeWidth="4" strokeLinecap="round" />
          <path d="M42,45 L42,55 M58,45 L58,55" stroke="white" strokeWidth="4" strokeLinecap="round" />
          <path d="M48,50 L52,50" stroke="white" strokeWidth="4" strokeLinecap="round" className="animate-ping" />
        </svg>
      </div>

      {/* IT'S FREE! badge */}
      <div className="absolute top-4 right-4 md:top-10 md:right-10 transform rotate-12 z-20">
        <div className="bg-red-500 text-white font-black text-xl md:text-3xl uppercase py-2 px-4 md:py-3 md:px-6 rounded-lg shadow-lg border-2 border-white animate-pulse">
          IT'S FREE!
        </div>
      </div>

      <div className="section-container relative z-10 flex flex-col items-center justify-center">
        <AnimatedSection animation="fade-in-down" className="mb-6">
          <span className="chip bg-red-500/20 text-white font-medium border border-red-500/30 flex items-center gap-2">
            <Swords size={14} className="text-red-400" /> Liberation Education Movement
          </span>
        </AnimatedSection>
        
        <AnimatedSection animation="fade-in" className="text-center mb-6">
          <h1 className="heading text-4xl md:text-6xl lg:text-7xl mb-6 max-w-4xl font-bold text-white drop-shadow-md">
            Break Free From The <span className="text-red-500">Education Debt Cycle</span>
          </h1>
          <p className="subheading text-lg md:text-xl max-w-2xl mx-auto text-white bg-black/30 backdrop-blur-sm p-4 rounded-lg border border-red-500/20">
            Complete college-level education on any subject, with no tuition, no debt, and no restrictions. The revolution in learning starts now.
          </p>
          <div className="mt-4 text-sm text-white/80 max-w-3xl mx-auto space-y-2">
            <p>
              <em>Note: College Degree GPT provides a self-taught approach to learning and is not an accredited degree program. This is not affiliated with any academic institution and does not grant official college credits or degrees, but it does grant you <span className="text-red-400 font-semibold">freedom</span>.</em>
            </p>
            <p>
              <em>This service cannot be used as a substitute for formal education requirements on job applications, professional licensing, or graduate school admissions.</em>
            </p>
          </div>
        </AnimatedSection>
        
        <AnimatedSection animation="fade-in-up" delay={0.2} className="mt-8 space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row items-center">
          <Button 
            size="lg" 
            className="rounded-full px-8 py-6 text-base font-semibold bg-red-500 text-white hover:bg-red-600 border border-red-400 shadow-lg shadow-red-500/20 w-full md:w-auto"
            onClick={handleExternalLink('https://chatgpt.com/g/g-zF3j9G3Wd-college-degree-gpt', 'USE COLLEGE DEGREE GPT')}
          >
            USE COLLEGE DEGREE GPT
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="rounded-full px-8 py-6 text-base border-white text-white hover:bg-white/20 font-semibold w-full md:w-auto"
            onClick={handleExternalLink('https://www.aiwebtools.ai', 'Explore AiWebTools.Ai')}
          >
            Explore AiWebTools.Ai
          </Button>
          <Button 
            size="lg" 
            variant="secondary" 
            className="rounded-full px-8 py-6 text-base font-semibold flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto border border-blue-500"
            onClick={handleExternalLink('https://docs.google.com/document/u/0/d/1TpVG9pncULpkHy9IhAjyXIgScyTW703Lf-IQKkXeJs4/pub?pli=1', 'Save This Prompt For Future Learning')}
          >
            <Download size={18} />
            Save This Prompt For Future Learning
          </Button>
        </AnimatedSection>
        
        <AnimatedSection animation="fade-in-up" delay={0.4} className="mt-16 w-full max-w-5xl">
          <GlassMorphism className="p-2 md:p-4 overflow-hidden rounded-2xl bg-black/50 border border-red-500/20">
            <div className="relative rounded-xl overflow-hidden bg-slate-900 aspect-video w-full">
              {/* Always render the iframe since videoPlaying is true by default */}
              <iframe 
                src="https://www.youtube.com/embed/Cd8uvD-smlM?autoplay=1&mute=0&loop=1&playlist=Cd8uvD-smlM&controls=1&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3" 
                className="w-full h-full aspect-video"
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
