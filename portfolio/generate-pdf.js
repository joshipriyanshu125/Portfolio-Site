import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';

const doc = new PDFDocument({ margin: 30, size: 'LETTER' });
const outputPath = path.resolve('public/Priyanshu_Joshi_Resume.pdf');
doc.pipe(fs.createWriteStream(outputPath));

// Header
doc.font('Helvetica-Bold').fontSize(18).fillColor('#0F172A').text('PRIYANSHU JOSHI', { align: 'center' });
doc.moveDown(0.15);

doc.font('Helvetica').fontSize(8.5).fillColor('#334155')
   .text('Bhimtal, Uttarakhand, India  |  +91 9105131502  |  joshipriyanshu125@gmail.com', { align: 'center' });
doc.font('Helvetica').fontSize(8.5).fillColor('#2563EB')
   .text('linkedin.com/in/priyanshujoshi-215b85304  |  github.com/joshipriyanshu125', { align: 'center' });
doc.moveDown(0.3);

function sectionHeader(title) {
  doc.font('Helvetica-Bold').fontSize(10).fillColor('#0F172A').text(title.toUpperCase());
  const y = doc.y + 1;
  doc.moveTo(30, y).lineTo(doc.page.width - 30, y).strokeColor('#CBD5E1').lineWidth(0.8).stroke();
  doc.moveDown(0.3);
}

// SUMMARY
sectionHeader('SUMMARY');
doc.font('Helvetica').fontSize(8.5).fillColor('#334155')
   .text('MERN Stack Developer and currently a final-year Computer Science student specializing in AI-powered full-stack web applications. Developed 3 production-style projects spanning 20+ REST API endpoints, JWT-based authentication, and LLM integration. Focused on Generative AI, prompt engineering, and RAG.', { lineGap: 1.5 });
doc.moveDown(0.35);

// EDUCATION
sectionHeader('EDUCATION');
doc.font('Helvetica-Bold').fontSize(9).fillColor('#0F172A').text('Birla Institute of Applied Sciences', { continued: true })
   .font('Helvetica').text(' — Bhimtal, India');
doc.font('Helvetica-Oblique').fontSize(8.5).fillColor('#475569')
   .text('Bachelor of Technology in Computer Science and Engineering — CGPA: 7.3/10 (Expected 2027)');
doc.font('Helvetica').fontSize(8.2).fillColor('#334155')
   .text('Relevant Coursework: Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, OOP, Software Engineering');
doc.moveDown(0.2);

doc.font('Helvetica-Bold').fontSize(9).fillColor('#0F172A').text('St. Lawrence Sr. Sec. School', { continued: true })
   .font('Helvetica').text(' — Haldwani, Uttarakhand');
doc.font('Helvetica-Oblique').fontSize(8.5).fillColor('#475569')
   .text('Senior Secondary (Class XII), CBSE — 86% — 2023');
doc.moveDown(0.2);

doc.font('Helvetica-Bold').fontSize(9).fillColor('#0F172A').text('St. Lawrence Sr. Sec. School', { continued: true })
   .font('Helvetica').text(' — Haldwani, Uttarakhand');
doc.font('Helvetica-Oblique').fontSize(8.5).fillColor('#475569')
   .text('Secondary (Class X), CBSE — 88% — 2021');
doc.moveDown(0.35);

// EXPERIENCE
sectionHeader('EXPERIENCE');
doc.font('Helvetica-Bold').fontSize(9).fillColor('#0F172A').text('Independent Full-Stack Developer', { continued: true })
   .font('Helvetica-Oblique').text(' — Project Experience');
doc.font('Helvetica').fontSize(8.5).fillColor('#334155');
doc.text('• Designed and developed 3 production-style full-stack applications using the MERN stack, REST APIs, JWT authentication, MongoDB, and modern React workflows.');
doc.text('• Built 20+ REST API endpoints, role-based access controls, database schemas, responsive interfaces, and integrated LLM-powered features across resume and e-commerce applications.');
doc.moveDown(0.35);

// PROJECTS
sectionHeader('PROJECTS');
doc.font('Helvetica-Bold').fontSize(9).fillColor('#0F172A').text('AI Resume Analyzer & Resume Builder', { continued: true })
   .font('Helvetica').fontSize(8).fillColor('#475569').text('  |  React.js, Node.js, Express.js, MongoDB, OpenRouter, REST APIs');
