import React, { useEffect, useMemo, useState } from 'react';
import {
  FiArrowDown, FiArrowUpRight, FiGithub, FiLinkedin, FiMail, FiPhone, FiMapPin,
  FiCode, FiDatabase, FiCpu, FiAward, FiExternalLink, FiSend, FiMenu, FiX,
  FiBriefcase, FiBookOpen, FiUsers, FiBarChart2, FiServer, FiLayout,
  FiCheckCircle, FiStar, FiGlobe, FiChevronDown
} from 'react-icons/fi';
import { profile, stats, skills, experiences, projects, achievements, certifications, publications, education, leadership, interests } from './data';

const iconMap = { code: FiCode, layout: FiLayout, server: FiServer, database: FiDatabase, chart: FiBarChart2, cpu: FiCpu };
const achievementIcons = { trophy: FiAward, rocket: FiArrowUpRight, award: FiAward, users: FiUsers };

function Reveal({ children, className = '', ...props }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    node.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return <div data-reveal className={`reveal ${className}`} {...props}>{children}</div>;
}

function Section({ id, number, eyebrow, title, children }) {
  return <section id={id} className="section container"><Reveal><div className="section-heading"><span className="section-number">{number}</span><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div></div>{children}</Reveal></section>;
}

function App() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [status, setStatus] = useState('');
  const [modal, setModal] = useState(null);
  const [typed, setTyped] = useState('');
  const [activeProject, setActiveProject] = useState('');

  const roles = useMemo(() => ['Data Analyst', 'AI Researcher', 'Full-Stack Developer'], []);
  useEffect(() => {
    let roleIndex = 0;
    let characterIndex = 0;
    let deleting = false;
    let timer;
    const tick = () => {
      const role = roles[roleIndex];
      characterIndex += deleting ? -1 : 1;
      setTyped(role.slice(0, characterIndex));
      if (!deleting && characterIndex === role.length) {
        deleting = true;
        timer = setTimeout(tick, 1500);
        return;
      }
      if (deleting && characterIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
      timer = setTimeout(tick, deleting ? 45 : 75);
    };
    timer = setTimeout(tick, 250);
    return () => clearTimeout(timer);
  }, [roles]);

  useEffect(() => {
    const ids = ['home', 'about', 'experience', 'projects', 'skills', 'achievements', 'certifications', 'education', 'leadership', 'contact'];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((x) => x.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: '-35% 0px -55% 0px', threshold: [0, .2, .5] });
    ids.map(id => document.getElementById(id)).filter(Boolean).forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

 const submitContact = async (e) => {
  e.preventDefault();

  const payload = Object.fromEntries(
    new FormData(e.currentTarget).entries()
  );

const API_URL =
  import.meta.env.VITE_API_URL ||
  'https://prajakts-portfolio.onrender.com/api';

  try {
    const res = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    setStatus(data.message || 'Thanks! Your message has been sent.');
    e.currentTarget.reset();

  } catch {
    setStatus(`Backend is not connected yet. Please email ${profile.email}.`);
  }
};

  const nav = ['about','experience','projects','skills','achievements','certifications','education','contact'];

  return <div className="app">
    <div className="noise" />

    <header className="nav-wrap">
      <nav className="nav container">
        <a href="#home" className="brand" onClick={() => setOpen(false)}><span className="brand-mark">PK</span><span>Prajakta<span className="brand-dot">.</span></span></a>
        <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <FiX /> : <FiMenu />}</button>
        <div className={`nav-links ${open ? 'open' : ''}`}>
          {nav.map(item => <a className={active === item ? 'active' : ''} key={item} href={`#${item}`} onClick={() => setOpen(false)}>{item}</a>)}
          <a className="nav-resume" href="#contact" onClick={() => setOpen(false)}>Let's talk <FiArrowUpRight /></a>
        </div>
      </nav>
    </header>

    <main>
      <section id="home" className="hero container">
        <div className="hero-copy">
          <div className="availability"><span className="availability-dot" /> {profile.availability}</div>
          <h1>Prajakta <span>Khochage</span></h1>
          <div className="type-line"><span>I'm a </span><strong>{typed}<i>|</i></strong></div>
          <p className="hero-text">{profile.intro}</p>
          <div className="hero-actions">
            <a className="btn primary" href="#projects">View my work <FiArrowUpRight /></a>
            <a className="btn ghost" href={`mailto:${profile.email}`}>Get in touch <FiMail /></a>
          </div>
          <div className="social-row">
            <a href={profile.github} target="_blank" rel="noreferrer"><FiGithub /> GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer"><FiLinkedin /> LinkedIn</a>
            <span><FiMapPin /> {profile.location}</span>
          </div>
        </div>
        <a className="scroll-cue" href="#about"><span>Scroll to explore</span><FiArrowDown /></a>
      </section>

      <section className="stats-strip"><div className="container stats-grid">{stats.map((s,i) => <Reveal key={s.label} className="stat"><strong>{s.value}</strong><span>{s.label}</span></Reveal>)}</div></section>

      <Section id="about" number="01" eyebrow="Introduction" title="A curious builder with a practical mindset.">
        <div className="about-grid">
          <div className="about-main glass-card"><div className="mini-label"><FiStar /> About me</div><p className="about-lead">I'm a Computer Science & Engineering student who enjoys turning ideas into <span>useful, polished software.</span></p><p>My interests span full-stack web development, artificial intelligence, data visualization and problem solving. I like understanding the complete journey — from a user's need and interface design to APIs, databases and deployment.</p><p>Alongside building projects, I enjoy mentoring peers, presenting technical work and contributing to student-led initiatives. My goal is to keep learning while creating technology that is clear, practical and meaningful.</p><div className="interest-list">{interests.map(x => <span key={x}>{x}</span>)}</div></div>
          <div className="about-side"><div className="fact-card glass-card"><span className="fact-icon"><FiMapPin /></span><small>Location</small><b>Located in Kolhapur</b></div><div className="fact-card glass-card"><span className="fact-icon"><FiBookOpen /></span><small>Currently pursuing</small><b>B.Tech CSE · 2024–2027</b></div><div className="fact-card glass-card"><span className="fact-icon"><FiGlobe /></span><small>Languages</small><b>English · Hindi · Marathi · Japanese</b></div></div>
        </div>
      </Section>

      <Section id="experience" number="02" eyebrow="Career journey" title="Experience that shaped how I work.">
        <div className="experience-grid">{experiences.map((x,i) => <Reveal className={`experience-card experience-card-${i + 1} glass-card`} key={x.title}><div className="experience-card-top"><span>0{i + 1}</span><em>{x.tag}</em></div><span className="experience-period">{x.period}</span><h3>{x.title}</h3><h4>{x.org}</h4><p>{x.text}</p></Reveal>)}</div>
      </Section>

      <Section id="projects" number="03" eyebrow="Featured work" title="Things I've built, explored and shipped.">
        <div className="project-grid">{projects.map((p,i) => <Reveal className={`project-card glass-card ${activeProject === p.title ? 'is-clicked' : ''}`} key={p.title} onClick={() => { setActiveProject(p.title); setTimeout(() => setActiveProject(''), 420); }}><div className="project-glow" /><div className="project-top"><span>0{i+1}</span><small>{p.category}</small></div><div className="project-icon">{i===0?<FiBriefcase/>:i===1?<FiCpu/>:i===2?<FiBarChart2/>:<FiBookOpen/>}</div><h3>{p.title}</h3><p>{p.description}</p><div className="project-highlight"><FiCheckCircle /> {p.highlight}</div><div className="chips">{p.tech.map(t => <span key={t}>{t}</span>)}</div>{p.demo !== '#' && <div className="project-links"><a href={p.demo} target="_blank" rel="noreferrer">Live demo <FiExternalLink /></a></div>}</Reveal>)}</div>
      </Section>

      <Section id="skills" number="04" eyebrow="Tech arsenal" title="Tools I use to turn ideas into products.">
        <div className="skill-grid">{skills.map((s) => { const Icon = iconMap[s.icon]; return <Reveal className={`skill-card glass-card ${s.group === 'Tools' ? 'tools-card' : ''}`} key={s.group}><div className="skill-head"><span className="skill-icon"><Icon /></span><h3>{s.group}</h3></div>{s.group === 'Tools' ? <ul className="tools-list">{s.items.map(x => <li key={x}>{x}</li>)}</ul> : <div className="chips">{s.items.map(x => <span key={x}>{x}</span>)}</div>}</Reveal> })}</div>
      </Section>

      <Section id="achievements" number="05" eyebrow="Recognition" title="Milestones beyond the code.">
        <div className="achievement-grid">{achievements.map((a,i) => { const Icon = achievementIcons[a.icon]; return <Reveal className="achievement-card glass-card" key={a.title}><div className="achievement-head"><span className="achievement-icon"><Icon /></span><span>0{i+1}</span></div><h3>{a.title}</h3><p>{a.text}</p></Reveal> })}</div>
      </Section>

      <Section id="certifications" number="06" eyebrow="Credentials" title="Certificates, workshops & continuous learning.">
        <div className="credential-grid"><div className="credential-intro glass-card"><span className="big-icon"><FiAward /></span><h3>Keep learning. Keep building.</h3><p>This section is structured as an expandable certificate gallery. Add your verified certificate images and links inside <code>data.js</code> as you collect them.</p><div className="credential-list">{certifications.map((c,i)=><button key={c.title} className="credential-row" onClick={() => setModal({type:'certificate', ...c})}><span>0{i+1}</span><div><b>{c.title}</b><small>{c.provider} · {c.year}</small></div><FiArrowUpRight /></button>)}</div></div><div className="publication-panel glass-card"><div className="mini-label"><FiBookOpen /> Research & publications</div>{publications.map((p,i)=><button key={p.title} className="publication-row" onClick={() => setModal({type:'publication', ...p})}><span className="pub-year">{p.year}</span><div><b>{p.title}</b><small>{p.venue}</small></div><FiChevronDown /></button>)}</div></div>
      </Section>

      <Section id="education" number="07" eyebrow="Academic background" title="The Foundation Behind the Work">
        <div className="foundation-grid"><div><FiCode /><b>Build with purpose</b><span>Clear interfaces and useful experiences.</span></div><div><FiServer /><b>Think full-stack</b><span>From frontend flow to reliable APIs.</span></div><div><FiBarChart2 /><b>Use data wisely</b><span>Analytics that support better decisions.</span></div></div><div className="education-grid">{education.map((e,i)=><Reveal className="education-card glass-card" key={e.degree}><div className="edu-number">0{i+1}</div><span>{e.period}</span><h3>{e.degree}</h3><h4>{e.org}</h4><p>{e.detail}</p></Reveal>)}</div>
      </Section>

      <Section id="leadership" number="08" eyebrow="Leadership & mentoring" title="Learning is better when it is shared.">
        <div className="leadership-grid">{leadership.map((l,i)=><Reveal className="leadership-card glass-card" key={l.title}><span className="lead-number">0{i+1}</span><div><small>{l.org}</small><h3>{l.title}</h3><p>{l.detail}</p></div></Reveal>)}</div>
      </Section>

      <Section id="contact" number="09" eyebrow="Get in touch" title="Let's create something meaningful.">
        <div className="contact-grid"><div className="contact-copy"><span className="contact-kicker">Have an idea?</span><h3>Let's turn it into something real.</h3><p>Whether it's an internship opportunity, a project collaboration, a research discussion or simply a conversation about technology — I'd love to hear from you.</p><div className="contact-list"><a href={`mailto:${profile.email}`}><FiMail /><span><small>Email</small>{profile.email}</span></a><a href={`tel:${profile.phone}`}><FiPhone /><span><small>Phone</small>{profile.phone}</span></a><a href={profile.linkedin} target="_blank" rel="noreferrer"><FiLinkedin /><span><small>LinkedIn</small>Prajakta Khochage</span></a><a href={profile.github} target="_blank" rel="noreferrer"><FiGithub /><span><small>GitHub</small>prajaktakhochage66</span></a></div></div><form className="contact-form glass-card" onSubmit={submitContact}><div className="form-title"><span>Start a conversation</span><small>I'll get back to you soon.</small></div><input name="name" placeholder="Your name" required /><input name="email" type="email" placeholder="Email address" required /><input name="subject" placeholder="Subject" required /><textarea name="message" placeholder="Tell me a little about your idea..." rows="6" required /><button className="btn primary" type="submit"><FiSend /> Send message</button>{status && <small className="form-status">{status}</small>}</form></div>
      </Section>
    </main>

    <footer><div className="container footer-inner"><a href="#home" className="brand"><span className="brand-mark small">PK</span><span>Prajakta<span className="brand-dot">.</span></span></a><div className="footer-nav">{nav.map(item => <a key={item} href={`#${item}`}>{item}</a>)}</div><div className="footer-links"><a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FiLinkedin /></a><a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FiGithub /></a><a href={`mailto:${profile.email}`} aria-label="Email"><FiMail /></a></div><small className="footer-copy">© {new Date().getFullYear()} Prajakta Khochage</small></div></footer>

    {modal && <div className="modal-backdrop" onClick={() => setModal(null)}><div className="modal glass-card" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setModal(null)}><FiX /></button><span className="modal-kicker">{modal.type === 'certificate' ? 'Credential' : 'Publication'}</span><h3>{modal.title}</h3><p className="modal-provider">{modal.provider || modal.venue} · {modal.year}</p>{modal.image && <img className="certificate-preview" src={modal.image} alt={`${modal.title} certificate`} />}{modal.file && <a className="certificate-file" href={modal.file} target="_blank" rel="noreferrer"><FiExternalLink /> Open certificate PDF</a>}<p>{modal.detail}</p><button className="btn primary" onClick={() => setModal(null)}>Close</button></div></div>}

    <a href="#home" className="back-top" aria-label="Back to top"><FiArrowUpRight /></a>
  </div>;
}

export default App;
