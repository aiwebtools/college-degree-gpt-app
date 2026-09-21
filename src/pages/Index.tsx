
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import FreeCollegeClasses from '@/components/FreeCollegeClasses';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import SEOHelpers from '@/components/SEOHelpers';
import PageMeta from '@/components/PageMeta';

const Index = () => {
  // Ensure smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#') && anchor.href.includes(window.location.pathname)) {
        e.preventDefault();
        
        const targetElement = document.querySelector(anchor.hash);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.scrollY - 100,
            behavior: 'smooth'
          });
          
          // Update URL but don't scroll (we already did that)
          window.history.pushState(null, '', anchor.hash);
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Free College Classes Online — No Cost | College Degree GPT"
        description="Take free college classes online in any subject. A free AI professor teaches full courses lesson by lesson — no tuition, no fees, no student debt."
        path="/"
      />
      <SEOHelpers />
      <Navbar />
      <main className="rebellion-theme">
        <Hero />
        <HowItWorks />
        <FreeCollegeClasses />
        <CTA />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
