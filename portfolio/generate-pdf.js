import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';

// Standard letter/A4 with compact 24pt margins to fit 4 projects neatly onto 1 page
const doc = new PDFDocument({ margin: 24, size: 'A4', autoFirstPage: true });
const outputPath = path.resolve('public/Priyanshu_Joshi_Resume.pdf');
doc.pipe(fs.createWriteStream(outputPath));

let pageCount = 1;
doc.on('pageAdded', () => {
  pageCount++;
});

const pageWidth = doc.page.width;
const leftMargin = 24;
const rightMargin = 24;
const contentWidth = pageWidth - leftMargin - rightMargin;

// Helper for drawing clean centered text with clickable links
function drawCenteredText(parts, y) {
  let totalWidth = 0;
  for (const part of parts) {
    doc.font(part.font || 'Helvetica').fontSize(part.size || 8.0);
    totalWidth += doc.widthOfString(part.text);
  }

  let curX = (pageWidth - totalWidth) / 2;
  for (const part of parts) {
    const fontSize = part.size || 8.0;
    doc.font(part.font || 'Helvetica')
       .fontSize(fontSize)
       .fillColor(part.color || '#334155');
    
    const w = doc.widthOfString(part.text);
    const h = doc.currentLineHeight();
    
    doc.text(part.text, curX, y, { lineBreak: false });
    
    if (part.link) {
      doc.moveTo(curX, y + fontSize + 0.6)
         .lineTo(curX + w, y + fontSize + 0.6)
         .strokeColor(part.color || '#2563EB')
         .lineWidth(0.5)
         .stroke();
      doc.link(curX, y, w, h, part.link);
    }
    curX += w;
  }
}

// 1. HEADER
doc.font('Helvetica-Bold').fontSize(16).fillColor('#1E3A8A')
   .text('PRIYANSHU JOSHI', leftMargin, 20, { width: contentWidth, align: 'center' });

let headerY = doc.y + 2;

drawCenteredText([
  { text: 'Bhimtal, Uttarakhand, India', color: '#334155' },
  { text: '  |  ', color: '#64748B' },
  { text: '+91 9105131502', color: '#334155' },
  { text: '  |  ', color: '#64748B' },
  { text: 'joshipriyanshu125@gmail.com', color: '#334155', link: 'mailto:joshipriyanshu125@gmail.com' }
], headerY);

headerY += 10.5;

drawCenteredText([
  { text: 'linkedin.com/in/priyanshu-joshi0105', color: '#2563EB', link: 'https://linkedin.com/in/priyanshu-joshi0105' },
  { text: '  |  ', color: '#64748B' },
  { text: 'github.com/joshipriyanshu125', color: '#2563EB', link: 'https://github.com/joshipriyanshu125' }
], headerY);

headerY += 10.5;

drawCenteredText([
  { text: 'Portfolio: ', color: '#334155' },
  { text: 'portfolio-liart-two-pud1w3533c.vercel.app', color: '#2563EB', link: 'https://portfolio-liart-two-pud1w3533c.vercel.app' }
], headerY);

doc.y = headerY + 11;

function sectionHeader(title) {
  doc.moveDown(0.2);
  doc.font('Helvetica-Bold').fontSize(8.8).fillColor('#0F172A').text(title.toUpperCase(), leftMargin, doc.y, { width: contentWidth });
  const y = doc.y + 1;
  doc.moveTo(leftMargin, y).lineTo(pageWidth - rightMargin, y).strokeColor('#64748B').lineWidth(0.6).stroke();
  doc.y = y + 2.5;
}

// 2. SUMMARY
sectionHeader('SUMMARY');
doc.font('Helvetica').fontSize(7.8).fillColor('#334155')
   .text('MERN Stack Developer and currently a final-year Computer Science student specializing in AI-powered full-stack web applications. Developed 4 production-style projects spanning 20+ REST API endpoints, JWT-based authentication, LLM integration, and a 3D mobile virtual-lab app. Focused on Generative AI, prompt engineering, and RAG.', leftMargin, doc.y, { width: contentWidth, lineGap: 0.8 });

// 3. EDUCATION
sectionHeader('EDUCATION');
doc.font('Helvetica-Bold').fontSize(8.0).fillColor('#0F172A')
   .text('Birla Institute of Applied Sciences', leftMargin, doc.y, { continued: true })
   .font('Helvetica').fillColor('#334155').text(' — Bhimtal, India');
doc.font('Helvetica').fontSize(7.6).fillColor('#475569')
   .text('Bachelor of Technology in Computer Science and Engineering — CGPA: 7.3/10 (Expected 2027)', leftMargin, doc.y, { width: contentWidth });
doc.font('Helvetica').fontSize(7.4).fillColor('#334155')
   .text('Relevant Coursework: Data Structures & Algorithms, Database Management Systems, Operating Systems, Computer Networks, Object-Oriented Programming, Software Engineering', leftMargin, doc.y, { width: contentWidth, lineGap: 0.6 });
