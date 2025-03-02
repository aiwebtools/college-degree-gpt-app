
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import GlassMorphism from './ui/GlassMorphism';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'py-3' : 'py-5'
    )}>
      <GlassMorphism 
        intensity={isScrolled ? 'high' : 'low'} 
        className={cn(
          'mx-4 sm:mx-6 lg:mx-8 transition-all duration-300',
          isScrolled && 'shadow-lg'
        )}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 py-3">
          <div className="flex items-center space-x-2">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-bold text-lg tracking-tight">College Degree GPT</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="link-underline text-sm font-medium">Features</a>
            <a href="#how-it-works" className="link-underline text-sm font-medium">How It Works</a>
            <a href="#example" className="link-underline text-sm font-medium">Example</a>
          </nav>
          
          <div>
            <Button size="sm" className="rounded-full px-6">
              Get Started
            </Button>
          </div>
        </div>
      </GlassMorphism>
    </div>
  );
};

export default Navbar;
