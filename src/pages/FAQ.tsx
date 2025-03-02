
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';

const FAQ: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <div className="section-container py-16">
          <AnimatedSection className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Frequently Asked Questions (FAQ)</h1>
            <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center">College Degree GPT – Your Free AI-Powered College Educator</h2>
            <p className="mb-8 text-center">Below are answers to common questions about College Degree GPT and how it works.</p>

            <div className="space-y-8">
              <div className="bg-secondary/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">1. What is College Degree GPT?</h3>
                <p>College Degree GPT is an AI-powered learning platform that provides structured, university-style education for free. It delivers step-by-step instruction modeled after real-world degree programs, allowing anyone to access high-quality education without financial barriers.</p>
              </div>

              <div className="bg-secondary/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">2. Is College Degree GPT accredited?</h3>
                <p>No, College Degree GPT is not an accredited institution and does not issue official degrees or certifications. It is designed as a self-learning tool for those who want to expand their knowledge and skills without attending a formal university.</p>
              </div>

              <div className="bg-secondary/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">3. How does College Degree GPT work?</h3>
                <p>Our AI-powered system follows a structured educational approach:</p>
                <ul className="list-none space-y-2 mt-2">
                  <li>1️⃣ You choose a degree and the institution you'd like your learning to be based on.</li>
                  <li>2️⃣ College Degree GPT compiles a full course list, modeled after real university curriculums.</li>
                  <li>3️⃣ A detailed course outline is created for each subject, broken down into lessons.</li>
                  <li>4️⃣ AI-driven instruction teaches each lesson in-depth, just like a professor would.</li>
                  <li>5️⃣ You progress through your degree at your own pace, one course at a time.</li>
                </ul>
              </div>

              <div className="bg-secondary/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">4. What subjects can I learn?</h3>
                <p>College Degree GPT covers a wide range of subjects, including:</p>
                <ul className="list-none space-y-2 mt-2">
                  <li>📊 Business & Finance</li>
                  <li>💻 Computer Science & IT</li>
                  <li>⚖️ Law & Political Science</li>
                  <li>🏥 Health & Medicine</li>
                  <li>📖 Humanities & Social Sciences</li>
                  <li>🔬 Science & Engineering</li>
                  <li>🎨 Art & Design</li>
                  <li>🔍 And many more!</li>
                </ul>
                <p className="mt-2">Whether you want to explore a new field or master a subject in-depth, College Degree GPT provides a structured learning path for every major.</p>
              </div>

              <div className="bg-secondary/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">5. Is College Degree GPT really free?</h3>
                <p>Yes! College Degree GPT is completely free to use, making high-quality education accessible to everyone.</p>
                <p className="mt-2">🚨 However, we recommend having a ChatGPT Plus membership for the best experience, as it ensures unrestricted access and seamless learning without limitations. While free-tier users can still learn, a Plus subscription enhances performance and speeds up access to lessons.</p>
              </div>

              <div className="bg-secondary/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">6. Can I earn a degree or certificate from College Degree GPT?</h3>
                <p>No, since College Degree GPT is not an accredited institution, it does not grant official degrees or certifications. However, it provides a structured, university-level learning experience that helps you build real knowledge and skills.</p>
              </div>

              <div className="bg-secondary/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">7. Can I use College Degree GPT to supplement my current studies?</h3>
                <p>Absolutely! College Degree GPT can be used as a study companion for students enrolled in traditional universities. It provides:</p>
                <ul className="list-none space-y-2 mt-2">
                  <li>📖 Additional explanations of complex topics</li>
                  <li>📌 Structured learning paths that complement university courses</li>
                  <li>💡 Extra resources for deeper understanding</li>
                </ul>
                <p className="mt-2">Whether you're a student or a lifelong learner, this AI-powered platform helps reinforce what you learn elsewhere.</p>
              </div>

              <div className="bg-secondary/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">8. Can I ask College Degree GPT questions?</h3>
                <p>Yes! College Degree GPT allows you to ask questions, request clarification, and dive deeper into subjects—just like a real professor would guide you in a classroom setting.</p>
              </div>

              <div className="bg-secondary/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">9. Does College Degree GPT provide resources like videos and images?</h3>
                <p>Yes! To enhance learning, College Degree GPT integrates:</p>
                <ul className="list-none space-y-2 mt-2">
                  <li>🔗 Curated YouTube videos – Selected educational content to reinforce your studies.</li>
                  <li>🎨 AI-generated visuals – Graphs, charts, and images to illustrate key concepts.</li>
                  <li>🧠 Engaging explanations – Lessons that are vivid, detailed, and easy to understand.</li>
                </ul>
                <p className="mt-2">This multimedia approach makes learning more immersive and effective.</p>
              </div>

              <div className="bg-secondary/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">10. How long does it take to complete a degree with College Degree GPT?</h3>
                <p>There is no fixed timeline—you learn at your own pace! Unlike traditional universities, there are:</p>
                <ul className="list-none space-y-2 mt-2">
                  <li>✔ No deadlines or semester restrictions</li>
                  <li>✔ No time limits</li>
                  <li>✔ No pressure—just pure learning</li>
                </ul>
                <p className="mt-2">You can move as quickly or as slowly as you like, depending on your schedule and goals.</p>
              </div>

              <div className="bg-secondary/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">11. Who can benefit from College Degree GPT?</h3>
                <p>College Degree GPT is designed for:</p>
                <ul className="list-none space-y-2 mt-2">
                  <li>✔ Self-learners looking for structured, university-style education.</li>
                  <li>✔ Students who need extra learning support.</li>
                  <li>✔ Lifelong learners exploring new subjects without financial barriers.</li>
                  <li>✔ Individuals without access to traditional higher education.</li>
                </ul>
                <p className="mt-2">This platform ensures that everyone, regardless of background, has access to knowledge.</p>
              </div>

              <div className="bg-secondary/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">12. How is College Degree GPT different from online courses?</h3>
                <p>Unlike typical online courses, College Degree GPT provides an entire degree structure rather than just standalone lessons.</p>
                <ul className="list-none space-y-2 mt-2">
                  <li>✔ Modeled after real university curriculums</li>
                  <li>✔ Full course sequences, not just single subjects</li>
                  <li>✔ Step-by-step, progressive learning—just like in a traditional college</li>
                </ul>
                <p className="mt-2">This makes it a comprehensive alternative for self-learning.</p>
              </div>

              <div className="bg-secondary/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">13. Do I need prior knowledge to use College Degree GPT?</h3>
                <p>No! College Degree GPT offers beginner-friendly courses that start with the basics and gradually move to advanced topics.</p>
                <ul className="list-none space-y-2 mt-2">
                  <li>🆕 No experience required—just curiosity and a willingness to learn!</li>
                  <li>🎓 Structured pathways that guide you from beginner to expert.</li>
                </ul>
                <p className="mt-2">Whether you're new to a subject or looking to deepen your expertise, this platform is built for learners of all levels.</p>
              </div>

              <div className="bg-secondary/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">14. Can College Degree GPT help with career advancement?</h3>
                <p>While it doesn't provide official certifications, College Degree GPT helps you develop in-depth knowledge and industry-relevant skills that can be useful for:</p>
                <ul className="list-none space-y-2 mt-2">
                  <li>✔ Job applications – Expanding your knowledge base in key fields.</li>
                  <li>✔ Skill-building – Learning new tools, concepts, and strategies.</li>
                  <li>✔ Personal development – Strengthening critical thinking and expertise.</li>
                </ul>
                <p className="mt-2">Education is power, and this AI-driven platform helps you gain it—for free.</p>
              </div>

              <div className="bg-secondary/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">15. How do I start learning?</h3>
                <p>Getting started is easy!</p>
                <ul className="list-none space-y-2 mt-2">
                  <li>1️⃣ Select your degree and the institution you want your courses to be based on.</li>
                  <li>2️⃣ College Degree GPT will generate your full course list.</li>
                  <li>3️⃣ Begin learning, one structured lesson at a time!</li>
                </ul>
                <p className="mt-2">🚀 Start your free college education today—no tuition, no limits, just knowledge!</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
