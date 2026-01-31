"use client";

import { ProjectCard } from "@/components/ProjectCard";
import { TrackCard } from "@/components/TrackCard";
import { projects } from "@/content/projects";
import { tracks } from "@/content/tracks";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["100vh", "0vh"]);

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
        <motion.div className="hero-content">
          <motion.img
            src="/images/mark-photo.jpg"
            alt="Mark Xiong"
            className="profile-photo"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          >
            Mark Xiong
          </motion.h1>
          <motion.p
            className="subtitle"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          >
            Entrepreneur & Builder
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Main Content - Scrolls over hero */}
      <motion.div className="content-wrapper" style={{ y: contentY }}>
        <div className="container">
          {/* About */}
          <section id="about" className="section">
            <motion.div
              className="section-label-wrapper"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-label">01 / profile</span>
              <motion.div
                className="section-line"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
            </motion.div>
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              The Art of Intentional Building
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Mark is an entrepreneur and builder who creates user-facing
              products that make people actually feel something—preferably
              laughter, or joy brought by the disappearance of tedious work.
              He&apos;s drawn to projects that sit at the intersection of
              technical challenge and emotional payoff, where clever engineering
              meets genuine human delight or genuine productivity gains.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Growing up in China and living across the UK, Paris, and the US
              shaped his approach to design: he specializes in multicultural
              fusion, blending Eastern and Western aesthetics in ways that feel
              natural rather than forced. Whether it&apos;s sampling guzheng
              over trap beats or building social apps, he&apos;s interested in
              how cultural elements can remix into something entirely new.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Mark&apos;s creative sense pulls equally from fashion runways,
              basketball courts, and Formula 1 circuits—he believes good design
              borrows shamelessly from everywhere. His work spans beat
              production, computer vision experiments, and mobile apps, united
              by a philosophy that technology should either simplify your life
              or make you smile. Ideally both.
            </motion.p>
          </section>

          {/* Software Projects */}
          <section id="projects" className="section">
            <motion.div
              className="section-label-wrapper"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-label">02 / works</span>
              <motion.div
                className="section-line"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
            </motion.div>
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Selected Software Projects
            </motion.h2>
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
            <motion.div
              className="section-label-wrapper"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-label">03 / sound</span>
              <motion.div
                className="section-line"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
            </motion.div>
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Sampling as Cultural Dialogue
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              A three-track exploration of hip-hop production techniques,
              investigating how sampling functions as conversation—with genre
              conventions, musical archives, and cross-cultural traditions.
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

          {/* Contact */}
        </div>
      </motion.div>
      <footer className="footer">
        <motion.div
          className="footer-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="footer-links">
            <a href="mailto:haoxiang@uchicago.edu" aria-label="Email">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 8L12 15L21 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="2"
                  y="4"
                  width="20"
                  height="16"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/mark-xiong-356aa3210/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 8C16 8 17.5 8 19 9.5C20.5 11 20.5 12.5 20.5 12.5V20H17V12.5C17 12.5 17 11.5 16.5 11C16 10.5 15.5 10.5 15.5 10.5H14V20H10.5V8H14V9.5C14 9.5 14.5 8 16 8Z"
                  fill="currentColor"
                />
                <rect
                  x="2"
                  y="2"
                  width="8"
                  height="8"
                  rx="1"
                  fill="currentColor"
                />
                <path d="M2 12H8V20H2V12Z" fill="currentColor" />
              </svg>
            </a>
            <a
              href="https://github.com/markxiong0122"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12C2 16.42 4.872 20.169 8.838 21.389C9.339 21.476 9.518 21.17 9.518 20.907C9.518 20.669 9.509 20.029 9.505 19.218C6.726 19.803 6.139 17.884 6.139 17.884C5.685 16.746 5.029 16.438 5.029 16.438C4.121 15.837 5.098 15.849 5.098 15.849C6.103 15.921 6.63 16.88 6.63 16.88C7.514 18.372 8.929 17.926 9.532 17.671C9.621 17.049 9.878 16.604 10.161 16.357C7.665 16.108 5.047 15.114 5.047 11.237C5.047 10.063 5.466 9.103 6.149 8.357C6.046 8.107 5.677 7.016 6.263 5.559C6.263 5.559 7.168 5.279 9.5 6.653C10.857 6.294 12.311 6.294 13.668 6.653C16 5.279 16.905 5.559 16.905 5.559C17.491 7.016 17.122 8.107 17.019 8.357C17.703 9.103 18.122 10.063 18.122 11.237C18.122 15.124 15.497 16.105 12.991 16.35C13.346 16.66 13.666 17.273 13.666 18.205C13.666 19.543 13.654 20.622 13.654 20.951C13.654 21.218 13.831 21.526 14.343 21.435C18.408 20.168 21.282 16.418 21.282 12C21.282 6.477 16.805 2 12 2Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
          <div className="footer-location">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
                fill="currentColor"
              />
            </svg>
            <span>Chicago</span>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}
