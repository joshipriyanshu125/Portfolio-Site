import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  ArrowUpRight,
  Bot,
  BrainCircuit,
  Check,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Send,
  Sparkles,
} from '../components/Icons';
import Navbar from '../components/Navbar';
import Cursor from '../components/Cursor';
import CosmicBackdrop from '../components/CosmicBackdrop';
import OrbitalScene from '../three/OrbitalScene';
import {
  profile,
  projects,
  skills,
  skillCategories,
  milestones,
} from '../data/portfolio';
import '../skills.css';

const Reveal = ({ children, className = '' }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 22 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.65 }}
  >
    {children}
  </motion.div>
);

function SectionHead({ kicker, title, copy, planetTag }) {
  return (
    <Reveal className="section-head">
      {planetTag && <span className="planet-badge">{planetTag}</span>}
      <p className="eyebrow">// {kicker}</p>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </Reveal>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [sent, setSent] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <CosmicBackdrop />
      <motion.div className="progress" style={{ scaleX: progress }} />
      <Cursor />

      {!loaded && (
        <div className="loader">
          <div className="loader-core" />
          <span>INITIALIZING SOLAR SYSTEM STACK</span>
        </div>
      )}

      <Navbar />

      <main className="main-content">
        {/* SECTION 1: HOME - MERCURY */}
        <section id="home" className="hero planet-section">
          <div className="hero-copy">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: loaded ? 1 : 0, y: 0 }}
              transition={{ duration: 0.5 }}
              className="availability-pill"
            >
              <Sparkles size={14} className="sparkle-icon" />
              <span>MERCURY // 1ST PLANET • OPEN TO OPPORTUNITIES</span>
            </motion.div>

            <h1>
              Hi, I’m Priyanshu
              <br />
              <span className="hero-gradient-text">Full-Stack Developer &</span>
              <br />
              <span className="hero-white-text">AI Enthusiast</span>
            </h1>

            <p className="hero-subtitle">
              Building modern web experiences and intelligent applications.
            </p>

            <div className="actions">
              <a className="button primary-pill" href="#projects">
                View Projects
              </a>
              <a className="button outline-pill" href={profile.resume} download>
                <Download size={15} /> Download Resume
              </a>
              <a className="button outline-pill" href="#contact">
                <Mail size={15} /> Contact Me
              </a>
            </div>

            <div className="scroll-indicator">
              <span className="arrow-down">↓</span> SCROLL TO EXPLORE THE SOLAR SYSTEM
            </div>
          </div>

          <div className="scene hero-scene">
            <OrbitalScene planetKey="mercury" />
          </div>
        </section>

        {/* SECTION 2: ABOUT - VENUS */}
        <section id="about" className="about planet-section">
          <div className="section-grid">
            <div className="section-main-col">
              <SectionHead
                planetTag="VENUS // 2ND PLANET FROM THE SUN"
                kicker="Identity"
                title="More than the stack."
              />
              <Reveal className="about-body">
                <div className="identity-panel">
                  <div className="identity-top">
                    <div className="avatar">PJ</div>
                    <div>
                      <b>Priyanshu Joshi</b>
                      <small>Developer signal: active</small>
                    </div>
                    <span className="signal" />
                  </div>
                  <div className="identity-lines">
                    <p>
                      <MapPin size={15} />
                      {profile.location}
                    </p>
                    <p>
                      <Sparkles size={15} />
                      {profile.focus}
                    </p>
                  </div>
                  <div className="stat-row">
                    <b>
                      03<small>Shipped projects</small>
                    </b>
                    <b>
                      MERN<small>Core universe</small>
                    </b>
                    <b>
                      2027<small>B.Tech expected</small>
                    </b>
                  </div>
                </div>
                <p className="lead">{profile.summary}</p>
              </Reveal>
            </div>
            <div className="side-planet-col">
              <OrbitalScene planetKey="venus" />
            </div>
          </div>
        </section>

        {/* SECTION 3: SKILLS - EARTH */}
        <section id="skills" className="skills-section planet-section">
          <div className="skills-container">
            <SectionHead
              planetTag="EARTH // 3RD PLANET FROM THE SUN"
              kicker="Tech orbit"
              title="Tools in active rotation."
              copy="Hover or tap a signal to see where it fits into the build."
            />

            {/* Circular Orbit with Earth at Center */}
            <div className="skill-orbit-wrap">
              <div className="section-planet-canvas-center">
                <OrbitalScene planetKey="earth" compact />
              </div>
              <div className="skill-orbit">
                <div className="orbit-core">
                  BUILD<small>•</small>LEARN
                </div>
                {skills.map(([name, desc], i) => {
                  const total = skills.length;
                  const angleRad = (i * (360 / total)) * (Math.PI / 180);
                  const radius = 230; // Radius in px
                  const x = Math.round(radius * Math.cos(angleRad));
                  const y = Math.round(radius * Math.sin(angleRad));

                  return (
                    <motion.button
                      key={name}
                      title={desc}
                      className="skill-node"
                      style={{
                        left: `calc(50% + ${x}px - 60px)`,
                        top: `calc(50% + ${y}px - 18px)`,
                      }}
                      whileHover={{ scale: 1.15 }}
                    >
                      <span>{name}</span>
                      <i>{desc}</i>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Categorized Skills Matrix */}
            <Reveal>
              <div className="skills-matrix">
                {Object.entries(skillCategories).map(([category, items]) => (
                  <div className="skill-category-card" key={category}>
                    <h3>// {category}</h3>
                    <div className="skill-chips">
                      {items.map((item) => (
                        <span key={item} className="skill-chip">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* SECTION 4: PROJECTS - MARS */}
        <section id="projects" className="projects planet-section">
          <div className="section-grid reverse">
            <div className="side-planet-col">
              <OrbitalScene planetKey="mars" />
            </div>
            <div className="section-main-col">
              <SectionHead
                planetTag="MARS // 4TH PLANET FROM THE SUN"
                kicker="Selected transmissions"
                title="Things I’ve brought to life."
              />
              <div className="project-list">
                {projects.map((p) => (
                  <Reveal key={p.id} className={'project ' + p.accent}>
                    <div className="project-no">{p.id}</div>
                    <div className="project-main">
                      <p className="eyebrow">{p.kind}</p>
                      <h3>{p.title}</h3>
                      <p>{p.description}</p>
                      <div className="tags">
                        {p.stack.map((s) => (
                          <span key={s}>{s}</span>
                        ))}
                      </div>
                    </div>
                    <div className="project-features">
                      {p.features.map((f) => (
                        <span key={f}>
                          <Check size={14} />
                          {f}
                        </span>
                      ))}
                    </div>
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noreferrer"
                      className="round-link"
                      aria-label={'View ' + p.title + ' on GitHub'}
                    >
                      <ArrowUpRight />
                    </a>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: AI FRONTIER - JUPITER */}
        <section id="ai" className="ai-section planet-section">
          <div className="section-grid">
            <div className="section-main-col">
              <SectionHead
                planetTag="JUPITER // 5TH PLANET FROM THE SUN"
                kicker="Learning frontier"
                title="AI that earns its place."
                copy="I’m deliberately learning how to put language models to work - not just in demos, but in products people can use."
              />
              <div className="ai-pills">
                {[
                  'LLM APIs',
                  'Prompt Engineering',
                  'RAG Workflows',
                  'AI Agents',
                  'OpenAI & Gemini API',
                ].map((x) => (
                  <button key={x}>
                    <BrainCircuit size={16} />
                    {x}
                  </button>
                ))}
              </div>
              <div className="ai-notice inline-notice">
                <Bot />{' '}
                <span>
                  Current focus
                  <br />
                  <b>Context-aware AI products & RAG</b>
                </span>
              </div>
            </div>
            <div className="side-planet-col">
              <OrbitalScene planetKey="jupiter" />
            </div>
          </div>
        </section>

        {/* SECTION 6: JOURNEY - SATURN */}
        <section id="journey" className="journey planet-section">
          <div className="section-grid reverse">
            <div className="side-planet-col">
              <OrbitalScene planetKey="saturn" />
            </div>
            <div className="section-main-col">
              <SectionHead
                planetTag="SATURN // 6TH PLANET FROM THE SUN"
                kicker="Journey log"
                title="Forward, by building."
              />
              <div className="timeline">
                {milestones.map(([when, title, copy]) => (
                  <Reveal className="milestone" key={title}>
                    <span>{when}</span>
                    <i />
                    <div>
                      <h3>{title}</h3>
                      <p>{copy}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: RESUME - URANUS */}
        <section id="resume" className="resume-section planet-section">
          <div className="section-grid">
            <div className="section-main-col">
              <Reveal className="resume-card">
                <span className="planet-badge">URANUS // 7TH PLANET FROM THE SUN</span>
                <p className="eyebrow">// Curriculum vitae</p>
                <h2>
                  Want the full
                  <br />
                  signal?
                </h2>
                <p>
                  A compact record of my projects, skills, education, certifications
                  and achievements.
                </p>
                <div className="actions">
                  <a
                    className="button primary-pill"
                    href={profile.resume}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View resume <ExternalLink />
                  </a>
                  <a className="button outline-pill" href={profile.resume} download>
                    Download <Download />
                  </a>
                </div>
                <div className="resume-sheet">
                  <b>
                    PRIYANSHU
                    <br />
                    JOSHI
                  </b>
                  <span>FULL STACK / AI</span>
                </div>
              </Reveal>
            </div>
            <div className="side-planet-col">
              <OrbitalScene planetKey="uranus" />
            </div>
          </div>
        </section>

        {/* SECTION 8: CONTACT - NEPTUNE */}
        <section id="contact" className="contact planet-section">
          <div className="contact-container">
            <SectionHead
              planetTag="NEPTUNE // 8TH PLANET FROM THE SUN"
              kicker="Open channel"
              title="Let’s build something that matters."
            />
            <div className="contact-grid-3col">
              <Reveal className="contact-info-col">
                <p className="lead">
                  Have an opportunity, a project, or just want to exchange ideas? My
                  inbox is open.
                </p>
                <div className="socials">
                  <a href={'mailto:' + profile.email}>
                    <Mail /> {profile.email}
                  </a>
                  <a href={profile.github} target="_blank" rel="noreferrer">
                    <Github /> GitHub <ArrowUpRight />
                  </a>
                  <a href={profile.linkedin} target="_blank" rel="noreferrer">
                    <Linkedin /> LinkedIn <ArrowUpRight />
                  </a>
                </div>
              </Reveal>
              <Reveal className="contact-form-col">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                >
                  <label>
                    Name
                    <input required placeholder="Your name" />
                  </label>
                  <label>
                    Email
                    <input required type="email" placeholder="you@company.com" />
                  </label>
                  <label>
                    Message
                    <textarea
                      required
                      placeholder="Tell me about it..."
                      rows="3"
                    />
                  </label>
                  <button className="button primary-pill" type="submit">
                    {sent ? 'Message staged - thank you!' : 'Send transmission'}{' '}
                    <Send />
                  </button>
                </form>
              </Reveal>
              <div className="contact-planet-col">
                <OrbitalScene planetKey="neptune" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <span>© {new Date().getFullYear()} PRIYANSHU JOSHI</span>
        <span>DESIGNED FOR THE NEXT BUILD</span>
      </footer>
    </>
  );
}