doc.moveDown(0.12);

doc.font('Helvetica-Bold').fontSize(8.0).fillColor('#0F172A')
   .text('St. Lawrence Sr. Sec. School', leftMargin, doc.y, { continued: true })
   .font('Helvetica').fillColor('#334155').text(' — Haldwani, Uttarakhand');
doc.font('Helvetica').fontSize(7.6).fillColor('#475569')
   .text('Senior Secondary (Class XII), CBSE — 86% — 2023', leftMargin, doc.y, { width: contentWidth });
doc.moveDown(0.12);

doc.font('Helvetica-Bold').fontSize(8.0).fillColor('#0F172A')
   .text('St. Lawrence Sr. Sec. School', leftMargin, doc.y, { continued: true })
   .font('Helvetica').fillColor('#334155').text(' — Haldwani, Uttarakhand');
doc.font('Helvetica').fontSize(7.6).fillColor('#475569')
   .text('Secondary (Class X), CBSE — 88% — 2021', leftMargin, doc.y, { width: contentWidth });

// 4. EXPERIENCE
sectionHeader('EXPERIENCE');
doc.font('Helvetica-Bold').fontSize(8.0).fillColor('#0F172A')
   .text('Independent Full-Stack Developer', leftMargin, doc.y, { continued: true })
   .font('Helvetica').fillColor('#475569').text(' — Project Experience');
doc.font('Helvetica').fontSize(7.6).fillColor('#334155');
doc.text('• Designed and developed 4 production-style full-stack and mobile applications using the MERN stack, React Native, REST APIs, JWT authentication, MongoDB, and modern React workflows.', leftMargin, doc.y, { width: contentWidth, lineGap: 0.6 });
doc.text('• Built 20+ REST API endpoints, role-based access controls, database schemas, responsive interfaces, and integrated LLM-powered features across resume and e-commerce applications.', leftMargin, doc.y, { width: contentWidth, lineGap: 0.6 });

// 5. PROJECTS
sectionHeader('PROJECTS');
// Project 1 - LabVR
doc.font('Helvetica-Bold').fontSize(8.0).fillColor('#0F172A')
   .text('LabVR — 3D Virtual Labs', leftMargin, doc.y, { continued: true })
   .font('Helvetica').fontSize(7.4).fillColor('#475569').text(' | React Native (Expo), three.js, react-three-fiber, react-native-svg, AsyncStorage');
doc.font('Helvetica').fontSize(7.5).fillColor('#334155');
doc.text('• Built a fully offline NCERT virtual-lab app (Classes 8–12) with 3D lab benches and SVG instruments (stopwatch, metre scale, balance); one complete lab: Class 11 Physics, box on an inclined plane.', leftMargin, doc.y, { width: contentWidth, lineGap: 0.6 });
doc.text('• Enforced least-count and significant-figure rules on student readings and injected seeded instrument errors (zero error, parallax, stopwatch lag) so results show realistic measurement error.', leftMargin, doc.y, { width: contentWidth, lineGap: 0.6 });
doc.text('• Implemented a real-time physics engine (fixed 1/240 s integrator, energy accounting), least-squares graphs from the student\'s own data, and a closing report that traces each fault to its effect on θ, a and μ.', leftMargin, doc.y, { width: contentWidth, lineGap: 0.6 });
doc.moveDown(0.18);

// Project 2 - Fashion E-Commerce
doc.font('Helvetica-Bold').fontSize(8.0).fillColor('#0F172A')
   .text('AI-Powered Gen-Z Fashion E-Commerce Platform', leftMargin, doc.y, { continued: true })
   .font('Helvetica').fontSize(7.4).fillColor('#475569').text(' | React.js, Node.js, Express.js, MongoDB, Redux Toolkit, Cloudinary');
doc.font('Helvetica').fontSize(7.5).fillColor('#334155');
doc.text('• Built a MERN fashion storefront covering discovery, authentication, cart, checkout, order tracking, reviews, and admin workflows.', leftMargin, doc.y, { width: contentWidth, lineGap: 0.6 });
doc.text('• Implemented Redux Toolkit state management, Cloudinary media handling, responsive React/Tailwind UI, and JWT-based authorization.', leftMargin, doc.y, { width: contentWidth, lineGap: 0.6 });
doc.text('• Added an AI shopping assistant using LLM APIs for conversational product discovery and personalized recommendations.', leftMargin, doc.y, { width: contentWidth, lineGap: 0.6 });
doc.moveDown(0.18);

// Project 3 - AI Resume Analyzer
doc.font('Helvetica-Bold').fontSize(8.0).fillColor('#0F172A')
   .text('AI Resume Analyzer & Resume Builder', leftMargin, doc.y, { continued: true })
   .font('Helvetica').fontSize(7.4).fillColor('#475569').text(' | React.js, Node.js, Express.js, MongoDB, OpenRouter, REST APIs');
