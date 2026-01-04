import React, { useState, useEffect, useRef } from 'react';
import { 
  Globe, 
  Database, 
  Cpu, 
  Terminal, 
  Code2,
  Server,
  Smartphone,
  Cloud,
  GitBranch,
  Palette,
  Zap,
  Shield,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Layers
} from 'lucide-react';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const sectionRef = useRef(null);

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

  const skillCategories = [
    {
      title: 'Frontend',
      icon: <Globe size={24} />,
      color: '#3b82f6',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      description: 'Building beautiful, responsive user interfaces',
      skills: [
        { name: 'React', level: 95, icon: '⚛️' },
        { name: 'Next.js', level: 90, icon: '▲' },
        { name: 'TypeScript', level: 88, icon: '📘' },
        { name: 'Tailwind CSS', level: 92, icon: '🎨' },
        { name: 'Redux', level: 85, icon: '🔄' },
        { name: 'Vue.js', level: 75, icon: '💚' },
      ],
    },
    {
      title: 'Backend',
      icon: <Server size={24} />,
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
      description: 'Developing robust server-side applications',
      skills: [
        { name: 'Node.js', level: 92, icon: '💚' },
        { name: 'Express', level: 90, icon: '🚂' },
        { name: 'Python', level: 85, icon: '🐍' },
        { name: 'Django', level: 78, icon: '🎸' },
        { name: 'PostgreSQL', level: 88, icon: '🐘' },
        { name: 'MongoDB', level: 90, icon: '🍃' },
      ],
    },
    {
      title: 'DevOps',
      icon: <Cloud size={24} />,
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
      description: 'Deploying and managing cloud infrastructure',
      skills: [
        { name: 'Docker', level: 88, icon: '🐳' },
        { name: 'AWS', level: 85, icon: '☁️' },
        { name: 'CI/CD', level: 90, icon: '🔄' },
        { name: 'Kubernetes', level: 75, icon: '☸️' },
        { name: 'Linux', level: 88, icon: '🐧' },
        { name: 'Nginx', level: 82, icon: '🌐' },
      ],
    },
    {
      title: 'Tools',
      icon: <Terminal size={24} />,
      color: '#ec4899',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
      description: 'Mastering essential development tools',
      skills: [
        { name: 'Git', level: 95, icon: '📦' },
        { name: 'VS Code', level: 92, icon: '💻' },
        { name: 'Postman', level: 88, icon: '📮' },
        { name: 'Figma', level: 80, icon: '🎨' },
        { name: 'Jest', level: 85, icon: '🃏' },
        { name: 'Webpack', level: 78, icon: '📦' },
      ],
    },
  ];

  const stats = [
    { label: 'Technologies', value: '25+', icon: <Layers size={20} /> },
    { label: 'Years Coding', value: '5+', icon: <TrendingUp size={20} /> },
    { label: 'Projects Built', value: '50+', icon: <CheckCircle2 size={20} /> },
    { label: 'Always Learning', value: '∞', icon: <Sparkles size={20} /> },
  ];

  return (
    <>
      <style>{`
        .skills-section {
          background: #000000;
          padding: 8rem 2rem;
          position: relative;
          overflow: hidden;
        }

        /* Background effects */
        .skills-bg-gradient {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(ellipse at 20% 20%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(16, 185, 129, 0.05) 0%, transparent 50%);
          pointer-events: none;
        }

        .skills-grid-pattern {
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
        .skills-container {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }

        /* Header */
        .skills-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .skills-badge {
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

        .skills-badge-icon {
          color: #8b5cf6;
        }

        .skills-badge-text {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.875rem;
          font-weight: 500;
        }

        .skills-title {
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

        .skills-title .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .skills-subtitle {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.5);
          max-width: 600px;
          margin: 0 auto;
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

        /* Stats bar */
        .skills-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-bottom: 4rem;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.6s ease-out 0.3s forwards;
        }

        .stat-item {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          padding: 1.5rem;
          text-align: center;
          transition: all 0.3s ease;
        }

        .stat-item:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.1);
          transform: translateY(-5px);
        }

        .stat-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%);
          border-radius: 12px;
          color: #8b5cf6;
          margin-bottom: 1rem;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.875rem;
        }

        /* Main content layout */
        .skills-content {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 3rem;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.6s ease-out 0.4s forwards;
        }

        /* Category tabs */
        .category-tabs {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          position: sticky;
          top: 100px;
          height: fit-content;
        }

        .category-tab {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
        }

        .category-tab:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .category-tab.active {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .category-tab.active .tab-icon-wrapper {
          transform: scale(1.1);
        }

        .tab-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          transition: all 0.3s ease;
        }

        .tab-content {
          flex: 1;
        }

        .tab-title {
          color: #ffffff;
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .tab-description {
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.8rem;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .tab-arrow {
          color: rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
        }

        .category-tab.active .tab-arrow {
          color: #ffffff;
          transform: translateX(5px);
        }

        /* Skills panel */
        .skills-panel {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 24px;
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
        }

        .skills-panel::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        }

        .panel-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .panel-icon {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .panel-info {
          flex: 1;
        }

        .panel-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.25rem;
        }

        .panel-description {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.95rem;
        }

        .panel-skill-count {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 50px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.875rem;
        }

        /* Skills grid */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }

        .skill-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          padding: 1.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .skill-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .skill-card:hover {
          transform: translateY(-5px) scale(1.02);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .skill-card:hover::before {
          opacity: 0.05;
        }

        .skill-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .skill-name-wrapper {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .skill-emoji {
          font-size: 1.5rem;
          line-height: 1;
        }

        .skill-name {
          color: #ffffff;
          font-size: 1.125rem;
          font-weight: 600;
        }

        .skill-level-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 600;
          color: white;
        }

        .skill-progress-wrapper {
          position: relative;
        }

        .skill-progress-bg {
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
        }

        .skill-progress-bar {
          height: 100%;
          border-radius: 4px;
          width: 0;
          transition: width 1s ease-out;
          position: relative;
        }

        .skill-progress-bar.animate {
          width: var(--progress);
        }

        .skill-progress-bar::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .skill-progress-label {
          display: flex;
          justify-content: space-between;
          margin-top: 0.5rem;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.4);
        }

        /* Additional skills */
        .additional-skills {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .additional-title {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .additional-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .additional-tag {
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.875rem;
          transition: all 0.3s ease;
        }

        .additional-tag:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.15);
          color: #ffffff;
          transform: translateY(-2px);
        }

        /* Mobile layout */
        .mobile-categories {
          display: none;
          overflow-x: auto;
          gap: 0.75rem;
          margin-bottom: 2rem;
          padding-bottom: 0.5rem;
          -webkit-overflow-scrolling: touch;
        }

        .mobile-categories::-webkit-scrollbar {
          display: none;
        }

        .mobile-tab {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .mobile-tab.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-color: transparent;
          color: white;
        }

        .mobile-tab-icon {
          width: 20px;
          height: 20px;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .skills-content {
            grid-template-columns: 1fr;
          }

          .category-tabs {
            display: none;
          }

          .mobile-categories {
            display: flex;
          }

          .skills-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .skills-section {
            padding: 5rem 1rem;
          }

          .skills-title {
            font-size: 2.5rem;
          }

          .skills-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }

          .stat-item {
            padding: 1.25rem;
          }

          .stat-value {
            font-size: 1.5rem;
          }

          .skills-panel {
            padding: 1.5rem;
          }

          .skills-grid {
            grid-template-columns: 1fr;
          }

          .panel-header {
            flex-wrap: wrap;
            gap: 1rem;
          }

          .panel-skill-count {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .skills-title {
            font-size: 2rem;
          }

          .skills-subtitle {
            font-size: 1rem;
          }

          .skill-card {
            padding: 1.25rem;
          }
        }
      `}</style>

      <section className="skills-section" ref={sectionRef}>
        {/* Background effects */}
        <div className="skills-bg-gradient" />
        <div className="skills-grid-pattern" />

        <div className="skills-container">
          {/* Header */}
          <div className="skills-header">
            <div className="skills-badge">
              <Zap size={16} className="skills-badge-icon" />
              <span className="skills-badge-text">Technical Expertise</span>
            </div>
            <h2 className="skills-title">
              Skills & <span className="gradient-text">Technologies</span>
            </h2>
            <p className="skills-subtitle">
              A comprehensive toolkit of modern technologies I use to build 
              exceptional digital experiences
            </p>
          </div>

          {/* Stats */}
          <div className="skills-stats">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Mobile category tabs */}
          <div className="mobile-categories">
            {skillCategories.map((category, index) => (
              <button
                key={index}
                className={`mobile-tab ${activeCategory === index ? 'active' : ''}`}
                onClick={() => setActiveCategory(index)}
              >
                <span className="mobile-tab-icon">{category.icon}</span>
                {category.title}
              </button>
            ))}
          </div>

          {/* Main content */}
          <div className="skills-content">
            {/* Category tabs - Desktop */}
            <div className="category-tabs">
              {skillCategories.map((category, index) => (
                <button
                  key={index}
                  className={`category-tab ${activeCategory === index ? 'active' : ''}`}
                  onClick={() => setActiveCategory(index)}
                >
                  <div 
                    className="tab-icon-wrapper"
                    style={{ background: category.gradient }}
                  >
                    {category.icon}
                  </div>
                  <div className="tab-content">
                    <div className="tab-title">{category.title}</div>
                    <div className="tab-description">{category.description}</div>
                  </div>
                  <ArrowRight size={18} className="tab-arrow" />
                </button>
              ))}
            </div>

            {/* Skills panel */}
            <div className="skills-panel">
              <div className="panel-header">
                <div 
                  className="panel-icon"
                  style={{ background: skillCategories[activeCategory].gradient }}
                >
                  {skillCategories[activeCategory].icon}
                </div>
                <div className="panel-info">
                  <h3 className="panel-title">{skillCategories[activeCategory].title}</h3>
                  <p className="panel-description">{skillCategories[activeCategory].description}</p>
                </div>
                <div className="panel-skill-count">
                  <Code2 size={16} />
                  {skillCategories[activeCategory].skills.length} Skills
                </div>
              </div>

              <div className="skills-grid">
                {skillCategories[activeCategory].skills.map((skill, index) => (
                  <div 
                    key={index} 
                    className="skill-card"
                    style={{
                      '--card-gradient': skillCategories[activeCategory].gradient
                    }}
                    onMouseEnter={() => setHoveredSkill(`${activeCategory}-${index}`)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div 
                      className="skill-card::before"
                      style={{ background: skillCategories[activeCategory].gradient }}
                    />
                    <div className="skill-card-header">
                      <div className="skill-name-wrapper">
                        <span className="skill-emoji">{skill.icon}</span>
                        <span className="skill-name">{skill.name}</span>
                      </div>
                      <span 
                        className="skill-level-badge"
                        style={{ background: skillCategories[activeCategory].gradient }}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    <div className="skill-progress-wrapper">
                      <div className="skill-progress-bg">
                        <div 
                          className={`skill-progress-bar ${isVisible ? 'animate' : ''}`}
                          style={{ 
                            '--progress': `${skill.level}%`,
                            background: skillCategories[activeCategory].gradient
                          }}
                        />
                      </div>
                      <div className="skill-progress-label">
                        <span>Proficiency</span>
                        <span>{skill.level >= 90 ? 'Expert' : skill.level >= 80 ? 'Advanced' : 'Intermediate'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional skills */}
              <div className="additional-skills">
                <div className="additional-title">
                  <Sparkles size={16} />
                  Also familiar with
                </div>
                <div className="additional-tags">
                  {activeCategory === 0 && (
                    <>
                      <span className="additional-tag">SASS</span>
                      <span className="additional-tag">Framer Motion</span>
                      <span className="additional-tag">Three.js</span>
                      <span className="additional-tag">GraphQL</span>
                      <span className="additional-tag">Storybook</span>
                    </>
                  )}
                  {activeCategory === 1 && (
                    <>
                      <span className="additional-tag">Redis</span>
                      <span className="additional-tag">GraphQL</span>
                      <span className="additional-tag">REST APIs</span>
                      <span className="additional-tag">Prisma</span>
                      <span className="additional-tag">Socket.io</span>
                    </>
                  )}
                  {activeCategory === 2 && (
                    <>
                      <span className="additional-tag">Terraform</span>
                      <span className="additional-tag">GitHub Actions</span>
                      <span className="additional-tag">Prometheus</span>
                      <span className="additional-tag">Grafana</span>
                      <span className="additional-tag">Azure</span>
                    </>
                  )}
                  {activeCategory === 3 && (
                    <>
                      <span className="additional-tag">npm</span>
                      <span className="additional-tag">Yarn</span>
                      <span className="additional-tag">Vim</span>
                      <span className="additional-tag">Jira</span>
                      <span className="additional-tag">Notion</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}