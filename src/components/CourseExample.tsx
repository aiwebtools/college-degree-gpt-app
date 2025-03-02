
import React from 'react';
import AnimatedSection from './AnimatedSection';
import GlassMorphism from './ui/GlassMorphism';

interface Course {
  id: number;
  code: string;
  title: string;
  semester: string;
  description: string;
}

const courses: Course[] = [
  {
    id: 1,
    code: "PSYC 101",
    title: "Introduction to Psychology",
    semester: "Year 1, Fall",
    description: "Foundational concepts in psychology, including research methods, biological bases of behavior, cognition, and development."
  },
  {
    id: 2,
    code: "BIOL 110",
    title: "Human Biology",
    semester: "Year 1, Fall",
    description: "Basic principles of human anatomy and physiology, cellular biology, and the systems of the human body."
  },
  {
    id: 3,
    code: "WRIT 101",
    title: "College Writing",
    semester: "Year 1, Fall",
    description: "Fundamentals of academic writing, critical thinking, and rhetorical strategies for college-level discourse."
  },
  {
    id: 4,
    code: "MATH 120",
    title: "Statistics for Social Sciences",
    semester: "Year 1, Spring",
    description: "Introduction to statistical methods and their application to research in the social sciences."
  },
  {
    id: 5,
    code: "PSYC 210",
    title: "Developmental Psychology",
    semester: "Year 1, Spring",
    description: "Human development across the lifespan, including physical, cognitive, and socioemotional changes."
  },
  {
    id: 6,
    code: "PHIL 101",
    title: "Introduction to Philosophy",
    semester: "Year 1, Spring",
    description: "Survey of major philosophical concepts, methods, and traditions in Western and non-Western thought."
  }
];

const CourseCard: React.FC<{ course: Course; index: number }> = ({ course, index }) => {
  return (
    <AnimatedSection animation="fade-in-up" delay={0.1 * index} className="h-full">
      <GlassMorphism className="h-full p-5 card-hover">
        <div className="flex justify-between items-start mb-3">
          <span className="chip">{course.semester}</span>
          <span className="text-sm font-mono text-muted-foreground">{course.code}</span>
        </div>
        <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
        <p className="text-sm text-muted-foreground">{course.description}</p>
      </GlassMorphism>
    </AnimatedSection>
  );
};

const CourseExample: React.FC = () => {
  return (
    <section id="example" className="py-24 bg-gradient-radial from-white to-secondary/40">
      <div className="section-container">
        <AnimatedSection className="text-center mb-16">
          <span className="chip mb-3">Sample Curriculum</span>
          <h2 className="heading text-3xl md:text-4xl mb-4">Psychology Degree: First Year</h2>
          <p className="subheading mx-auto">
            Explore a sample of the first-year curriculum for a Psychology degree, showcasing how College Degree GPT structures your educational journey.
          </p>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {courses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>
        
        <AnimatedSection animation="fade-in" delay={0.4} className="mt-12 text-center">
          <GlassMorphism className="inline-block px-6 py-4">
            <p className="text-muted-foreground">
              This is just a sample. College Degree GPT can create comprehensive curricula for <span className="text-foreground font-medium">any degree program</span> you're interested in.
            </p>
          </GlassMorphism>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default CourseExample;
