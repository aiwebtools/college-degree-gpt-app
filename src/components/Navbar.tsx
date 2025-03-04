
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import GlassMorphism from './ui/GlassMorphism';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300', isScrolled ? 'py-3' : 'py-5')}>
      <GlassMorphism intensity={isScrolled ? 'high' : 'low'} className={cn('mx-4 sm:mx-6 lg:mx-8 transition-all duration-300', isScrolled && 'shadow-lg')}>
        <div className="flex items-center justify-between px-4 sm:px-6 py-3">
          <div className="flex items-center space-x-2">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-gray-900 dark:text-white">College Degree GPT</span>
              <a href="https://www.AiWebTools.Ai" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-700 dark:text-gray-300 hover:underline">Presented by Ai Web Tools LLC</a>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="https://chatgpt.com/g/g-zF3j9G3Wd-college-degree-gpt" target="_blank" rel="noopener noreferrer" className="link-underline text-sm font-medium text-gray-900 dark:text-white">College Degree GPT</a>
            <a href="https://chatgpt.com/g/g-6730d59e8e648190be4221e319aad5cd-learn-any-course-gpt" target="_blank" rel="noopener noreferrer" className="link-underline text-sm font-medium text-gray-900 dark:text-white">Learn Any Course GPT</a>
            <a href="https://learnanyskillgpt.lovable.app/" target="_blank" rel="noopener noreferrer" className="link-underline text-sm font-medium text-gray-900 dark:text-white">Learn Any Skill GPT</a>
            <a href="https://talk-to-history-gpt.lovable.app/" target="_blank" rel="noopener noreferrer" className="link-underline text-sm font-medium text-gray-900 dark:text-white">Talk to History GPT</a>
          </nav>
          
          {/* Mobile menu button */}
          <div className="flex items-center space-x-2">
            <div className="hidden md:block">
              <Button size="sm" className="rounded-full px-6" asChild>
                <a href="https://chatgpt.com/g/g-zF3j9G3Wd-college-degree-gpt" target="_blank" rel="noopener noreferrer">
                  Get Started
                </a>
              </Button>
            </div>
            <button 
              className="md:hidden p-2 rounded-md"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X className="h-6 w-6 text-gray-900 dark:text-white" /> : <Menu className="h-6 w-6 text-gray-900 dark:text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pt-2 pb-4 space-y-3 border-t border-gray-300 dark:border-gray-700">
            <a href="https://chatgpt.com/g/g-zF3j9G3Wd-college-degree-gpt" target="_blank" rel="noopener noreferrer" 
              className="block py-2 text-sm font-medium text-gray-900 dark:text-white">
              College Degree GPT
            </a>
            <a href="https://chatgpt.com/g/g-6730d59e8e648190be4221e319aad5cd-learn-any-course-gpt" target="_blank" rel="noopener noreferrer" 
              className="block py-2 text-sm font-medium text-gray-900 dark:text-white">
              Learn Any Course GPT
            </a>
            <a href="https://learnanyskillgpt.lovable.app/" target="_blank" rel="noopener noreferrer" 
              className="block py-2 text-sm font-medium text-gray-900 dark:text-white">
              Learn Any Skill GPT
            </a>
            <a href="https://talk-to-history-gpt.lovable.app/" target="_blank" rel="noopener noreferrer" 
              className="block py-2 text-sm font-medium text-gray-900 dark:text-white">
              Talk to History GPT
            </a>
            <Button size="sm" className="w-full rounded-full mt-2" asChild>
              <a href="https://chatgpt.com/g/g-zF3j9G3Wd-college-degree-gpt" target="_blank" rel="noopener noreferrer">
                Get Started
              </a>
            </Button>
          </div>
        )}
      </GlassMorphism>
    </div>
  );
};
export default Navbar;
