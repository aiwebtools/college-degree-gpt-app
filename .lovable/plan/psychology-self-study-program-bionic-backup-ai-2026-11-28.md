# Psychology self-study program + Bionic backup AI

## 1. Backup AI for the in-site class chat
- Lovable AI stays the main brain for the class chat.
- When Lovable AI credits run out or hit a limit, the chat switches to your Bionic account and keeps teaching. It uses the GLM-5.3 Flash model.
- The ChatGPT version button with the credits notice only shows if Bionic also fails.
- A secure form asks for your Bionic API key and the Bionic API address. Your key never goes in the app's code.
- Lesson images and the professor voice still use Lovable AI. If those run out too, the lesson keeps going as text.

## 2. Reference college: Stanford University, BA Psychology
- Stanford ranks at or near the top for psychology. I'll use its current published psychology major requirements: foundations, core areas, methods/statistics, and electives.
- I'll research the official requirement pages, record the sources, and build a course map.
- Labs, research credit and other hands-on requirements will be listed clearly as things these PDFs cannot replace.

## 3. Produce the first course PDF
- Course 1: Introduction to Psychology. It will include a course intro, objectives, modules, and every lesson written out in full (explanations, examples, summary). It will also have checked YouTube links, generated images with the logo in the corner, and the non-accredited / not affiliated with Stanford notice.
- I'll review every page, then add the PDF to the searchable library in the menu with subject tags.
- The remaining courses get built one course at a time in later turns. The full-program download appears only when every course is done.

## Technical details
- Secrets: `BIONIC_API_KEY`, `BIONIC_BASE_URL` (OpenAI-compatible endpoint assumed), model id `GLM-5.3 Flash`. I'll confirm the exact id against Bionic's model list.
- `supabase/functions/chat/index.ts`: if the gateway returns 402/403/429 credit errors, retry with `createOpenAI({ baseURL: BIONIC_BASE_URL, apiKey })` and leave the image tool off. The system prompt stays verbatim. Redeploy and test both paths.
- PDFs go in `public/downloads/psychology/` and get registered in `src/data/publicLessons.ts`. Update the tests.
- Record the fallback rule in `AGENTS.md`.
