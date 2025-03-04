
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import GlassMorphism from './ui/GlassMorphism';
import AnimatedSection from './AnimatedSection';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-starry-night py-16 md:py-20">
      <div className="absolute inset-0 bg-hero-pattern opacity-5"></div>
      <div className="starry-background absolute inset-0"></div>
      
      <div className="absolute top-40 left-10 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl opacity-30 animate-float"></div>
      <div className="absolute bottom-40 right-10 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="section-container relative z-10 flex flex-col items-center justify-center">
        <AnimatedSection animation="fade-in-down" className="mb-6">
          <span className="chip bg-white/20 text-white font-medium">Your Personal College Educator</span>
        </AnimatedSection>
        
        <AnimatedSection animation="fade-in" className="text-center mb-6">
          <h1 className="heading text-4xl md:text-6xl lg:text-7xl mb-6 max-w-4xl font-bold text-white drop-shadow-md">
            Experience a Complete College Education, Powered by AI
          </h1>
          <p className="subheading text-lg md:text-xl max-w-2xl mx-auto text-white bg-black/30 backdrop-blur-sm p-4 rounded-lg">
            Comprehensive courses on any subject, taught step-by-step with the personalized attention of a dedicated professor.
          </p>
        </AnimatedSection>
        
        <AnimatedSection animation="fade-in-up" delay={0.2} className="mt-8 space-x-4">
          <Button 
            size="lg" 
            className="rounded-full px-8 py-6 text-base font-semibold bg-white text-slate-900 hover:bg-white/90"
            asChild
          >
            <a href="https://chatgpt.com/g/g-zF3j9G3Wd-college-degree-gpt" target="_blank" rel="noopener noreferrer">
              Start Learning Now
            </a>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="rounded-full px-8 py-6 text-base border-white text-white hover:bg-white/20 font-semibold"
            onClick={() => window.open('https://www.aiwebtools.ai', '_blank')}
          >
            Explore AiWebTools.Ai
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Hero;
