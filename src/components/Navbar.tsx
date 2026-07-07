
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import GlassMorphism from './ui/GlassMorphism';
import { Button } from '@/components/ui/button';
import { Menu, X, ExternalLink, Home, BookOpen, Wrench, MessageCircle, MoreHorizontal } from 'lucide-react';
import { createTimePortalEffect } from '@/utils/timeEffects';

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

  const handleExternalLink = (url: string, buttonText: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    createTimePortalEffect(url, buttonText);
  };

  const AIWEBTOOLS_URL = 'https://aiwebtools.lovable.app/?via=aiwebtools';

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
              <span className="text-xs text-gray-700 dark:text-gray-300">Self-Taught Learning Experience</span>
              <a href="#" onClick={handleExternalLink(AIWEBTOOLS_URL, 'Presented by Ai Web Tools LLC')} className="text-xs text-gray-700 dark:text-gray-300 hover:underline">Presented by Ai Web Tools LLC</a>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" onClick={handleExternalLink(AIWEBTOOLS_URL, 'AiWebTools Home')} className="flex items-center gap-1.5 text-sm font-medium text-gray-900 dark:text-white hover:text-primary transition-colors">
              <Home className="h-4 w-4" />
              AiWebTools Home
            </a>
            <a href="#" onClick={handleExternalLink('https://chatgpt.com/g/g-6730d59e8e648190be4221e319aad5cd-learn-any-course-gpt', 'Learn Any Course GPT')} className="link-underline text-sm font-medium text-gray-900 dark:text-white">Learn Any Course GPT</a>
            <a href="#" onClick={handleExternalLink('https://learnanyskillgpt.lovable.app/', 'Learn Any Skill GPT')} className="link-underline text-sm font-medium text-gray-900 dark:text-white">Learn Any Skill GPT</a>
            <a href="#" onClick={handleExternalLink('https://talk-to-history-gpt.lovable.app/', 'Talk to History GPT')} className="link-underline text-sm font-medium text-gray-900 dark:text-white">Talk to History GPT</a>
          </nav>
          
          {/* Mobile menu button and More AI Tools button */}
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="outline" className="rounded-full hidden md:flex items-center gap-1.5 bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100" onClick={handleExternalLink(AIWEBTOOLS_URL, 'More AI Tools')}>
              More AI Tools <ExternalLink className="h-3.5 w-3.5" />
            </Button>
            <div className="hidden md:flex items-center gap-2">
              <Button size="sm" className="rounded-full px-6 bg-red-500 hover:bg-red-600 text-white" asChild>
                <a href="/chat">USE COLLEGE DEGREE GPT (IN-SITE AI)</a>
              </Button>
              <Button size="sm" variant="outline" className="rounded-full px-6" onClick={handleExternalLink('https://chatgpt.com/g/g-zF3j9G3Wd-college-degree-gpt', 'ChatGPT Custom GPT Version')}>
                CHATGPT CUSTOM GPT VERSION
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
            <a href="#" onClick={handleExternalLink(AIWEBTOOLS_URL, 'AiWebTools Home')}
              className="flex items-center gap-3 py-3 px-4 text-sm font-medium rounded-lg border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 hover:from-blue-100 hover:to-blue-200 hover:shadow-lg hover:shadow-blue-200/50 transition-all duration-300 transform hover:scale-105 glow-blue">
              <Home className="h-5 w-5" />
              AiWebTools Home
            </a>
            <a href="#" onClick={handleExternalLink('https://chatgpt.com/g/g-6730d59e8e648190be4221e319aad5cd-learn-any-course-gpt', 'Learn Any Course GPT')}
              className="flex items-center gap-3 py-3 px-4 text-sm font-medium rounded-lg border-2 border-green-200 bg-gradient-to-r from-green-50 to-green-100 text-green-800 hover:from-green-100 hover:to-green-200 hover:shadow-lg hover:shadow-green-200/50 transition-all duration-300 transform hover:scale-105 glow-green">
              <BookOpen className="h-5 w-5" />
              Learn Any Course GPT
            </a>
            <a href="#" onClick={handleExternalLink('https://learnanyskillgpt.lovable.app/', 'Learn Any Skill GPT')}
              className="flex items-center gap-3 py-3 px-4 text-sm font-medium rounded-lg border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-800 hover:from-purple-100 hover:to-purple-200 hover:shadow-lg hover:shadow-purple-200/50 transition-all duration-300 transform hover:scale-105 glow-purple">
              <Wrench className="h-5 w-5" />
              Learn Any Skill GPT
            </a>
            <a href="#" onClick={handleExternalLink('https://talk-to-history-gpt.lovable.app/', 'Talk to History GPT')}
              className="flex items-center gap-3 py-3 px-4 text-sm font-medium rounded-lg border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-orange-100 text-orange-800 hover:from-orange-100 hover:to-orange-200 hover:shadow-lg hover:shadow-orange-200/50 transition-all duration-300 transform hover:scale-105 glow-orange">
              <MessageCircle className="h-5 w-5" />
              Talk to History GPT
            </a>
            <a href="#" onClick={handleExternalLink(AIWEBTOOLS_URL, 'More AI Tools')}
              className="flex items-center gap-3 py-3 px-4 text-sm font-medium rounded-lg border-2 border-pink-200 bg-gradient-to-r from-pink-50 to-pink-100 text-pink-800 hover:from-pink-100 hover:to-pink-200 hover:shadow-lg hover:shadow-pink-200/50 transition-all duration-300 transform hover:scale-105 glow-pink">
              <MoreHorizontal className="h-5 w-5" />
              More AI Tools
            </a>
            <Button size="sm" variant="secondary" className="w-full rounded-full mt-2" asChild>
              <a href="/chat">🎓 Free AI Class Chat (in-site)</a>
            </Button>
            <Button size="sm" className="w-full rounded-full mt-2" onClick={handleExternalLink('https://chatgpt.com/g/g-zF3j9G3Wd-college-degree-gpt', 'USE COLLEGE DEGREE GPT')}>
              USE COLLEGE DEGREE GPT
            </Button>
          </div>
        )}
      </GlassMorphism>
    </div>
  );
};
export default Navbar;
