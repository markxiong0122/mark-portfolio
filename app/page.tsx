'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { projects } from '@/content/projects';
import { tracks } from '@/content/tracks';
import { ProjectCard } from '@/components/ProjectCard';
import { TrackCard } from '@/components/TrackCard';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['100vh', '0vh']);

  return (
    <div ref={containerRef} className="portfolio-container">
      {/* Pinned Hero Section */}
      <motion.div
        className="hero-section"
        style={{
          opacity: heroOpacity,
          scale: heroScale,
        }}
      >
        <div className="hero-content">
          <img src="/images/mark-photo.jpg" alt="Mark Xiong" className="profile-photo" />
          <h1>Mark Xiong</h1>
          <p className="subtitle">Entrepreneur & Builder</p>
        </div>
      </motion.div>

      {/* Main Content - Scrolls over hero */}
      <motion.div className="content-wrapper" style={{ y: contentY }}>
        <div className="container">
          {/* About */}
          <section id="about" className="section">
            <motion.span
              className="section-label"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              about
            </motion.span>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Mark is an entrepreneur and builder who creates user-facing products that make people actually feel something—preferably laughter, or joy brought by the disappearance of tedious work. He&apos;s drawn to projects that sit at the intersection of technical challenge and emotional payoff, where clever engineering meets genuine human delight or genuine productivity gains.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Growing up in China and living across the UK, Paris, and the US shaped his approach to design: he specializes in multicultural fusion, blending Eastern and Western aesthetics in ways that feel natural rather than forced. Whether it&apos;s sampling guzheng over trap beats or building social apps, he&apos;s interested in how cultural elements can remix into something entirely new.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Mark&apos;s creative sense pulls equally from fashion runways, basketball courts, and Formula 1 circuits—he believes good design borrows shamelessly from everywhere. His work spans beat production, computer vision experiments, and mobile apps, united by a philosophy that technology should either simplify your life or make you smile. Ideally both.
            </motion.p>
          </section>

          {/* Software Projects */}
          <section id="projects" className="section">
            <motion.span
              className="section-label"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              software projects
            </motion.span>
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </section>

          {/* Music Production */}
          <section id="music" className="section">
            <motion.span
              className="section-label"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              music production
            </motion.span>
            <motion.p
              className="intro"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Beat Production: Sampling as Cultural Dialogue
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              A three-track exploration of hip-hop production techniques, investigating how sampling functions as conversation—with genre conventions, musical archives, and cross-cultural traditions.
            </motion.p>
            {tracks.map((track, index) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <TrackCard track={track} />
              </motion.div>
            ))}
          </section>

          {/* Skills */}
          <section id="skills" className="section">
            <motion.span
              className="section-label"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              skills
            </motion.span>
            <motion.div
              className="skills-list"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="skill-tag">React / React Native</span>
              <span className="skill-tag">Next.js</span>
              <span className="skill-tag">TypeScript</span>
              <span className="skill-tag">Python</span>
              <span className="skill-tag">MediaPipe</span>
              <span className="skill-tag">OpenCV</span>
              <span className="skill-tag">Computer Vision</span>
              <span className="skill-tag">Voice Recognition</span>
              <span className="skill-tag">HCI / Interaction Design</span>
              <span className="skill-tag">Audio Production</span>
              <span className="skill-tag">Sampling</span>
            </motion.div>
          </section>

          {/* Contact */}
          <section id="contact" className="section">
            <motion.span
              className="section-label"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              contact
            </motion.span>
            <motion.div
              className="contact-links"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <a href="mailto:markxiong@example.com">Email</a>
              <a href="https://github.com/markxiong0122" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href="https://linkedin.com/in/markxiong" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </motion.div>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
