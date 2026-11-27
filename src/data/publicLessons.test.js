import { describe, expect, test } from 'bun:test';
import { searchPublicLessons } from './publicLessons';

const lessons = [
  { id: 'business', title: 'Business Administration', subject: 'Business', kind: 'Degree', description: 'AI-generated lessons for self-learning', tags: ['management', 'finance'], pdfPath: '/lessons/business.pdf' },
  { id: 'psychology', title: 'Introduction to Psychology', subject: 'Psychology', kind: 'Course', description: 'AI-generated lessons for self-learning', tags: ['behavior'], pdfPath: '/lessons/psychology.pdf' },
];

describe('public lesson search', () => {
  test('finds Business Administration by degree title, regardless of capitalization', () => {
    expect(searchPublicLessons(lessons, ' BUSINESS administration ').map((lesson) => lesson.id)).toEqual(['business']);
  });
  test('finds lessons by subject and tags', () => {
    expect(searchPublicLessons(lessons, 'finance').map((lesson) => lesson.id)).toEqual(['business']);
    expect(searchPublicLessons(lessons, 'psychology').map((lesson) => lesson.id)).toEqual(['psychology']);
  });
  test('returns all free lessons for an empty search and none for an unknown subject', () => {
    expect(searchPublicLessons(lessons, '')).toHaveLength(2);
    expect(searchPublicLessons(lessons, 'astrophysics')).toHaveLength(0);
  });
});