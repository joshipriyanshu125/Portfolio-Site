
export const profile = {
  name: 'Priyanshu Joshi',
  role: 'Full-Stack Developer & AI Explorer',
  location: 'Bhimtal, Uttarakhand, India',
  phone: '+91 9105131502',
  email: 'joshipriyanshu125@gmail.com',
  github: 'https://github.com/joshipriyanshu125',
  linkedin: 'https://linkedin.com/in/priyanshu-joshi0105',
  portfolio: 'https://portfolio-site-eight-pi-33.vercel.app',
  summary: 'MERN Stack Developer and currently a final-year Computer Science student specializing in AI-powered full-stack web applications. Developed 4 production-style projects spanning 20+ REST API endpoints, JWT-based authentication, LLM integration, and a 3D mobile virtual-lab app. Focused on Generative AI, prompt engineering, and RAG.',
  intro: 'Final-year CS student specializing in AI-powered full-stack web applications & MERN development.',
  focus: 'Generative AI, Prompt Engineering, RAG & LLM Integration',
  resume: '/Priyanshu_Joshi_Resume.pdf'
};

export const education = [
  {
    institution: 'Birla Institute of Applied Sciences',
    location: 'Bhimtal, India',
    degree: 'Bachelor of Technology in Computer Science and Engineering',
    details: 'CGPA: 7.3/10 (Expected 2027)',
    coursework: 'Data Structures & Algorithms, Database Management Systems, Operating Systems, Computer Networks, Object-Oriented Programming, Software Engineering'
  },
  {
    institution: 'St. Lawrence Sr. Sec. School',
    location: 'Haldwani, Uttarakhand',
    degree: 'Senior Secondary (Class XII), CBSE',
    details: '86% — 2023'
  },
  {
    institution: 'St. Lawrence Sr. Sec. School',
    location: 'Haldwani, Uttarakhand',
    degree: 'Secondary (Class X), CBSE',
    details: '88% — 2021'
  }
];

export const experience = [
  {
    role: 'Independent Full-Stack Developer',
    subtitle: 'Project Experience',
    points: [
      'Designed and developed 4 production-style full-stack and mobile applications using the MERN stack, React Native, REST APIs, JWT authentication, MongoDB, and modern React workflows.',
      'Built 20+ REST API endpoints, role-based access controls, database schemas, responsive interfaces, and integrated LLM-powered features across resume and e-commerce applications.'
    ]
  }
];

export const skills = [
  ['React.js', 'Interfaces that feel fast and considered'],
  ['Node.js', 'Reliable server-side applications & REST APIs'],
  ['Express.js', 'Clean REST API design & JWT authorization'],
  ['MongoDB', 'Flexible, scalable data modeling & Mongoose'],
  ['Tailwind CSS', 'Purposeful visual systems & responsive UI'],
  ['Redux Toolkit', 'Predictable client-side state management'],
  ['Generative AI', 'LLM APIs, Prompt Engineering & RAG workflows'],
  ['JavaScript', 'Primary language for full-stack delivery'],
  ['React Native', '3D virtual labs & cross-platform mobile'],
  ['Three.js', 'Interactive 3D scenes & physics simulation'],
  ['Python', 'AI experimentation, scripting & automation'],
  ['Git / GitHub', 'Versioned, collaborative software delivery']
];

