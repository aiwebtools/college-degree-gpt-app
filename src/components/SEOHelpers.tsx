
import { useEffect } from 'react';

// SEO Helper component to add additional meta tags and structured data
export const SEOHelpers: React.FC = () => {
  useEffect(() => {
    // Add additional structured data for better SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is College Degree GPT?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "College Degree GPT is a free AI education tool that provides college-level learning on any subject without student debt. It's one of the best free AI tools for students and self-learners."
          }
        },
        {
          "@type": "Question",
          "name": "Are these AI tools really free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, all AI Web Tools including College Degree GPT, Learn Any Skill GPT, and Quiz Maker AI are completely free to use. No hidden costs or subscription fees."
          }
        },
        {
          "@type": "Question",
          "name": "What makes AI Web Tools different from other AI tools?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AI Web Tools focuses on education and accessibility, providing free AI tools that help users learn and grow without financial barriers. Our tools are designed for students, professionals, and anyone seeking knowledge."
          }
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
};

export default SEOHelpers;
