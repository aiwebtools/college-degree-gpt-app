import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { createTimePortalEffect } from '@/utils/timeEffects';

const Footer: React.FC = () => {
  const handleExternalLink = (url: string, buttonText: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    createTimePortalEffect(url, buttonText);
  };

  return (
    <footer className="bg-secondary/30 py-12 border-t border-border relative overflow-hidden">
      {/* Divine glow effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 animate-pulse"></div>
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full filter blur-3xl animate-float"></div>
      <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-blue-500/20 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="section-container py-0 relative z-10">
        {/* Educational disclaimer */}
        <div className="mb-8 bg-gradient-to-r from-yellow-100/90 to-orange-100/90 border border-yellow-300 rounded-xl p-6 text-center shadow-lg backdrop-blur-sm">
          <p className="text-sm text-gray-800 font-medium">
            <strong>Educational Disclaimer:</strong> This website and its content are provided for informational, educational, and research purposes only. 
            The AI tools and educational content are not substitutes for professional advice, formal education, or accredited programs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-1 space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary animate-pulse">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="absolute inset-0 bg-primary/20 rounded-full filter blur-md animate-pulse"></div>
              </div>
              <span className="font-bold tracking-tight text-lg bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">College Degree GPT</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your personal AI professor, offering comprehensive college education on any subject.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold mb-4 text-base bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" onClick={handleExternalLink('https://docs.google.com/document/d/1TpVG9pncULpkHy9IhAjyXIgScyTW703Lf-IQKkXeJs4/edit?tab=t.0', 'Open Source College Degree GPT Prompt')} className="text-muted-foreground hover:text-foreground transition-colors">Open Source College Degree GPT Prompt</a>
              </li>
              <li>
                <a href="#" onClick={handleExternalLink('https://chatgpt.com/g/g-6730d59e8e648190be4221e319aad5cd-learn-any-course-gpt', 'Learn Any Course GPT')} className="text-muted-foreground hover:text-foreground transition-colors">Learn Any Course GPT</a>
              </li>
              <li>
                <a href="#" onClick={handleExternalLink('https://learnanyskillgpt.lovable.app/', 'Learn Any Skill GPT')} className="text-muted-foreground hover:text-foreground transition-colors">Learn Any Skill GPT</a>
              </li>
              <li>
                <a href="#" onClick={handleExternalLink('https://docs.google.com/document/d/1qtDKo3XN_EsspgrQD72Cpq2qh83H5xSd/edit?usp=sharing&ouid=116187507271950139405&rtpof=true&sd=true', 'Ai Tools Free Downloadable List')} className="text-muted-foreground hover:text-foreground transition-colors">Ai Tools Free Downloadable List</a>
              </li>
              <li>
                <a href="#" onClick={handleExternalLink('https://chatgpt.com/g/g-cUahkn19i-quiz-maker-ai', 'Quiz Maker GPT')} className="text-muted-foreground hover:text-foreground transition-colors">Quiz Maker GPT</a>
              </li>
              <li className="pt-2">
                <Button variant="outline" size="sm" className="w-full" onClick={handleExternalLink('https://www.coursera.org/google-certificates/data-analytics-certificate?action=enroll&gwg_campaign_id=null&gwg_exp=null&utm_campaign=sou--google__med--hpp__cam--2025-gwg-brand__geo--US__con--join-one-million-gcc-grads__ter--null&utm_medium=institutions&utm_source=google', 'Enroll In Free Google AI Certificate Program')}>
                  Enroll In Free Google AI Certificate Program
                </Button>
              </li>
              <li className="pt-2">
                <Button 
                  variant="default" 
                  size="sm" 
                  className="w-full rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-pulse border-2 border-white/20"
                  onClick={handleExternalLink('https://www.aiwebtools.ai', 'MORE AI TOOLS')}
                >
                  🚀 MORE AI TOOLS 🚀
                </Button>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold mb-4 text-base bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">Ai Web Tools LLC</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" onClick={handleExternalLink('https://www.aiwebtools.ai', 'About Us')} className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:text-purple-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" onClick={handleExternalLink('https://aiwebtools.lovable.app/disclaimers', 'Terms of Service')} className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:text-purple-400">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="tel:+14758008096" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:text-blue-400">
                  Contact Our 24/7 Ai Agent
                </a>
              </li>
              <li className="pt-3">
                <Button variant="outline" size="sm" className="w-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-400/50 hover:from-purple-600/30 hover:to-pink-600/30 transition-all duration-300" onClick={handleExternalLink('https://chatgpt.com/g/g-cUahkn19i-quiz-maker-ai', 'QUIZ MAKER GPT')}>
                  QUIZ MAKER GPT
                </Button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; 2025 AI WEB TOOLS LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
