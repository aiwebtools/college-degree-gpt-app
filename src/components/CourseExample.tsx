import React from 'react';
import { Button } from '@/components/ui/button';
import AnimatedSection from './AnimatedSection';
import GlassMorphism from './ui/GlassMorphism';
const CourseExample: React.FC = () => {
  const [showVideo, setShowVideo] = React.useState(false);
  const PlayButton = () => {};
  return <section id="example" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent"></div>
      <div className="section-container relative z-10">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="chip mb-6">See It In Action</span>
          <h2 className="heading mb-6">Experience a College-Level Course</h2>
          <p className="subheading max-w-2xl mx-auto">
            Watch how College Degree GPT creates and delivers a personalized course experience 
            tailored to your specific learning goals.
          </p>
        </AnimatedSection>
        
        <AnimatedSection>
          <div className="max-w-4xl mx-auto relative rounded-2xl overflow-hidden shadow-2xl">
            {showVideo ? <div className="aspect-video w-full">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" title="College Degree GPT Demo" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="aspect-video"></iframe>
              </div> : <div className="relative">
                <img src="https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Course example thumbnail" className="w-full aspect-video object-cover" />
                <PlayButton />
              </div>}
          </div>
        </AnimatedSection>
      </div>
    </section>;
};
export default CourseExample;