
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import GlassMorphism from './ui/GlassMorphism';
import AnimatedSection from './AnimatedSection';

const Hero: React.FC = () => {
  const [videoPlaying, setVideoPlaying] = useState(false);
  
  const handlePlayVideo = () => {
    setVideoPlaying(true);
  };

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
            onClick={() => window.open('https://www.AiWebTools.Ai', '_blank')}
          >
            Start Learning Now
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="rounded-full px-8 py-6 text-base border-white text-white hover:bg-white/20 font-semibold"
          >
            Explore Features
          </Button>
        </AnimatedSection>
        
        <AnimatedSection animation="fade-in-up" delay={0.4} className="mt-16 w-full max-w-5xl">
          <GlassMorphism className="p-2 md:p-4 overflow-hidden rounded-2xl bg-black/50 border-white/20">
            <div className="relative rounded-xl overflow-hidden bg-slate-900 aspect-video w-full">
              {!videoPlaying ? (
                <div className="relative aspect-video w-full">
                  <img 
                    src="https://img.youtube.com/vi/5cqDDGt1yn8/maxresdefault.jpg" 
                    alt="Video thumbnail" 
                    className="w-full h-full object-cover"
                  />
                  <button 
                    className="absolute inset-0 flex items-center justify-center cursor-pointer w-full h-full"
                    onClick={handlePlayVideo}
                    aria-label="Play video"
                  >
                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center hover:bg-white/90 transition-colors duration-300">
                      <svg 
                        width="28" 
                        height="28" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-slate-900 ml-1"
                      >
                        <path 
                          d="M5 3L19 12L5 21V3Z" 
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </button>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold">See How College Degree GPT Works</h3>
                    <p className="text-white font-medium">Your personalized educational journey starts here</p>
                  </div>
                </div>
              ) : (
                <iframe 
                  src="https://www.youtube.com/embed/5cqDDGt1yn8?autoplay=1" 
                  className="w-full h-full"
                  title="College Degree GPT Tutorial"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </GlassMorphism>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Hero;
