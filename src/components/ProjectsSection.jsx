import React, { useState, useEffect, useRef } from 'react';
import {
  Github,
  ExternalLink,
  Star,
  GitFork,
  Code2,
  Folder,
  ArrowRight,
  Sparkles,
  Loader2,
  Eye,
  Calendar,
  RefreshCw,
  Filter,
  Grid3X3,
  List,
  ChevronRight,
  Zap,
  Trophy,
  BookOpen,
  Terminal
} from 'lucide-react';
import GitHubProjectViewer from './GitHubProjectViewer';
import DSAProblemsGitHub from './DSAProblemsGitHub';

// Featured Project Card Component
const FeaturedProjectCard = ({ project, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // REMOVED: Duplicate isVisible state and mousePosition state
  // These were causing the error

  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: '#f7df1e',
      TypeScript: '#3178c6',
      Python: '#3572A5',
      Java: '#b07219',
      'C++': '#f34b7d',
      C: '#555555',
      HTML: '#e34c26',
      CSS: '#563d7c',
      Ruby: '#701516',
      Go: '#00ADD8',
      Rust: '#dea584',
      PHP: '#4F5D95',
      Swift: '#ffac45',
      Kotlin: '#A97BFF',
      default: '#8b5cf6'
    };
    return colors[language] || colors.default;
  };

  return (
    <div
      className={`featured-project-card ${isVisible ? 'visible' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="project-image-wrapper">
        <div className={`project-image ${imageLoaded ? 'loaded' : ''}`}>
          {project.image ? (
            <img
              src={project.image}
              alt={project.name}
              onLoad={() => setImageLoaded(true)}
            />
          ) : (
            <div className="project-image-placeholder">
              <Code2 size={48} />
            </div>
          )}
          <div className="project-image-overlay">
            <div className="overlay-content">
              <a
                href={project.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="overlay-btn primary"
              >
                <Github size={18} />
                View Code
              </a>
              {project.homepage && (
                <a
                  href={project.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="overlay-btn secondary"
                >
                  <ExternalLink size={18} />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Floating badges */}
        {project.stargazers_count > 0 && (
          <div className="floating-badge stars">
            <Star size={14} />
            {project.stargazers_count}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="project-content">
        <div className="project-header">
          <div className="project-icon">
            <Folder size={20} />
          </div>
          <h3 className="project-title">{project.name}</h3>
        </div>

        <p className="project-description">
          {project.description || 'An awesome project built with modern technologies.'}
        </p>

        {/* Tech stack */}
        <div className="project-tech">
          {project.language && (
            <span
              className="tech-tag primary"
              style={{
                '--tag-color': getLanguageColor(project.language),
                background: `${getLanguageColor(project.language)}20`,
                borderColor: `${getLanguageColor(project.language)}40`
              }}
            >
              <span
                className="tech-dot"
                style={{ background: getLanguageColor(project.language) }}
              />
              {project.language}
            </span>
          )}
          {project.topics?.slice(0, 3).map((topic, i) => (
            <span key={i} className="tech-tag">
              {topic}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="project-stats">
          <div className="stat">
            <Star size={14} />
            <span>{project.stargazers_count}</span>
          </div>
          <div className="stat">
            <GitFork size={14} />
            <span>{project.forks_count}</span>
          </div>
          <div className="stat">
            <Eye size={14} />
            <span>{project.watchers_count}</span>
          </div>
          <div className="stat">
            <Calendar size={14} />
            <span>{new Date(project.updated_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="project-actions">
          <a
            href={project.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="action-btn primary"
          >
            <Github size={16} />
            View Repository
            <ArrowRight size={16} className="arrow-icon" />
          </a>
          {project.homepage && (
            <a
              href={project.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="action-btn secondary"
            >
              <ExternalLink size={16} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Projects Section Component
export default function ProjectsSection({ username = "bbaskey2026" }) {
  const [activeTab, setActiveTab] = useState('featured');
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  // Project images mapping - add your project images here
  const projectImages = {
    // Add custom images for your projects by repo name
    // 'repo-name': 'https://your-image-url.com/image.jpg',
  };

  // Default images for projects without custom images
  const defaultImages = [
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=600&h=400&fit=crop',
  ];

  // Mouse tracking effect - moved to parent component
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetchFeaturedProjects();
  }, [username]);

  const fetchFeaturedProjects = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
        {
          headers: {
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch repositories');
      }

      const repos = await response.json();

      // Filter and sort repos - prioritize starred, then by recent updates
      const filteredRepos = repos
        .filter(repo => !repo.fork) // Exclude forks
        .sort((a, b) => {
          // Prioritize repos with stars
          if (b.stargazers_count !== a.stargazers_count) {
            return b.stargazers_count - a.stargazers_count;
          }
          // Then by recent updates
          return new Date(b.updated_at) - new Date(a.updated_at);
        })
        .slice(0, 4) // Get top 4 projects
        .map((repo, index) => ({
          ...repo,
          image: projectImages[repo.name] || defaultImages[index % defaultImages.length],
        }));

      setFeaturedProjects(filteredRepos);
    } catch (err) {
      console.error('Error fetching repos:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'featured', label: 'Featured Projects', icon: <Trophy size={18} /> },
    { id: 'github', label: 'GitHub Repositories', icon: <Github size={18} /> },
    { id: 'dsa', label: 'DSA Problems (C++)', icon: <Terminal size={18} /> },
  ];

  const stats = [
    { label: 'Total Projects', value: featuredProjects.length > 0 ? '50+' : '...' },
    { label: 'Open Source', value: featuredProjects.length > 0 ? '30+' : '...' },
    { label: 'Stars Earned', value: featuredProjects.reduce((acc, p) => acc + p.stargazers_count, 0) || '...' },
  ];

  return (
    <>
      <style>{`
        .projects-section {
          background: #000000;
          padding: 8rem 2rem;
          position: relative;
          overflow: hidden;
          min-height: 100vh;
        }

        /* Hero gradient that follows mouse */
        .hero-gradient {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
            600px circle at var(--mouse-x) var(--mouse-y),
            rgba(139, 92, 246, 0.15),
            transparent 40%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Background effects */
        .projects-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(ellipse at 10% 10%, rgba(139, 92, 246, 0.1) 0%, transparent 40%),
            radial-gradient(ellipse at 90% 90%, rgba(59, 130, 246, 0.1) 0%, transparent 40%),
            radial-gradient(ellipse at 50% 50%, rgba(236, 72, 153, 0.05) 0%, transparent 50%);
          pointer-events: none;
        }

        .projects-grid-pattern {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        /* Container */
        .projects-container {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }

        /* Header */
        .projects-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .projects-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1.25rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50px;
          margin-bottom: 1.5rem;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .projects-badge-icon {
          color: #f59e0b;
        }

        .projects-badge-text {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.875rem;
          font-weight: 500;
        }

        .projects-title {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 3.5rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 1rem;
          letter-spacing: -0.03em;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.6s ease-out 0.1s forwards;
        }

        .projects-title .gradient-text {
          background: linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .projects-subtitle {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.5);
          max-width: 600px;
          margin: 0 auto 2rem;
          line-height: 1.7;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.6s ease-out 0.2s forwards;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Quick Stats */
        .quick-stats {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-bottom: 3rem;
          opacity: 0;
          animation: fadeInUp 0.6s ease-out 0.3s forwards;
        }

        .quick-stat {
          text-align: center;
        }

        .quick-stat-value {
          font-size: 2rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 0.25rem;
        }

        .quick-stat-label {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.5);
        }

        /* Tabs */
        .project-tabs {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
          opacity: 0;
          animation: fadeInUp 0.6s ease-out 0.4s forwards;
          flex-wrap: wrap;
        }

        .tab-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 1.75rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .tab-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .tab-button:hover {
          border-color: rgba(255, 255, 255, 0.15);
          color: rgba(255, 255, 255, 0.9);
          transform: translateY(-2px);
        }

        .tab-button.active {
          border-color: transparent;
          color: white;
        }

        .tab-button.active::before {
          opacity: 1;
        }

        .tab-button span,
        .tab-button svg {
          position: relative;
          z-index: 1;
        }

        .tab-icon {
          display: flex;
        }

        /* Projects Grid */
        .featured-projects-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          opacity: 0;
          animation: fadeInUp 0.6s ease-out 0.5s forwards;
        }

        /* Featured Project Card */
        .featured-project-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          opacity: 0;
          transform: translateY(30px);
        }

        .featured-project-card.visible {
          animation: cardFadeIn 0.6s ease-out forwards;
        }

        @keyframes cardFadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .featured-project-card:hover {
          transform: translateY(-10px);
          border-color: rgba(255, 255, 255, 0.15);
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.5),
            0 0 100px rgba(139, 92, 246, 0.1);
        }

        /* Project Image */
        .project-image-wrapper {
          position: relative;
          height: 220px;
          overflow: hidden;
        }

        .project-image {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .project-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
          opacity: 0;
          transform: scale(1.1);
        }

        .project-image.loaded img {
          opacity: 1;
          transform: scale(1);
        }

        .featured-project-card:hover .project-image img {
          transform: scale(1.1);
        }

        .project-image-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%);
          color: rgba(255, 255, 255, 0.3);
        }

        .project-image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.9) 0%,
            rgba(0, 0, 0, 0.3) 50%,
            transparent 100%
          );
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 1.5rem;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .featured-project-card:hover .project-image-overlay {
          opacity: 1;
        }

        .overlay-content {
          display: flex;
          gap: 1rem;
          transform: translateY(20px);
          transition: transform 0.3s ease;
        }

        .featured-project-card:hover .overlay-content {
          transform: translateY(0);
        }

        .overlay-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          border-radius: 10px;
          font-size: 0.875rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .overlay-btn.primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .overlay-btn.primary:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
        }

        .overlay-btn.secondary {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          backdrop-filter: blur(10px);
        }

        .overlay-btn.secondary:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        /* Floating Badge */
        .floating-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.5rem 0.875rem;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(10px);
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #fbbf24;
          border: 1px solid rgba(251, 191, 36, 0.3);
        }

        /* Project Content */
        .project-content {
          padding: 1.75rem;
        }

        .project-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .project-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #8b5cf6;
        }

        .project-title {
          font-size: 1.375rem;
          font-weight: 700;
          color: #ffffff;
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .project-description {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 1.25rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Tech Tags */
        .project-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
        }

        .tech-tag {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.375rem 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
          transition: all 0.2s ease;
        }

        .tech-tag:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .tech-tag.primary {
          border-color: var(--tag-color, rgba(139, 92, 246, 0.4));
        }

        .tech-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        /* Stats */
        .project-stats {
          display: flex;
          gap: 1.25rem;
          padding: 1rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          margin-bottom: 1.25rem;
        }

        .project-stats .stat {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.8rem;
        }

        .project-stats .stat svg {
          color: rgba(255, 255, 255, 0.3);
        }

        /* Action Buttons */
        .project-actions {
          display: flex;
          gap: 0.75rem;
        }

        .action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          border-radius: 10px;
          font-size: 0.875rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          flex: 1;
        }

        .action-btn.primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          position: relative;
          overflow: hidden;
        }

        .action-btn.primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .action-btn.primary:hover::before {
          opacity: 1;
        }

        .action-btn.primary span,
        .action-btn.primary svg {
          position: relative;
          z-index: 1;
        }

        .action-btn.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }

        .action-btn.primary .arrow-icon {
          transition: transform 0.3s ease;
        }

        .action-btn.primary:hover .arrow-icon {
          transform: translateX(4px);
        }

        .action-btn.secondary {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.8);
        }

        .action-btn.secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          color: white;
        }

        /* Loading State */
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          gap: 1.5rem;
        }

        .loading-spinner {
          animation: spin 1s linear infinite;
          color: #8b5cf6;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .loading-text {
          color: rgba(255, 255, 255, 0.5);
          font-size: 1rem;
        }

        /* Error State */
        .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          gap: 1.5rem;
          text-align: center;
        }

        .error-icon {
          width: 80px;
          height: 80px;
          background: rgba(239, 68, 68, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ef4444;
        }

        .error-title {
          color: #ffffff;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .error-message {
          color: rgba(255, 255, 255, 0.5);
          max-width: 400px;
        }

        .retry-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .retry-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .featured-projects-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .projects-section {
            padding: 5rem 1rem;
          }

          .projects-title {
            font-size: 2.5rem;
          }

          .quick-stats {
            gap: 2rem;
          }

          .quick-stat-value {
            font-size: 1.5rem;
          }

          .project-tabs {
            gap: 0.5rem;
          }

          .tab-button {
            padding: 0.75rem 1.25rem;
            font-size: 0.875rem;
          }

          .tab-button .tab-text {
            display: none;
          }

          .featured-projects-grid {
            grid-template-columns: 1fr;
          }

          .project-image-wrapper {
            height: 180px;
          }

          .project-actions {
            flex-direction: column;
          }
        }

        @media (max-width: 480px) {
          .projects-title {
            font-size: 2rem;
          }

          .projects-subtitle {
            font-size: 1rem;
          }

          .quick-stats {
            flex-direction: column;
            gap: 1rem;
          }

          .project-content {
            padding: 1.25rem;
          }

          .project-stats {
            flex-wrap: wrap;
            gap: 0.75rem;
          }
        }
      `}</style>

      <section id="projects" className="projects-section" ref={sectionRef}>
        {/* Background */}
        <div
          className="hero-gradient"
          style={{
            '--mouse-x': `${mousePosition.x}%`,
            '--mouse-y': `${mousePosition.y}%`
          }}
        />
        <div className="projects-bg" />
        <div className="projects-grid-pattern" />

        <div className="projects-container">
          {/* Header */}
          <div className="projects-header">
            <div className="projects-badge">
              <Sparkles size={16} className="projects-badge-icon" />
              <span className="projects-badge-text">Portfolio Showcase</span>
            </div>
            <h2 className="projects-title">
              My <span className="gradient-text">Projects</span>
            </h2>
            <p className="projects-subtitle">
              A collection of my work, from featured projects to DSA solutions.
              Each project represents my passion for clean code and modern design.
            </p>

            {/* Quick Stats */}
            <div className="quick-stats">
              {stats.map((stat, index) => (
                <div key={index} className="quick-stat">
                  <div className="quick-stat-value">{stat.value}</div>
                  <div className="quick-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="project-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-text">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          {activeTab === 'featured' && (
            <>
              {loading ? (
                <div className="loading-container">
                  <Loader2 size={48} className="loading-spinner" />
                  <p className="loading-text">Loading projects from GitHub...</p>
                </div>
              ) : error ? (
                <div className="error-container">
                  <div className="error-icon">
                    <Code2 size={32} />
                  </div>
                  <h3 className="error-title">Failed to load projects</h3>
                  <p className="error-message">{error}</p>
                  <button className="retry-btn" onClick={fetchFeaturedProjects}>
                    <RefreshCw size={18} />
                    Try Again
                  </button>
                </div>
              ) : (
                <div className="featured-projects-grid">
                  {featuredProjects.map((project, index) => (
                    <FeaturedProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                      isVisible={isVisible}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === 'github' && <GitHubProjectViewer username={username} />}
          {activeTab === 'dsa' && <DSAProblemsGitHub />}
        </div>
      </section>
    </>
  );
}