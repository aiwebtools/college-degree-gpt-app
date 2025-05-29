
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { createTimePortalEffect } from '@/utils/timeEffects';

const Footer: React.FC = () => {
  const handleExternalLink = (url: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    createTimePortalEffect(url);
  };

  return <footer className="bg-secondary/30 py-12 border-t border-border">
      <div className="section-container py-0">
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
              Your personal AI professor, offering comprehensive college education on any subject.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 text-sm">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" onClick={handleExternalLink('https://docs.google.com/document/d/1TpVG9pncULpkHy9IhAjyXIgScyTW703Lf-IQKkXeJs4/edit?tab=t.0')} className="text-muted-foreground hover:text-foreground transition-colors">Open Source College Degree GPT Prompt</a>
              </li>
              <li>
                <a href="#" onClick={handleExternalLink('https://chatgpt.com/g/g-6730d59e8e648190be4221e319aad5cd-learn-any-course-gpt')} className="text-muted-foreground hover:text-foreground transition-colors">Learn Any Course GPT</a>
              </li>
              <li>
                <a href="#" onClick={handleExternalLink('https://learnanyskillgpt.lovable.app/')} className="text-muted-foreground hover:text-foreground transition-colors">Learn Any Skill GPT</a>
              </li>
              <li>
                <a href="#" onClick={handleExternalLink('https://docs.google.com/document/d/1qtDKo3XN_EsspgrQD72Cpq2qh83H5xSd/edit?usp=sharing&ouid=116187507271950139405&rtpof=true&sd=true')} className="text-muted-foreground hover:text-foreground transition-colors">Ai Tools Free Downloadable List</a>
              </li>
              <li>
                <a href="#" onClick={handleExternalLink('https://chatgpt.com/g/g-cUahkn19i-quiz-maker-ai')} className="text-muted-foreground hover:text-foreground transition-colors">Quiz Maker GPT</a>
              </li>
              <li className="pt-2">
                <Button variant="outline" size="sm" className="w-full" onClick={handleExternalLink('https://www.coursera.org/google-certificates/data-analytics-certificate?action=enroll&gwg_campaign_id=null&gwg_exp=null&utm_campaign=sou--google__med--hpp__cam--2025-gwg-brand__geo--US__con--join-one-million-gcc-grads__ter--null&utm_medium=institutions&utm_source=google')}>
                  Enroll In Free Google AI Certificate Program
                </Button>
              </li>
              <li className="pt-2">
                <Button 
                  variant="default" 
                  size="sm" 
                  className="w-full rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-pulse border-2 border-white/20"
                  onClick={handleExternalLink('https://www.aiwebtools.ai')}
                >
                  🚀 MORE AI TOOLS 🚀
                </Button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 text-sm">Ai Web Tools LLC</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" onClick={handleExternalLink('https://www.aiwebtools.ai')} className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" onClick={handleExternalLink('https://aiwebtools.ai/terms-of-services')} className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="tel:+14758008096" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Our 24/7 Ai Agent
                </a>
              </li>
              <li className="pt-2">
                <Button variant="outline" size="sm" className="w-full" onClick={handleExternalLink('https://chatgpt.com/g/g-cUahkn19i-quiz-maker-ai')}>
                  QUIZ MAKER GPT
                </Button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            &copy; 2025 AI WEB TOOLS LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>;
};

export default Footer;
