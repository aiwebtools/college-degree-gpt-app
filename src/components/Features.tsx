
import React from 'react';
import { cn } from '@/lib/utils';
import AnimatedSection from './AnimatedSection';
import GlassMorphism from './ui/GlassMorphism';

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
}

const Feature: React.FC<FeatureProps> = ({ title, description, icon, delay = 0 }) => {
  return (
    <AnimatedSection animation="fade-in-up" delay={delay} className="h-full">
      <GlassMorphism className="h-full p-6 card-hover">
        <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center text-primary mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </GlassMorphism>
    </AnimatedSection>
  );
};

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-gradient-radial from-white to-secondary/40">
      <div className="section-container">
        <AnimatedSection className="text-center mb-16">
          <span className="chip mb-3">Features</span>
          <h2 className="heading text-3xl md:text-4xl mb-4">Your Complete Educational Experience</h2>
          <p className="subheading mx-auto">
            College Degree GPT delivers a comprehensive college education experience with personalized, detailed instruction on any subject.
          </p>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <Feature 
            title="Complete Course Structure" 
            description="Meticulously organized courses by academic year and semester, following actual college curricula."
            delay={0.1}
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM5 19V5H19V19H5Z" fill="currentColor"/>
                <path d="M7 7H9V9H7V7Z" fill="currentColor"/>
                <path d="M7 11H9V13H7V11Z" fill="currentColor"/>
                <path d="M7 15H9V17H7V15Z" fill="currentColor"/>
                <path d="M11 7H17V9H11V7Z" fill="currentColor"/>
                <path d="M11 11H17V13H11V11Z" fill="currentColor"/>
                <path d="M11 15H17V17H11V15Z" fill="currentColor"/>
              </svg>
            }
          />
          
          <Feature 
            title="Comprehensive Lesson Plans" 
            description="Detailed outlines for each course with clear learning objectives and sequenced content modules."
            delay={0.2}
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
          />
          
          <Feature 
            title="Professional Teaching Style" 
            description="Learn from an AI that teaches with clarity, compassion, and the explanatory skill of a college professor."
            delay={0.3}
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 9H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 9H15.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
          />
          
          <Feature 
            title="Sequential Learning Path" 
            description="Courses are taught lesson by lesson in a logical progression to build knowledge systematically."
            delay={0.4}
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                <path d="M8 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 6H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 12H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 18H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
          />
          
          <Feature 
            title="Rich Multimedia Content" 
            description="Enhanced learning with curated YouTube video recommendations and visual summaries for each segment."
            delay={0.5}
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                <path d="M15.5 7H13.5L12 5.5L10.5 7H8.5C7.95 7 7.5 7.45 7.5 8V16C7.5 16.55 7.95 17 8.5 17H15.5C16.05 17 16.5 16.55 16.5 16V8C16.5 7.45 16.05 7 15.5 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 14V10L14 12L10 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
          />
          
          <Feature 
            title="Real-World Applications" 
            description="Concepts are linked to practical applications and scenarios to deepen understanding and relevance."
            delay={0.6}
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3.6 9H20.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3.6 15H20.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.5 3C9.28126 7.36913 9.28126 16.6309 11.5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12.5 3C14.7187 7.36913 14.7187 16.6309 12.5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
