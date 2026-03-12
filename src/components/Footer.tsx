
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { createTimePortalEffect } from '@/utils/timeEffects';

const Footer: React.FC = () => {
  const handleExternalLink = (url: string, buttonText: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    createTimePortalEffect(url, buttonText);
  };

  return <footer className="bg-secondary/30 py-12 border-t border-border">
      <div className="section-container py-0">
        {/* SEO-optimized hidden content */}
        <div className="sr-only">
          <h3>AI Web Tools - Free AI Tools Directory</h3>
          <p>Comprehensive collection of free AI tools, AI web tools, and artificial intelligence applications. College Degree GPT, Learn Any Skill GPT, Quiz Maker GPT, and more educational AI tools for students, professionals, and researchers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-bold tracking-tight">College Degree GPT</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your personal AI professor, offering comprehensive college education on any subject. Part of the AI Web Tools collection of free AI tools.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 text-sm">Free AI Tools & Resources</h3>
            <ul className="space-y-2 text-sm">
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
                <a href="#" onClick={handleExternalLink('https://docs.google.com/document/d/1qtDKo3XN_EsspgrQD72Cpq2qh83H5xSd/edit?usp=sharing&ouid=116187507271950139405&rtpof=true&sd=true', 'Free AI Tools List Download')} className="text-muted-foreground hover:text-foreground transition-colors">Free AI Tools List Download</a>
              </li>
              <li>
                <a href="#" onClick={handleExternalLink('https://chatgpt.com/g/g-cUahkn19i-quiz-maker-ai', 'Quiz Maker AI Tool')} className="text-muted-foreground hover:text-foreground transition-colors">Quiz Maker AI Tool</a>
              </li>
              <li className="pt-2">
                <Button variant="outline" size="sm" className="w-full" onClick={handleExternalLink('https://www.coursera.org/google-certificates/data-analytics-certificate?action=enroll&gwg_campaign_id=null&gwg_exp=null&utm_campaign=sou--google__med--hpp__cam--2025-gwg-brand__geo--US__con--join-one-million-gcc-grads__ter--null&utm_medium=institutions&utm_source=google', 'Free Google AI Certificate Program')}>
                  Free Google AI Certificate Program
                </Button>
              </li>
              <li className="pt-2">
                <Button 
                  variant="default" 
                  size="sm" 
                  className="w-full rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-pulse border-2 border-white/20"
                  onClick={handleExternalLink('https://aiwebtools.lovable.app/?via=aiwebtools', 'MORE FREE AI TOOLS')}
                >
                  🚀 MORE FREE AI TOOLS 🚀
                </Button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 text-sm">AI Web Tools LLC</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" onClick={handleExternalLink('https://www.aiwebtools.ai', 'About AI Web Tools')} className="text-muted-foreground hover:text-foreground transition-colors">
                  About AI Web Tools
                </a>
              </li>
              <li>
                <a href="#" onClick={handleExternalLink('https://aiwebtools.lovable.app/disclaimers', 'Terms of Service & Disclaimers')} className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service & Disclaimers
                </a>
              </li>
              <li>
                <a href="tel:+14758008096" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Our 24/7 AI Agent
                </a>
              </li>
              <li className="pt-2">
                <Button variant="outline" size="sm" className="w-full" onClick={handleExternalLink('https://chatgpt.com/g/g-cUahkn19i-quiz-maker-ai', 'QUIZ MAKER AI TOOL')}>
                  QUIZ MAKER AI TOOL
                </Button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            &copy; 2025 AI WEB TOOLS LLC. All rights reserved. | Free AI Tools | AI Web Tools | Educational AI Resources
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            College Degree GPT, Learn Any Skill GPT, and Quiz Maker AI are free AI tools for educational and research purposes.
          </p>
        </div>
      </div>
    </footer>;
};

export default Footer;
