import React, { useState, useEffect } from 'react';
import {
  Cloud, Code, Briefcase, Mail, Github, Linkedin, ExternalLink,
  ArrowRight, ArrowLeft, Package, Clock, Star
} from 'lucide-react';
import './PortFolio.css';
import AboutStats from './AboutStats';
import Skills from './Skills';
export default function Portfolio() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const projects = [
    {
      id: 1,
      title: 'XWeather - Real-time Weather App',
      description: 'A comprehensive weather application with real-time data, geolocation support, and beautiful UI with city insights.',
      fullDescription: 'XWeather is a modern, full-stack weather application that provides real-time weather information for cities worldwide. The application features a beautiful bento-style UI, dynamic city images from Wikipedia, and comprehensive weather metrics including temperature, humidity, wind speed, and weather conditions.',
      image: 'https://images.unsplash.com/photo-1534274988757-a28bf1a4c817?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      tech: ['React', 'Node.js', 'Express', 'OpenWeather API'],
      packages: [
        { name: 'react', version: '^18.2.0', purpose: 'Frontend framework' },
        { name: 'react-router-dom', version: '^6.20.0', purpose: 'Client-side routing' },
        { name: 'express', version: '^4.18.2', purpose: 'Backend server framework' },
        { name: 'axios', version: '^1.6.2', purpose: 'HTTP client for API calls' },
        { name: 'cors', version: '^2.8.5', purpose: 'Enable CORS' },
        { name: 'dotenv', version: '^16.3.1', purpose: 'Environment variables' }
      ],
      features: [
        'Real-time weather data from OpenWeather API',
        'Dynamic city images from Wikipedia',
        'Bento-style responsive UI design',
        'Temperature, humidity, and wind speed metrics',
        'Weather status indicators',
        'Progress bars for visual data representation',
        'Loading states and error handling'
      ],
      github: 'https://github.com/yourusername/xweather',
      live: 'https://xweather-demo.com',
      duration: '2 weeks',
      role: 'Full-Stack Developer'
    },
    // ... other projects here (you can keep them unchanged)
  ];

  const skills = [
    { category: 'Frontend', items: ['React', 'JavaScript', 'Tailwind CSS', 'HTML/CSS'] },
    { category: 'Backend', items: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL'] },
    { category: 'Tools', items: ['Git', 'Docker', 'AWS', 'Firebase'] },
    { category: 'Design', items: ['UI/UX', 'Figma', 'Responsive Design', 'Animations'] }
  ];

  return (
    <div className="portfolio-page">
      <div className="animated-bg">
        <div className="bg-blob-1"></div>
        <div className="bg-blob-2"></div>
      </div>

      <nav className="navbar">
        <div className="logo-section">
          <Cloud className="logo-icon" />
          <h1 className="logo-text">DevPortfolio</h1>
        </div>
        <div className="nav-center">
          <a href="#about" className="nav-link">About</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#skills" className="nav-link">Skills</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
        <div className="time-display">
          {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Hi, I'm a Full-Stack Developer</h1>
          <p className="hero-subtitle">Building amazing digital experiences with modern technologies</p>
          <p className="hero-description">
            I create beautiful, functional web applications that solve real-world problems. Specialized in React, Node.js, and creating seamless user experiences.
          </p>
          <button className="hero-button">
            View My Work <ArrowRight className="inline-icon" />
          </button>
        </div>
        <div className="hero-image">
          <div className="image-placeholder">
            <Code className="placeholder-icon" color='red' />
          </div>
        </div>
      </section>

      <section id="about" className="about-section">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              I'm a passionate full-stack developer with 5+ years of experience building web applications. I love turning complex problems into simple, beautiful, and intuitive designs.
            </p>
            <p>
              When I'm not coding, you'll find me learning new technologies, contributing to open-source projects, or sharing knowledge with the developer community.
            </p>
           
<AboutStats></AboutStats>
          </div>
          <div className="about-image">
            <img src="./icons/ram.png" alt="Profile" />
          </div>
        </div>
      </section>
<Skills></Skills>
      <section id="skills" className="skills-section">
        <h2 className="section-title">Skills & Technologies</h2>
        <div className="skills-grid">
          {skills.map((skillGroup, index) => (
            <div key={index} className="skill-card">
              <h3 className="skill-category">{skillGroup.category}</h3>
              <ul className="skill-items">
                {skillGroup.items.map((skill, i) => (
                  <li key={i} className="skill-item">{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="projects-section">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card ${index % 2 === 0 ? 'card-normal' : 'card-alt'}`}
              style={{ cursor: 'pointer' }}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <button
                  className="project-button"
                  onClick={() =>
                    setSelectedProject(selectedProject?.id === project.id ? null : project)
                  }
                >
                  {selectedProject?.id === project.id ? (
                    <>Hide Details <ArrowLeft className="icon-small" /></>
                  ) : (
                    <>View Details <ExternalLink className="icon-small" /></>
                  )}
                </button>

                {/* Inline Project Detail Block */}
                {selectedProject?.id === project.id && (
                  <div className="inline-project-detail">
                    <div className="project-meta">
                      <div><Clock /> {project.duration}</div>
                      <div><Briefcase /> {project.role}</div>
                    </div>
                    <h4>Technologies:</h4>
                    <div className="tech-tags-container">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="tech-tag-detail">{tech}</span>
                      ))}
                    </div>
                    <h4>Packages:</h4>
                    <div className="packages-grid">
                      {project.packages.map((pkg, i) => (
                        <div key={i} className="package-card">
                          <div className="package-header">
                            <span className="package-name">{pkg.name}</span>
                            <span className="package-version">{pkg.version}</span>
                          </div>
                          <p className="package-purpose">{pkg.purpose}</p>
                        </div>
                      ))}
                    </div>
                    <h4>Features:</h4>
                    <ul className="features-list">
                      {project.features.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                    <div className="project-links">
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="icon-small" /> GitHub
                      </a>
                      <a href={project.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="icon-small" /> Live Demo
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-section">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-box">
          <p className="contact-description">
            I'm always interested in hearing about new projects and opportunities. Feel free to reach out!
          </p>
          <div className="contact-buttons">
            <button className="contact-button email">
              <Mail className="icon-small" /> Email Me
            </button>
            <button className="contact-button github">
              <Github className="icon-small" /> GitHub
            </button>
            <button className="contact-button linkedin">
              <Linkedin className="icon-small" /> LinkedIn
            </button>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2025 DevPortfolio. All rights reserved.</p>
          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
