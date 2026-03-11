"use client";

import { Project } from "@/content/projects";
import { useState } from "react";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Format content with line breaks and bold styling
  const formatContent = (text: string) => {
    // Split by ** for bold text
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        const boldText = part.slice(2, -2);
        return (
          <span
            key={index}
            style={{
              fontWeight: 500,
              color: "var(--black)",
              fontFamily: "'Clash Display', sans-serif",
              fontSize: "1.1em",
              textTransform: "uppercase" as const,
              letterSpacing: "0.05em",
              display: "block" as const,
              marginTop: "1.5rem",
              marginBottom: "0.5rem",
            }}
          >
            {boldText}
          </span>
        );
      }
      // Convert newlines to line breaks
      return (
        <span key={index}>
          {part.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              {i < part.split("\n").length - 1 && <br />}
            </span>
          ))}
        </span>
      );
    });
  };

  return (
    <article className="project">
      <div className="project-info">
        <h3>{project.title}</h3>
        <p className="meta">{project.meta}</p>
      </div>

      <div className="project-content">
        <p className="summary">{project.summary}</p>

        {project.links.length > 0 && (
          <div className="project-links">
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        {project.hasCaseStudy && (
          <>
            <button
              className="expand-btn"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
            >
              {isExpanded ? "[\u2212] Case Study" : "[+] Case Study"}
            </button>
            {isExpanded && project.content && (
              <div className="project-details expanded">
                <p>{formatContent(project.content)}</p>
              </div>
            )}
          </>
        )}
      </div>
    </article>
  );
}
