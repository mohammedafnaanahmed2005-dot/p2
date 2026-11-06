import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  GraduationCap,
  Github,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Play,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import {
  additionalProjects,
  demonstrations,
  education,
  experience,
  featuredProjects,
  focusAreas,
  profile,
  skillGroups,
} from "./data.js";

const navigation = [
  ["About", "#about"],
  ["Work", "#work"],
  ["Experience", "#experience"],
  ["Education", "#education"],
  ["Skills", "#skills"],
  ["Contact", "#contact"],
];

function SectionHeading({ eyebrow, title, children }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      className="project-card"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      <div className={`project-art project-art-${index + 1}`} aria-hidden="true">
        {project.videoId && (
          <img
            className="project-art-image"
            src={
              project.image ??
              `https://img.youtube.com/vi/${project.videoId}/hqdefault.jpg`
            }
            alt=""
            loading="lazy"
            decoding="async"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        )}
        <div className="art-orbit orbit-one" />
        <div className="art-orbit orbit-two" />
        <span className="art-mark">{String(index + 1).padStart(2, "0")}</span>
        <span className="art-label">{project.platform}</span>
        <Sparkles size={18} className="art-sparkle" />
      </div>
      <div className="project-content">
        <div className="project-title-line">
          <div>
            <p className="project-subtitle">{project.subtitle}</p>
            <h3>{project.name}</h3>
          </div>
          <button
            type="button"
            className="icon-button project-expand"
            aria-label={`${expanded ? "Collapse" : "Expand"} details for ${project.name}`}
            aria-expanded={expanded}
            onClick={() => setExpanded(!expanded)}
          >
            <ArrowDownRight size={19} />
          </button>
        </div>
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              className="project-details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.24 }}
            >
              <p>{project.description}</p>
              <div className="tag-list">
                {project.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="project-footer">
          <span>{project.platform}</span>
          <div className="project-links">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.name} source code`}>
                <Github size={17} />
              </a>
            )}
            {project.videoId ? (
              <a href={`https://www.youtube.com/watch?v=${project.videoId}`} target="_blank" rel="noreferrer">
                Demo <ArrowUpRight size={15} />
              </a>
            ) : project.watchUrl ? (
              <a href={project.watchUrl} target="_blank" rel="noreferrer">
                Watch <ArrowUpRight size={15} />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function DemoCard({ item }) {
  const [playing, setPlaying] = useState(false);
  return (
    <article className="demo-card">
      <div className="video-frame">
        {item.videoId && playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${item.videoId}?autoplay=1`}
            title={`${item.name} project demonstration`}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <div className="video-cover">
            {(item.thumbnail || item.videoId) && (
              <img
                className="video-thumbnail"
                src={
                  item.thumbnail ??
                  `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`
                }
                alt=""
                loading="lazy"
                decoding="async"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            )}
            <div className="video-cover-grid" />
            <span className="video-cover-name">{item.name}</span>
            {item.videoId ? (
              <button
                type="button"
                className="play-button"
                onClick={() => setPlaying(true)}
                aria-label={`Play ${item.name} demonstration`}
              >
                <Play size={19} fill="currentColor" />
              </button>
            ) : (
              <span className="external-demo">External demo link</span>
            )}
          </div>
        )}
      </div>
      <div className="demo-info">
        <div>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
        </div>
        <a
          href={
            item.videoId
              ? `https://www.youtube.com/watch?v=${item.videoId}`
              : item.watchUrl
          }
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${item.name} demonstration`}
        >
          <ArrowUpRight size={17} />
        </a>
      </div>
    </article>
  );
}

function App() {
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={`site-shell theme-${theme}`}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Mohammed Afnaan Ahmed home">
          <span className="wordmark-icon">M<span>.</span></span>
          <span className="wordmark-name">Mohammed Afnaan</span>
        </a>
        <nav className={`main-nav ${menuOpen ? "nav-open" : ""}`} aria-label="Main navigation">
          {navigation.map(([label, target]) => (
            <a key={target} href={target} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>
            Let&apos;s talk <ArrowUpRight size={15} />
          </a>
        </nav>
        <div className="header-actions">
          <button
            className="icon-button theme-toggle"
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="icon-button menu-toggle"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <main id="main">
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <motion.div
              className="availability"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="availability-dot" />
              Exploring ideas at the intersection of AI & engineering
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
            >
              Hi, I&apos;m <span>Mohammed</span>
              <br />
              Afnaan Ahmed<span className="accent-dot">.</span>
            </motion.h1>
            <p className="hero-title">{profile.title}</p>
            <motion.p
              className="hero-lede"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16 }}
            >
              I&apos;m an IT Engineering student passionate about building
              intelligent applications using Artificial Intelligence, Machine
              Learning, Cloud Computing, Data Engineering and Cybersecurity.
            </motion.p>
            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
            >
              <a className="button button-primary" href="#work">
                Explore my projects <ArrowRight size={17} />
              </a>
              <a className="button button-quiet" href="#contact">
                Contact me <ArrowUpRight size={16} />
              </a>
            </motion.div>
            <div className="hero-bottom">
              <span>IT ENGINEERING · AI · CLOUD · SECURITY</span>
              <a href="#about" aria-label="Scroll to about section">
                <ArrowDown size={16} /> Scroll to explore
              </a>
            </div>
          </div>
          <motion.div
            className="hero-portrait-wrap"
            initial={{ opacity: 0, scale: 0.96, x: 14 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.12 }}
          >
            <div className="portrait-backdrop" />
            <div className="portrait-frame">
              <img
                src="/images/profile.png"
                alt="Portrait of Mohammed Afnaan Ahmed"
                fetchPriority="high"
                decoding="async"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
              <div className="portrait-fallback" aria-hidden="true">
                <span>MA</span>
              </div>
            </div>
            <div className="portrait-caption">
              <span className="caption-line" />
              <span>Curious by nature. Builder by choice.</span>
            </div>
            <div className="portrait-index">01 — PROFILE</div>
          </motion.div>
          <div className="hero-ambient ambient-one" aria-hidden="true" />
          <div className="hero-ambient ambient-two" aria-hidden="true" />
        </section>

        <section className="intro-strip" aria-label="Areas of interest">
          <div className="intro-strip-inner">
            <span>FOCUSING ON</span>
            <div className="ticker" aria-label={focusAreas.join(", ")}>
              {focusAreas.slice(0, 5).map((item) => (
                <span key={item}>{item}<i>✳</i></span>
              ))}
            </div>
          </div>
        </section>

        <section className="section-wrap about-section" id="about">
          <SectionHeading eyebrow="01 / A little about me" title="Curiosity, meet code.">
            An aspiring technology professional interested in solving real-world
            problems through thoughtful, innovative technology.
          </SectionHeading>
          <div className="about-grid">
            <p className="about-statement">
              I enjoy bringing ideas to life—whether that means exploring
              intelligent systems, connecting data, or building useful
              applications from the ground up.
            </p>
            <div className="focus-panel">
              <span className="panel-label">AREAS I&apos;M EXPLORING</span>
              <div className="focus-list">
                {focusAreas.map((area, index) => (
                  <span key={area}>
                    <i>{String(index + 1).padStart(2, "0")}</i>{area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-wrap work-section" id="work">
          <SectionHeading eyebrow="02 / Selected work" title="Ideas made tangible.">
            A selection of projects across AI, digital twins, healthcare, data,
            and security.
          </SectionHeading>
          <div className="project-grid">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.name} project={project} index={index} />
            ))}
          </div>
          <div className="additional-work">
            <div className="additional-heading">
              <span className="eyebrow">MORE EXPLORATIONS</span>
              <p>Early ideas and focused experiments, gathered in one place.</p>
            </div>
            <div className="additional-grid">
              {additionalProjects.map((project, index) => (
                <article className="additional-card" key={project.name}>
                  <span className="additional-number">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <span className="additional-platform">{project.platform}</span>
                  </div>
                  <ArrowUpRight size={16} className="additional-arrow" aria-hidden="true" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-wrap demos-section" id="demos">
          <SectionHeading eyebrow="03 / Project demonstrations" title="See the work in motion.">
            Project walkthroughs and demos. Select play to load a video, or open
            its watch page directly.
          </SectionHeading>
          <div className="demo-grid">
            {demonstrations.map((item) => (
              <DemoCard item={item} key={item.name} />
            ))}
          </div>
        </section>

        <section className="section-wrap experience-section" id="experience">
          <SectionHeading eyebrow="04 / Experience & community" title="Learning by doing.">
            Internship experience and participation across technology events
            and learning communities.
          </SectionHeading>
          <div className="timeline">
            {experience.map((item, index) => (
              <motion.article
                className="timeline-item"
                key={item.role}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.42, delay: index * 0.06 }}
              >
                <span className="timeline-marker" aria-hidden="true" />
                <span className="timeline-kind">{item.kind}</span>
                <div>
                  <h3>{item.role}</h3>
                  <p>{item.organization}</p>
                </div>
                <span className="timeline-index">{String(index + 1).padStart(2, "0")}</span>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section-wrap education-section" id="education">
          <SectionHeading eyebrow="05 / Education" title="Building a strong foundation.">
            Currently completing the final year of IT Engineering.
          </SectionHeading>
          <div className="education-list">
            {education.map((item) => (
              <article className="education-card" key={item.institution}>
                <span className="education-icon" aria-hidden="true">
                  <GraduationCap size={22} />
                </span>
                <div>
                  <span className="education-status">FINAL YEAR</span>
                  <h3>{item.program}</h3>
                  <p>{item.institution}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-wrap skills-section" id="skills">
          <SectionHeading eyebrow="06 / My toolkit" title="Tools for the curious.">
            Technologies I&apos;m learning, using, and exploring to turn ideas
            into working projects.
          </SectionHeading>
          <div className="skills-grid">
            {skillGroups.map((group, index) => (
              <article className="skill-card" key={group.title}>
                <span className="skill-index">0{index + 1}</span>
                <h3>{group.title}</h3>
                <div className="tag-list">
                  {group.skills.map((skill) => (
                    <span className="tag" key={skill}>{skill}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="section-wrap contact-inner">
            <div>
              <span className="eyebrow">07 / Get in touch</span>
              <h2>Have an idea?<br /><span>Let&apos;s make it real.</span></h2>
              <p>
                I&apos;m always glad to connect with people building thoughtful
                things with technology. Reach out to explore a project or
                collaboration.
              </p>
              <div className="contact-actions">
                <a className="button button-primary" href={profile.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin size={17} /> Connect on LinkedIn <ArrowUpRight size={15} />
                </a>
                <a className="button button-outline" href={profile.github} target="_blank" rel="noreferrer">
                  <Github size={17} /> Explore GitHub <ArrowUpRight size={15} />
                </a>
                <a className="button button-outline" href={`mailto:${profile.email}`}>
                  <Mail size={17} /> Email me <ArrowUpRight size={15} />
                </a>
              </div>
              <a className="email-note" href={`mailto:${profile.email}`}>{profile.email}</a>
            </div>
            <div className="contact-monogram" aria-hidden="true">
              <div className="monogram-ring" />
              <span>MA<span>.</span></span>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="wordmark footer-wordmark" href="#home">
          <span className="wordmark-icon">M<span>.</span></span>
          <span className="wordmark-name">Mohammed Afnaan Ahmed</span>
        </a>
        <span>Designed with curiosity, built with care.</span>
        <a href="#home">Back to top ↑</a>
      </footer>
    </div>
  );
}

export default App;