doc.font('Helvetica').fontSize(8.5).fillColor('#334155');
doc.text('• Built an AI resume platform with ATS scoring, missing-skill detection, keyword optimization, job-role matching, and resume rewriting.');
doc.text('• Designed 10+ secured REST APIs with JWT for resume parsing, editing, analysis, and version management; modeled 4 MongoDB collections.');
doc.text('• Integrated OpenRouter LLMs to turn resume and job-description data into contextual, ATS-focused recommendations.');
doc.moveDown(0.3);

doc.font('Helvetica-Bold').fontSize(9).fillColor('#0F172A').text('Council Hub', { continued: true })
   .font('Helvetica').fontSize(8).fillColor('#475569').text('  |  MongoDB, Express.js, React.js, Node.js, REST APIs');
doc.font('Helvetica').fontSize(8.5).fillColor('#334155');
doc.text('• Built a counselling platform connecting students and counsellors through registration, appointment booking, records, and role-based workflows.');
doc.text('• Implemented role-based authorization plus real-time chat and 1:1 audio/video sessions for remote counselling.');
doc.text('• Designed MongoDB schemas and REST APIs across users, appointments, sessions, records, and messages.');
doc.moveDown(0.3);

doc.font('Helvetica-Bold').fontSize(9).fillColor('#0F172A').text('AI-Powered Gen-Z Fashion E-Commerce Platform', { continued: true })
   .font('Helvetica').fontSize(8).fillColor('#475569').text('  |  React.js, Node.js, Express.js, MongoDB, Redux Toolkit, Cloudinary');
doc.font('Helvetica').fontSize(8.5).fillColor('#334155');
doc.text('• Built a MERN fashion storefront covering discovery, authentication, cart, checkout, order tracking, reviews, and admin workflows.');
doc.text('• Implemented Redux Toolkit state management, Cloudinary media handling, responsive React/Tailwind UI, and JWT-based authorization.');
doc.text('• Added an AI shopping assistant using LLM APIs for conversational product discovery and personalized recommendations.');
doc.moveDown(0.35);

// TECHNICAL SKILLS
sectionHeader('TECHNICAL SKILLS');
doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#0F172A').text('Languages: ', { continued: true }).font('Helvetica').fillColor('#334155').text('JavaScript, Python, Java, SQL');
doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#0F172A').text('Frontend: ', { continued: true }).font('Helvetica').fillColor('#334155').text('React.js, HTML5, CSS3, Tailwind CSS, Redux Toolkit, React Router, Vite');
doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#0F172A').text('Backend: ', { continued: true }).font('Helvetica').fillColor('#334155').text('Node.js, Express.js, REST APIs, JWT, Authentication, Authorization');
doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#0F172A').text('Databases: ', { continued: true }).font('Helvetica').fillColor('#334155').text('MongoDB, Mongoose, MySQL');
doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#0F172A').text('AI / Generative AI: ', { continued: true }).font('Helvetica').fillColor('#334155').text('LLM APIs, Prompt Engineering, RAG, AI Agents, LLM Integration, OpenAI API, Gemini API');
doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#0F172A').text('Tools: ', { continued: true }).font('Helvetica').fillColor('#334155').text('Git, GitHub, Postman, Cloudinary, VS Code');
doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#0F172A').text('Core Concepts: ', { continued: true }).font('Helvetica').fillColor('#334155').text('Data Structures & Algorithms, OOP, DBMS, Operating Systems, Computer Networks, Software Development');
doc.moveDown(0.3);

// SOFT SKILLS
sectionHeader('SOFT SKILLS');
doc.font('Helvetica').fontSize(8.5).fillColor('#334155').text('Leadership, Team Collaboration, Problem Solving, Communication, Adaptability');
doc.moveDown(0.3);

// CERTIFICATIONS
sectionHeader('CERTIFICATIONS');
doc.font('Helvetica').fontSize(8.5).fillColor('#334155');
doc.text('• Back End Development and APIs — freeCodeCamp');
doc.text('• JavaScript Algorithms and Data Structures — freeCodeCamp');
doc.text('• Graphethon Certificate — Graphic Era Deemed to be University, 2025');
doc.moveDown(0.3);

// ACHIEVEMENTS
sectionHeader('ACHIEVEMENTS');
doc.font('Helvetica').fontSize(8.5).fillColor('#334155');
doc.text('• Graphethon — secured a Top 25 position among participants across India.');
doc.text('• Participated in multiple hackathons and technical competitions, building full-stack solutions under tight time constraints.');

doc.end();
console.log('Resume PDF generated successfully.');
