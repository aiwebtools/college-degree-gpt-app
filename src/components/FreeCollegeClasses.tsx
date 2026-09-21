import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AnimatedSection from './AnimatedSection';
import GlassMorphism from './ui/GlassMorphism';
import { createTimePortalEffect, createInternalPortalEffect } from '@/utils/timeEffects';

const subjects = [
  {
    title: 'Math & Statistics',
    topics: 'Algebra, calculus, linear algebra, statistics, and discrete math — from remediation to upper-level coursework.',
  },
  {
    title: 'Computer Science',
    topics: 'Programming fundamentals, data structures, algorithms, web development, databases, and AI & machine learning.',
  },
  {
    title: 'Business & Finance',
    topics: 'Accounting, marketing, management, micro- and macroeconomics, entrepreneurship, and personal finance.',
  },
  {
    title: 'Natural Sciences',
    topics: 'Biology, chemistry, physics, astronomy, and environmental science with worked examples and visual explainers.',
  },
  {
    title: 'Humanities & Writing',
    topics: 'Literature, history, philosophy, and college-level essay writing and composition, taught module by module.',
  },
  {
    title: 'Social Sciences',
    topics: 'Psychology, sociology, political science, and criminal justice, following real college curricula.',
  },
  {
    title: 'Engineering Basics',
    topics: 'Foundational coursework in electrical, mechanical, and civil engineering tracks, plus prerequisite math.',
  },
  {
    title: 'Arts & Design',
    topics: 'Music theory, art history, and digital design fundamentals with curated video demonstrations.',
  },
  {
    title: 'Health & Wellness Studies',
    topics: 'Anatomy, nutrition, and public health study content for self-study — not clinical or licensing training.',
  },
];

const includes = [
  'A complete course list for your chosen degree, organized by academic year and semester',
  'Lesson-by-lesson teaching with clear learning objectives for every class',
  'Generated visual summaries and lesson images so concepts are easy to picture',
  'Curated YouTube video recommendations for every major topic',
  'Real-world applications that connect each lesson to how it is actually used',
  '24/7 answers — ask follow-up questions any time and get patient, professor-style explanations',
];

const faqs = [
  {
    q: 'Are these college classes really free?',
    a: 'Yes. There is no tuition, no enrollment fee, and no paywall. College Degree GPT is a free AI professor that teaches complete college-level classes on any subject, built as a liberation education project by AI Web Tools to fight the student debt cycle.',
  },
  {
    q: 'Do I have to apply or enroll anywhere?',
    a: 'No applications, transcripts, or admissions. Open the class chat, tell the AI professor which degree or class you want to take, and your first lesson begins immediately. A quick free sign-in keeps your courses and progress saved between sessions.',
  },
  {
    q: 'Will I earn college credit or a certificate?',
    a: 'No — and we will never pretend otherwise. This is self-taught, non-accredited learning for informational and educational purposes. It cannot replace formal education requirements on job applications, professional licensing, or graduate school admissions. What it gives you instead is a real college-level education at no cost, and freedom from debt.',
  },
  {
    q: 'What makes these classes different from other free online courses?',
    a: 'Most free course catalogs hand you recorded lectures and leave you alone. College Degree GPT actually teaches: it plans your full curriculum, walks you through every lesson in sequence, checks your understanding, generates visuals, answers your questions 24/7, and adapts to how fast you learn.',
  },
];

const FreeCollegeClasses: React.FC = () => {
  const navigate = useNavigate();
  const handleExternalLink = (url: string, buttonText: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    createTimePortalEffect(url, buttonText);
  };
  const handleInternalChat = (e: React.MouseEvent) => {
    e.preventDefault();
    createInternalPortalEffect(navigate, '/chat', 'Open College Degree GPT');
  };

  return (
    <section id="free-college-classes" className="py-24 relative overflow-hidden bg-liberation-night">
      <div className="absolute inset-0 bg-hero-pattern opacity-5"></div>
      <div className="absolute top-1/3 -left-20 w-80 h-80 bg-red-500/20 rounded-full filter blur-3xl opacity-20 animate-float"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-500/20 rounded-full filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="section-container relative z-10">
        <AnimatedSection className="text-center mb-12">
          <span className="chip mb-4">Free College Classes</span>
          <h2 className="heading text-3xl md:text-4xl lg:text-5xl mb-6 text-white">
            Free College Classes on <span className="text-red-500">Any Subject</span> — Taught, Not Just Uploaded
          </h2>
          <p className="subheading text-lg max-w-3xl mx-auto text-gray-200">
            Looking for free college classes online? College Degree GPT gives you a complete college education at no cost: pick any degree or subject, get the full course list a real college would use, and learn every class lesson by lesson with a free AI professor — no tuition, no fees, no student debt.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {subjects.map((s, i) => (
            <AnimatedSection key={s.title} animation="fade-in-up" delay={0.05 * i} className="h-full">
              <GlassMorphism className="h-full p-6 card-hover">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{s.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{s.topics}</p>
              </GlassMorphism>
            </AnimatedSection>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-16">
          <AnimatedSection animation="fade-in-right">
            <h3 className="heading text-2xl md:text-3xl mb-6 text-white">What Every Free Class Includes</h3>
            <ul className="space-y-4">
              {includes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-200">
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </AnimatedSection>

          <AnimatedSection animation="fade-in-left" delay={0.2}>
            <GlassMorphism className="p-6 md:p-8">
              <h3 className="heading text-2xl md:text-3xl mb-4 text-gray-900">Questions People Ask</h3>
              <div className="space-y-6">
                {faqs.map((f) => (
                  <div key={f.q}>
                    <h4 className="font-semibold text-red-600 mb-1">{f.q}</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{f.a}</p>
                  </div>
                ))}
              </div>
            </GlassMorphism>
          </AnimatedSection>
        </div>

        <AnimatedSection className="text-center">
          <div className="mb-6 bg-yellow-100/80 border border-yellow-300 rounded-lg p-4 text-sm text-gray-800 max-w-3xl mx-auto">
            <p className="mb-2">
              <strong>Important:</strong> College Degree GPT provides free educational content for self-study and is not an accredited degree program.
            </p>
            <p>
              This service cannot be used as a substitute for formal education requirements on job applications, professional licensing, or graduate school admissions.
            </p>
          </div>

          <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center md:flex-wrap">
            <Button
              size="lg"
              className="rounded-full px-8 py-6 text-base font-semibold w-full md:w-auto bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20"
              onClick={handleInternalChat}
            >
              Start Your Free College Classes
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 py-6 text-base w-full md:w-auto border-white text-white hover:bg-white/20"
              onClick={handleExternalLink('https://chatgpt.com/g/g-zF3j9G3Wd-college-degree-gpt', 'ChatGPT Custom GPT Version')}
            >
              ChatGPT Custom GPT Version
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FreeCollegeClasses;
