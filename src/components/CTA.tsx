import React from 'react';
import { Button } from '@/components/ui/button';
import AnimatedSection from './AnimatedSection';
import GlassMorphism from './ui/GlassMorphism';
import { createTimePortalEffect } from '@/utils/timeEffects';

const CTA: React.FC = () => {
  const handleExternalLink = (url: string, buttonText: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    createTimePortalEffect(url, buttonText);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/10 rounded-full filter blur-2xl opacity-30"></div>
      
      <div className="flex justify-center mb-8">
        <Button 
          size="lg" 
          className="px-8 py-6 text-lg font-semibold bg-gray-800 hover:bg-gray-700 rounded-md shadow-lg transition-all"
          onClick={handleExternalLink('https://aiwebtools.lovable.app/?via=aiwebtools', 'Explore AiWebTools.Ai')}
        >
          Explore AiWebTools.Ai
        </Button>
      </div>
      
      <div className="section-container relative z-10">
        <AnimatedSection className="max-w-4xl mx-auto text-center">
          <GlassMorphism className="px-6 py-12 md:py-16">
            <span className="chip mb-6">Ready to Start Learning?</span>
            <h2 className="heading text-3xl md:text-4xl lg:text-5xl mb-6 text-gray-900">
              Begin Your Educational Journey Today
            </h2>
            <p className="text-lg mx-auto mb-8 max-w-2xl text-gray-800 font-medium">
              Access comprehensive college-level education on any subject, on your schedule, with personalized instruction from College Degree GPT.
            </p>
            
            <div className="mb-6 bg-yellow-100/80 border border-yellow-300 rounded-lg p-4 text-sm text-gray-800">
              <p className="mb-2">
                <strong>Important:</strong> College Degree GPT provides educational content for self-study and is not an accredited degree program.
              </p>
              <p>
                This service cannot be used as a substitute for formal education requirements on job applications, professional licensing, or graduate school admissions.
              </p>
            </div>
            
            <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
              <Button 
                size="lg" 
                className="rounded-full px-8 py-6 text-base w-full md:w-auto"
                onClick={handleExternalLink('https://chatgpt.com/g/g-zF3j9G3Wd-college-degree-gpt', 'Start Learning Now')}
              >
                Start Learning Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full px-8 py-6 text-base w-full md:w-auto"
                onClick={handleExternalLink('https://aiwebtools.lovable.app/?via=aiwebtools', 'Explore More AI Tools')}
              >
                Explore More AI Tools
              </Button>
            </div>
          </GlassMorphism>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default CTA;