export const skillCategories = {
  Languages: ['JavaScript', 'Python', 'Java', 'SQL'],
  Frontend: ['React.js', 'React Native', 'HTML5', 'CSS3', 'Tailwind CSS', 'Redux Toolkit', 'React Router', 'Vite'],
  Backend: ['Node.js', 'Express.js', 'REST APIs', 'JWT', 'Authentication', 'Authorization'],
  Databases: ['MongoDB', 'Mongoose', 'MySQL'],
  'AI / Generative AI': ['LLM APIs', 'Prompt Engineering', 'RAG', 'AI Agents', 'LLM Integration', 'OpenAI API', 'Gemini API'],
  Tools: ['Git', 'GitHub', 'Postman', 'Cloudinary', 'Expo', 'three.js', 'VS Code'],
  'Core Concepts': ['Data Structures & Algorithms', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks', 'Software Development'],
  'Soft Skills': ['Leadership', 'Team Collaboration', 'Problem Solving', 'Communication', 'Adaptability']
};

export const projects = [
  {
    id: '01',
    title: 'LabVR — 3D Virtual Labs',
    kind: 'EdTech + 3D Simulation',
    stackHeader: 'React Native (Expo), three.js, react-three-fiber, react-native-svg, AsyncStorage',
    description: 'A virtual science lab platform built as a team project with one collaborator. Fully offline NCERT virtual-lab app for Classes 8–12 with 3D lab benches, SVG instruments, real-time physics engine, and a web portal where teachers unlock experiments and auto-score student submissions.',
    stack: ['React Native', 'Expo', 'Three.js', 'React Three Fiber', 'SVG', 'AsyncStorage'],
    features: [
      '3D Lab Benches & SVG Instruments (Stopwatch, Metre Scale, Balance)',
      'Least-Count & Sig-Fig Enforcement with Seeded Instrument Errors',
      'Real-Time Physics Engine (1/240s Integrator, Energy Accounting)',
      'Web Portal: Teacher Unlock, Auto-Scoring & Ranked Leaderboards'
    ],
    github: [
      { label: 'App', url: 'https://github.com/Aditya7pandey/ACEout' },
      { label: 'Web', url: 'https://github.com/joshipriyanshu125/ACEout_Web' }
    ],
    accent: 'emerald'
  },
  {
    id: '02',
    title: 'AI-Powered Gen-Z Fashion E-Commerce Platform',
    kind: 'AI-Powered Commerce',
    stackHeader: 'React.js, Node.js, Express.js, MongoDB, Redux Toolkit, Cloudinary',
    description: 'A MERN fashion storefront spanning 6 core modules with JWT auth, Cloudinary media handling, Redux Toolkit state, and a conversational AI shopping assistant.',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Redux Toolkit', 'Cloudinary'],
    features: [
      '6 Core Modules (Discovery, Auth, Cart, Checkout, Tracking, Reviews)',
      'Conversational AI Shopping Assistant via Integrated LLM APIs',
      'JWT Authentication & Role-Based Authorization across REST APIs',
      'React.js + Tailwind CSS UI with Cloudinary & Mongoose Modeling'
    ],
    accent: 'blue'
  },
  {
    id: '03',
    title: 'AI Resume Analyzer & Resume Builder',
    kind: 'AI + Full Stack',
    stackHeader: 'React.js, Node.js, Express.js, MongoDB, OpenRouter, REST APIs',
    description: 'An AI-powered resume platform featuring 5 core AI capabilities: ATS scoring, missing-skill detection, keyword optimization, job-role matching, and resume rewriting.',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'OpenRouter', 'JWT'],
    features: [
      '5 Core AI Features (ATS scoring, skill detection, keyword optimization)',
      '10+ Secured REST API Endpoints with JWT for parsing & editing',
      '4 Modeled MongoDB Collections for resumes, versions & results',
      'OpenRouter LLM Integration for contextual ATS recommendations'
    ],
    accent: 'cyan'
  },
  {
    id: '04',
    title: 'Council Hub',
    kind: 'MERN Platform',
    stackHeader: 'MongoDB, Express.js, React.js, Node.js, REST APIs',
    description: 'A full-stack counselling platform connecting students and counsellors through registration, appointment booking, record management, and remote sessions.',
    stack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'REST APIs'],
    features: [
      'Role-Based Auth & Authorization for students and counsellors',
      'Real-Time Chat & 1:1 Audio/Video Sessions for remote counselling',
      'Integrated Online Meeting & Booking Workflows',
      '5 Entity Schemas (Users, Appointments, Sessions, Records, Messages)'
    ],
    accent: 'violet'
  }
];

export const certifications = [
  { name: 'Finalist — Hack the Future 3.0 National Level Hackathon', issuer: '' },
  { name: 'Back End Development and APIs', issuer: 'freeCodeCamp' },
  { name: 'JavaScript Algorithms and Data Structures', issuer: 'freeCodeCamp' },
  { name: 'Graphethon Certificate', issuer: 'Graphic Era Deemed to be University', year: '2025' }
];

export const achievements = [
  { title: 'Finalist — Hack the Future 3.0', detail: 'National Level Hackathon finalist.' },
  { title: 'Graphethon — National Rank', detail: 'Secured a Top 25 position among participants across India.' },
  { title: 'Hackathons & Competitions', detail: 'Participated in Smart India Hackathon (SIH) 2024, NASA Hackathon 2024, and other hackathons, building full-stack solutions under tight time constraints.' }
];

export const milestones = [
  ['2027 (Expected)', 'B.Tech in Computer Science & Engineering (CGPA: 7.3/10)', 'Birla Institute of Applied Sciences, Bhimtal. Relevant Coursework: Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, OOP, Software Engineering.'],
  ['2025', 'Finalist — Hack the Future 3.0', 'National Level Hackathon finalist.'],
  ['2025', 'Top 25 — Graphethon', 'Secured a Top 25 national position among participants across India (Graphic Era Deemed to be University).'],
  ['Hackathons', 'SIH & NASA Space Apps 2024', 'Participated in Smart India Hackathon (SIH) 2024, NASA Hackathon 2024, and other hackathons, building full-stack solutions under tight time constraints.'],
  ['Certifications', 'freeCodeCamp Certified', 'Back End Development and APIs & JavaScript Algorithms and Data Structures.'],
  ['Projects', 'Full-Stack, AI & EdTech Applications', 'Designed and built 4 production-style applications with 20+ REST APIs, JWT authentication, LLM integrations, and a 3D virtual lab.'],
  ['2023', 'Senior Secondary (Class XII)', 'St. Lawrence Sr. Sec. School, Haldwani (CBSE — 86%).'],
  ['2021', 'Secondary (Class X)', 'St. Lawrence Sr. Sec. School, Haldwani (CBSE — 88%).']
];
