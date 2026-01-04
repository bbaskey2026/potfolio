import React, { useState } from 'react';
import { Github, ExternalLink, Star, GitFork, ArrowRight } from 'lucide-react';

export default function ProjectCard({ project }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <style>{`
        .project-card-wrapper {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .project-card-wrapper:hover {
          transform: translateY(-8px);
          border-color: rgba(255, 255, 255, 0.15);
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.5),
            0 0 100px rgba(139, 92, 246, 0.1);
        }

        .card-image-container {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease, opacity 0.3s ease;
          opacity: 0;
        }

        .card-image.loaded {
          opacity: 1;
        }

        .project-card-wrapper:hover .card-image {
          transform: scale(1.1);
        }

        .card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.8) 0%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: flex-end;
          padding: 1.5rem;
        }

        .project-card-wrapper:hover .card-overlay {
          opacity: 1;
        }

        .card-content {
          padding: 1.5rem;
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.75rem;
        }

        .card-description {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 1rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .card-tech-tag {
          padding: 0.25rem 0.625rem;
          background: rgba(139, 92, 246, 0.15);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 4px;
          font-size: 0.75rem;
          color: #a78bfa;
        }

        .card-actions {
          display: flex;
          gap: 0.75rem;
        }

        .card-action-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1rem;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          flex: 1;
          justify-content: center;
        }

        .card-action-btn.primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .card-action-btn.primary:hover {
          box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
        }

        .card-action-btn.secondary {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.8);
        }

        .card-action-btn.secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }
      `}</style>

      <div
        className="project-card-wrapper"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="card-image-container">
          <img
            src={project.image}
            alt={project.title}
            className={`card-image ${imageLoaded ? 'loaded' : ''}`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          <div className="card-overlay" />
        </div>

        <div className="card-content">
          <h3 className="card-title">{project.title}</h3>
          <p className="card-description">{project.description}</p>

          <div className="card-tech-tags">
            {project.tech.slice(0, 4).map((tech, index) => (
              <span key={index} className="card-tech-tag">
                {tech}
              </span>
            ))}
          </div>

          <div className="card-actions">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="card-action-btn primary"
            >
              <Github size={14} />
              GitHub
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="card-action-btn secondary"
              >
                <ExternalLink size={14} />
                Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}