doc.font('Helvetica').fontSize(7.5).fillColor('#334155');
doc.text('• Built an AI resume platform with ATS scoring, missing-skill detection, keyword optimization, job-role matching, and resume rewriting.', leftMargin, doc.y, { width: contentWidth, lineGap: 0.6 });
doc.text('• Designed 10+ secured REST APIs with JWT for resume parsing, editing, analysis, and version management; modeled 4 MongoDB collections.', leftMargin, doc.y, { width: contentWidth, lineGap: 0.6 });
doc.text('• Integrated OpenRouter LLMs to turn resume and job-description data into contextual, ATS-focused recommendations.', leftMargin, doc.y, { width: contentWidth, lineGap: 0.6 });
doc.moveDown(0.18);

// Project 4 - Council Hub
doc.font('Helvetica-Bold').fontSize(8.0).fillColor('#0F172A')
   .text('Council Hub', leftMargin, doc.y, { continued: true })
   .font('Helvetica').fontSize(7.4).fillColor('#475569').text(' | MongoDB, Express.js, React.js, Node.js, REST APIs');
doc.font('Helvetica').fontSize(7.5).fillColor('#334155');
doc.text('• Built a counselling platform connecting students and counsellors through registration, appointment booking, records, and role-based workflows.', leftMargin, doc.y, { width: contentWidth, lineGap: 0.6 });
doc.text('• Implemented role-based authorization plus real-time chat and 1:1 audio/video sessions for remote counselling.', leftMargin, doc.y, { width: contentWidth, lineGap: 0.6 });
doc.text('• Designed MongoDB schemas and REST APIs across users, appointments, sessions, records, and messages.', leftMargin, doc.y, { width: contentWidth, lineGap: 0.6 });

// 6. TECHNICAL SKILLS
sectionHeader('TECHNICAL SKILLS');
const renderSkillLine = (category, list) => {
  doc.font('Helvetica-Bold').fontSize(7.6).fillColor('#0F172A').text(category + ': ', leftMargin, doc.y, { continued: true })
     .font('Helvetica').fillColor('#334155').text(list, { width: contentWidth, lineGap: 0.6 });
};
renderSkillLine('Languages', 'JavaScript, Python, Java, SQL');
renderSkillLine('Frontend', 'React.js, React Native, HTML5, CSS3, Tailwind CSS, Redux Toolkit, React Router, Vite');
renderSkillLine('Backend', 'Node.js, Express.js, REST APIs, JWT, Authentication, Authorization');
renderSkillLine('Databases', 'MongoDB, Mongoose, MySQL');
renderSkillLine('AI / Generative AI', 'LLM APIs, Prompt Engineering, RAG, AI Agents, LLM Integration, OpenAI API, Gemini API');
renderSkillLine('Tools', 'Git, GitHub, Postman, Cloudinary, Expo, three.js, VS Code');
renderSkillLine('Core Concepts', 'Data Structures & Algorithms, OOP, DBMS, Operating Systems, Computer Networks, Software Development');

// 7. SOFT SKILLS
sectionHeader('SOFT SKILLS');
doc.font('Helvetica').fontSize(7.6).fillColor('#334155').text('Leadership, Team Collaboration, Problem Solving, Communication, Adaptability', leftMargin, doc.y, { width: contentWidth });

// 8. CERTIFICATIONS
sectionHeader('CERTIFICATIONS');
doc.font('Helvetica').fontSize(7.5).fillColor('#334155');
doc.text('• Finalist — Hack the Future 3.0 National Level Hackathon', leftMargin, doc.y, { width: contentWidth, lineGap: 0.5 });
doc.text('• Back End Development and APIs — freeCodeCamp', leftMargin, doc.y, { width: contentWidth, lineGap: 0.5 });
doc.text('• JavaScript Algorithms and Data Structures — freeCodeCamp', leftMargin, doc.y, { width: contentWidth, lineGap: 0.5 });
doc.text('• Graphethon Certificate — Graphic Era Deemed to be University, 2025', leftMargin, doc.y, { width: contentWidth, lineGap: 0.5 });

// 9. ACHIEVEMENTS
sectionHeader('ACHIEVEMENTS');
doc.font('Helvetica').fontSize(7.5).fillColor('#334155');
doc.text('• Finalist — Hack the Future 3.0 National Level Hackathon.', leftMargin, doc.y, { width: contentWidth, lineGap: 0.5 });
doc.text('• Graphethon — secured a Top 25 position among participants across India.', leftMargin, doc.y, { width: contentWidth, lineGap: 0.5 });
doc.text('• Participated in Smart India Hackathon (SIH) 2024, NASA Hackathon 2024, and other hackathons, building full-stack solutions under tight time constraints.', leftMargin, doc.y, { width: contentWidth, lineGap: 0.5 });

console.log(`Final Y position: ${doc.y} / ${doc.page.height}`);
doc.end();

setTimeout(() => {
  console.log(`Resume PDF generated successfully! Total pages: ${pageCount}`);
  if (pageCount > 1) {
    console.error(`WARNING: Resume overflowed to ${pageCount} pages!`);
  }
}, 500);
