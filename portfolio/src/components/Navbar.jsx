import { useState, useEffect } from 'react';
import { Menu, X } from './Icons';

const links = ['Home', 'About', 'Skills', 'Projects', 'AI', 'Journey', 'Resume', 'Contact'];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = links.map((l) => document.getElementById(l.toLowerCase()));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(links[i].toLowerCase());
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="nav-wrap">
      {/* Brand Pill */}
      <a className="brand" href="#home">
        <span className="brand-dot" />
        <span className="brand-text">Priyanshu <span className="brand-sub">/ DEV</span></span>
      </a>

      {/* Center Nav Capsule */}
      <nav className={`nav-capsule ${open ? 'open' : ''}`}>
        {links.map((x) => {
          const id = x.toLowerCase();
          const isActive = activeSection === id;
          return (
            <a
              key={x}
              href={`#${id}`}
              onClick={() => setOpen(false)}
              className={`nav-link ${isActive ? 'active' : ''}`}
            >
              {x}
            </a>
          );
        })}
      </nav>

      {/* Right CTA Button Pill */}
      <div className="nav-right">
        <a href="#contact" className="let-talk-btn">
          Let's talk
        </a>
        <button
          className="menu"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}
