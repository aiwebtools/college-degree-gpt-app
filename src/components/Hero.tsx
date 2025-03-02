
import React from 'react';
import { Button } from '@/components/ui/button';
import GlassMorphism from './ui/GlassMorphism';
import AnimatedSection from './AnimatedSection';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background py-16 md:py-20">
      <div className="absolute inset-0 bg-hero-pattern opacity-10"></div>
      
      <div className="absolute top-40 left-10 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl opacity-30 animate-float"></div>
      <div className="absolute bottom-40 right-10 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="section-container relative z-10 flex flex-col items-center justify-center">
        <AnimatedSection animation="fade-in-down" className="mb-6">
          <span className="chip">Your Personal College Educator</span>
        </AnimatedSection>
        
        <AnimatedSection animation="fade-in" className="text-center mb-6">
          <h1 className="heading text-4xl md:text-6xl lg:text-7xl mb-6 max-w-4xl">
            Experience a Complete College Education, Powered by AI
          </h1>
          <p className="subheading text-lg md:text-xl max-w-2xl mx-auto">
            Comprehensive courses on any subject, taught step-by-step with the personalized attention of a dedicated professor.
          </p>
        </AnimatedSection>
        
        <AnimatedSection animation="fade-in-up" delay={0.2} className="mt-8 space-x-4">
          <Button 
            size="lg" 
            className="rounded-full px-8 py-6 text-base"
            onClick={() => window.open('https://www.AiWebTools.Ai', '_blank')}
          >
            Start Learning Now
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-base">
            Explore Features
          </Button>
        </AnimatedSection>
        
        <AnimatedSection animation="fade-in-up" delay={0.4} className="mt-16 w-full max-w-5xl">
          <GlassMorphism className="p-2 md:p-4 overflow-hidden rounded-2xl">
            <div className="relative rounded-xl overflow-hidden bg-slate-900 aspect-video w-full">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center cursor-pointer hover:bg-primary transition-colors duration-300">
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white ml-1"
                  >
                    <path 
                      d="M5 3L19 12L5 21V3Z" 
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold">See How College Degree GPT Works</h3>
                <p className="text-white/80">Your personalized educational journey starts here</p>
              </div>
            </div>
          </GlassMorphism>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Hero;
