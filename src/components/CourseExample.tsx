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
const courses: Course[] = [{
  id: 1,
  code: "PSYC 101",
  title: "Introduction to Psychology",
  semester: "Year 1, Fall",
  description: "Foundational concepts in psychology, including research methods, biological bases of behavior, cognition, and development."
}, {
  id: 2,
  code: "BIOL 110",
  title: "Human Biology",
  semester: "Year 1, Fall",
  description: "Basic principles of human anatomy and physiology, cellular biology, and the systems of the human body."
}, {
  id: 3,
  code: "WRIT 101",
  title: "College Writing",
  semester: "Year 1, Fall",
  description: "Fundamentals of academic writing, critical thinking, and rhetorical strategies for college-level discourse."
}, {
  id: 4,
  code: "MATH 120",
  title: "Statistics for Social Sciences",
  semester: "Year 1, Spring",
  description: "Introduction to statistical methods and their application to research in the social sciences."
}, {
  id: 5,
  code: "PSYC 210",
  title: "Developmental Psychology",
  semester: "Year 1, Spring",
  description: "Human development across the lifespan, including physical, cognitive, and socioemotional changes."
}, {
  id: 6,
  code: "PHIL 101",
  title: "Introduction to Philosophy",
  semester: "Year 1, Spring",
  description: "Survey of major philosophical concepts, methods, and traditions in Western and non-Western thought."
}];
const CourseCard: React.FC<{
  course: Course;
  index: number;
}> = ({
  course,
  index
}) => {
  return <AnimatedSection animation="fade-in-up" delay={0.1 * index} className="h-full">
      <GlassMorphism className="h-full p-5 card-hover">
        <div className="flex justify-between items-start mb-3">
          <span className="chip">{course.semester}</span>
          <span className="text-sm font-mono text-muted-foreground">{course.code}</span>
        </div>
        <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
        <p className="text-sm text-muted-foreground">{course.description}</p>
      </GlassMorphism>
    </AnimatedSection>;
};
const CourseExample: React.FC = () => {
  return;
};
export default CourseExample;