import { useMemo, useState } from 'react';
import { BookOpen, Download, Search } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { publicLessons, searchPublicLessons } from '@/data/publicLessons';

export default function PublicLessonLibrary() {
  const [query, setQuery] = useState('');
  const results = useMemo(() => searchPublicLessons(publicLessons, query), [query]);

  return (
    <Accordion type="single" collapsible className="min-w-0 text-foreground">
      <AccordionItem value="free-lessons" className="border-border">
        <AccordionTrigger className="gap-3 text-left text-sm hover:no-underline">
          <span className="flex min-w-0 items-center gap-3">
            <BookOpen className="h-5 w-5 shrink-0 text-primary" />
            <span>Free Degree &amp; Course PDFs</span>
          </span>
        </AccordionTrigger>
        <AccordionContent className="space-y-4">
          <p className="text-sm text-muted-foreground">AI-generated lessons for everyone, at no cost. Self-paced, self-taught learning — not accredited; no official degrees or college credits.</p>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input type="search" aria-label="Search free degree and course PDFs" placeholder="Search degrees, courses, subjects…" value={query} onChange={(event) => setQuery(event.target.value)} className="h-11 pl-9 text-base" />
          </div>
          <p role="status" aria-live="polite" className="text-xs text-muted-foreground">
            {results.length} {results.length === 1 ? 'PDF' : 'PDFs'} available
          </p>
          {results.length > 0 ? (
            <ul className="space-y-3">
              {results.map((lesson) => (
                <li key={lesson.id} className="space-y-2 border-b border-border pb-3">
                  <p className="text-xs text-primary">{lesson.kind} · {lesson.subject} · Free PDF</p>
                  <h3 className="break-words font-semibold">{lesson.title}</h3>
                  <p className="break-words text-sm text-muted-foreground">{lesson.description}</p>
                  <Button asChild variant="outline" size="sm" className="h-auto min-h-11 whitespace-normal">
                    <a href={lesson.pdfPath} download><Download className="mr-2 h-4 w-4 shrink-0" />Download {lesson.title} PDF</a>
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="py-2 text-sm text-muted-foreground">
              {publicLessons.length === 0 ? 'No public lesson PDFs have been added yet.' : 'No matching lessons. Try another subject or course name.'}
            </p>
          )}
          <p className="text-xs text-muted-foreground">For educational and research purposes only. Not a substitute for formal education, professional licensing, or graduate admissions.</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}