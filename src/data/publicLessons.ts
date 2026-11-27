export interface PublicLesson {
  id: string;
  title: string;
  subject: string;
  kind: 'Degree' | 'Course';
  description: string;
  tags: string[];
  pdfPath: string;
}

// Add only owner-approved, public PDF files. Student chat histories stay private.
export const publicLessons: PublicLesson[] = [];

export function searchPublicLessons(lessons: PublicLesson[], query: string): PublicLesson[] {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  return lessons.filter((lesson) => {
    const searchable = [lesson.title, lesson.subject, lesson.kind, lesson.description, ...lesson.tags]
      .join(' ').toLowerCase();
    return terms.every((term) => searchable.includes(term));
  });
}