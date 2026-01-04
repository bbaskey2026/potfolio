import React, { useEffect, useState } from 'react';
import { 
  ArrowRight, 
  Download, 
  Code, 
  Github, 
  Linkedin, 
  Twitter,
  Mail,
  ChevronDown,
  Sparkles,
  Terminal,
  Braces,
  Database,
  Globe
} from 'lucide-react';

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const floatingIcons = [
    { icon: <Terminal size={24} />, delay: 0, x: 10, y: 20 },
    { icon: <Braces size={20} />, delay: 0.5, x: 85, y: 15 },
    { icon: <Database size={22} />, delay: 1, x: 75, y: 70 },
    { icon: <Globe size={26} />, delay: 1.5, x: 15, y: 75 },
    { icon: <Code size={20} />, delay: 2, x: 90, y: 45 },
  ];

  return (
    <>
      <style>{`
        .hero-section {
          min-height: 100vh;
          background: #000000;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Animated gradient background */
        .hero-gradient {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(
              circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
              rgba(99, 102, 241, 0.15) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 80% 20%,
              rgba(168, 85, 247, 0.1) 0%,
              transparent 40%
            ),
            radial-gradient(
              circle at 20% 80%,
              rgba(59, 130, 246, 0.1) 0%,
              transparent 40%
            );
          pointer-events: none;
        }

        /* Grid pattern overlay */
        .hero-grid {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
        }

        /* Floating particles */
        .hero-particles {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          animation: float 15s infinite ease-in-out;
        }

        .particle:nth-child(1) { left: 10%; animation-delay: 0s; }
        .particle:nth-child(2) { left: 20%; animation-delay: 2s; }
        .particle:nth-child(3) { left: 30%; animation-delay: 4s; }
        .particle:nth-child(4) { left: 40%; animation-delay: 6s; }
        .particle:nth-child(5) { left: 50%; animation-delay: 8s; }
        .particle:nth-child(6) { left: 60%; animation-delay: 10s; }
        .particle:nth-child(7) { left: 70%; animation-delay: 12s; }
        .particle:nth-child(8) { left: 80%; animation-delay: 14s; }
        .particle:nth-child(9) { left: 90%; animation-delay: 1s; }
        .particle:nth-child(10) { left: 95%; animation-delay: 3s; }

        @keyframes float {
          0%, 100% {
            transform: translateY(100vh) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) scale(1);
            opacity: 0;
          }
        }

        /* Floating icons */
        .floating-icon {
          position: absolute;
          color: rgba(255, 255, 255, 0.1);
          animation: floatIcon 6s infinite ease-in-out;
          pointer-events: none;
        }

        @keyframes floatIcon {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }

        /* Main content container */
        .hero-container {
          max-width: 1400px;
          width: 100%;
          padding: 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          position: relative;
          z-index: 10;
        }

        /* Left content */
        .hero-content {
          opacity: 0;
          transform: translateY(30px);
          animation: slideUp 0.8s ease-out forwards;
        }

        .hero-content.visible {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes slideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Badge */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50px;
          margin-bottom: 1.5rem;
          animation: slideUp 0.8s ease-out 0.2s both;
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          background: #22c55e;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.2);
          }
        }

        .badge-text {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.875rem;
          font-weight: 500;
        }

        /* Title */
        .hero-title {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 4rem;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          letter-spacing: -0.03em;
          animation: slideUp 0.8s ease-out 0.3s both;
        }

        .hero-title .highlight {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Subtitle */
        .hero-subtitle {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.7;
          margin-bottom: 2rem;
          max-width: 500px;
          animation: slideUp 0.8s ease-out 0.4s both;
        }

        /* Tech stack */
        .hero-tech-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 2.5rem;
          animation: slideUp 0.8s ease-out 0.5s both;
        }

        .tech-item {
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .tech-item:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        /* Buttons */
        .hero-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 3rem;
          animation: slideUp 0.8s ease-out 0.6s both;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          position: relative;
          overflow: hidden;
        }

        .btn-primary::before {
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

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 40px rgba(102, 126, 234, 0.4);
        }

        .btn-primary:hover::before {
          opacity: 1;
        }

        .btn-primary span,
        .btn-primary svg {
          position: relative;
          z-index: 1;
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          background: transparent;
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-3px);
        }

        /* Social links */
        .hero-socials {
          display: flex;
          gap: 1rem;
          animation: slideUp 0.8s ease-out 0.7s both;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: rgba(255, 255, 255, 0.7);
          transition: all 0.3s ease;
        }

        .social-link:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.3);
          color: white;
          transform: translateY(-3px);
        }

        /* Right side - Visual */
        .hero-visual {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          animation: slideUp 0.8s ease-out 0.4s both;
        }

        .visual-container {
          position: relative;
          width: 450px;
          height: 450px;
        }

        /* Glowing orb */
        .glow-orb {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 300px;
          height: 300px;
          background: radial-gradient(
            circle,
            rgba(102, 126, 234, 0.3) 0%,
            rgba(118, 75, 162, 0.2) 40%,
            transparent 70%
          );
          border-radius: 50%;
          filter: blur(40px);
          animation: glowPulse 4s infinite ease-in-out;
        }

        @keyframes glowPulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.8;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 1;
          }
        }

        /* Code window */
        .code-window {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 380px;
          background: rgba(17, 17, 27, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          overflow: hidden;
          backdrop-filter: blur(20px);
          box-shadow: 
            0 0 0 1px rgba(255, 255, 255, 0.05),
            0 20px 50px rgba(0, 0, 0, 0.5),
            0 0 100px rgba(102, 126, 234, 0.2);
        }

        .code-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 1.25rem;
          background: rgba(255, 255, 255, 0.02);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .code-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .code-dot.red { background: #ff5f56; }
        .code-dot.yellow { background: #ffbd2e; }
        .code-dot.green { background: #27ca40; }

        .code-title {
          margin-left: auto;
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.75rem;
          font-family: 'JetBrains Mono', monospace;
        }

        .code-body {
          padding: 1.5rem;
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 0.875rem;
          line-height: 1.8;
        }

        .code-line {
          display: flex;
          gap: 1rem;
          opacity: 0;
          animation: typeLine 0.5s ease-out forwards;
        }

        .code-line:nth-child(1) { animation-delay: 0.8s; }
        .code-line:nth-child(2) { animation-delay: 1.0s; }
        .code-line:nth-child(3) { animation-delay: 1.2s; }
        .code-line:nth-child(4) { animation-delay: 1.4s; }
        .code-line:nth-child(5) { animation-delay: 1.6s; }
        .code-line:nth-child(6) { animation-delay: 1.8s; }
        .code-line:nth-child(7) { animation-delay: 2.0s; }
        .code-line:nth-child(8) { animation-delay: 2.2s; }

        @keyframes typeLine {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .line-number {
          color: rgba(255, 255, 255, 0.2);
          user-select: none;
          min-width: 20px;
        }

        .keyword { color: #c792ea; }
        .function { color: #82aaff; }
        .string { color: #c3e88d; }
        .variable { color: #f78c6c; }
        .bracket { color: #89ddff; }
        .comment { color: rgba(255, 255, 255, 0.3); font-style: italic; }
        .white { color: rgba(255, 255, 255, 0.9); }

        /* Floating cards */
        .floating-card {
          position: absolute;
          background: rgba(17, 17, 27, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1rem 1.25rem;
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: white;
          font-size: 0.875rem;
          animation: floatCard 6s infinite ease-in-out;
        }

        .floating-card.card-1 {
          top: 5%;
          right: 10%;
          animation-delay: 0s;
        }

        .floating-card.card-2 {
          bottom: 15%;
          left: 5%;
          animation-delay: 2s;
        }

        .floating-card.card-3 {
          bottom: 5%;
          right: 15%;
          animation-delay: 4s;
        }

        @keyframes floatCard {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        .card-icon {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card-text {
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
        }

        .card-label {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.75rem;
        }

        .card-value {
          color: white;
          font-weight: 600;
        }

        /* Scroll indicator */
        .scroll-indicator {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.75rem;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          50% {
            transform: translateX(-50%) translateY(10px);
          }
        }

        .scroll-mouse {
          width: 24px;
          height: 38px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 12px;
          position: relative;
        }

        .scroll-wheel {
          position: absolute;
          top: 6px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 8px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 2px;
          animation: scrollWheel 2s infinite;
        }

        @keyframes scrollWheel {
          0%, 100% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
          50% {
            opacity: 0.3;
            transform: translateX(-50%) translateY(10px);
          }
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .hero-container {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 3rem;
          }

          .hero-content {
            order: 2;
          }

          .hero-visual {
            order: 1;
          }

          .hero-title {
            font-size: 3rem;
          }

          .hero-subtitle {
            margin-left: auto;
            margin-right: auto;
          }

          .hero-tech-stack,
          .hero-buttons,
          .hero-socials {
            justify-content: center;
          }

          .visual-container {
            width: 350px;
            height: 350px;
          }

          .code-window {
            width: 320px;
          }

          .floating-card {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .hero-title {
            font-size: 2.25rem;
          }

          .hero-subtitle {
            font-size: 1rem;
          }

          .visual-container {
            width: 280px;
            height: 280px;
          }

          .code-window {
            width: 260px;
          }

          .code-body {
            padding: 1rem;
            font-size: 0.75rem;
          }

          .btn-primary,
          .btn-secondary {
            padding: 0.875rem 1.5rem;
            font-size: 0.875rem;
          }

          .scroll-indicator {
            display: none;
          }
        }
      `}</style>

      <section className="hero-section">
        {/* Animated gradient background */}
        <div 
          className="hero-gradient"
          style={{
            '--mouse-x': `${mousePosition.x}%`,
            '--mouse-y': `${mousePosition.y}%`
          }}
        />

        {/* Grid pattern */}
        <div className="hero-grid" />

        {/* Floating particles */}
        <div className="hero-particles">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="particle" />
          ))}
        </div>

        {/* Floating icons */}
        {floatingIcons.map((item, index) => (
          <div
            key={index}
            className="floating-icon"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              animationDelay: `${item.delay}s`
            }}
          >
            {item.icon}
          </div>
        ))}

        {/* Main content */}
        <div className="hero-container">
          {/* Left side - Content */}
          <div className={`hero-content ${isVisible ? 'visible' : ''}`}>
            {/* Status badge */}
            <div className="hero-badge">
              <div className="badge-dot" />
              <span className="badge-text">Available for opportunities</span>
            </div>

            {/* Title */}
            <h1 className="hero-title">
              Hi, I'm <span className="highlight">Bibek Baskey</span><br />
              Full Stack Developer
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle">
              I craft exceptional digital experiences with modern technologies. 
              Passionate about solving complex problems and building scalable, 
              user-centric applications.
            </p>

            {/* Tech stack */}
            <div className="hero-tech-stack">
              <span className="tech-item">React</span>
              <span className="tech-item">Node.js</span>
              <span className="tech-item">TypeScript</span>
              <span className="tech-item">Python</span>
              <span className="tech-item">AWS</span>
              <span className="tech-item">MongoDB</span>
            </div>

            {/* Buttons */}
            <div className="hero-buttons">
              <a href="#projects" className="btn-primary">
                <span>View My Work</span>
                <ArrowRight size={18} />
              </a>
              <a href="/resume.pdf" className="btn-secondary" download>
                <Download size={18} />
                <span>Download Resume</span>
              </a>
            </div>

            {/* Social links */}
            <div className="hero-socials">
              <a 
                href="https://github.com/bbaskey2026" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="mailto:your@email.com" 
                className="social-link"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Right side - Visual */}
          <div className="hero-visual">
            <div className="visual-container">
              {/* Glowing orb */}
              <div className="glow-orb" />

              {/* Code window */}
              <div className="code-window">
                <div className="code-header">
                  <div className="code-dot red" />
                  <div className="code-dot yellow" />
                  <div className="code-dot green" />
                  <span className="code-title">developer.js</span>
                </div>
                <div className="code-body">
                  <div className="code-line">
                    <span className="line-number">1</span>
                    <span><span className="keyword">const</span> <span className="variable">developer</span> <span className="white">=</span> <span className="bracket">{'{'}</span></span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">2</span>
                    <span>  <span className="function">name</span><span className="white">:</span> <span className="string">"Bibek Baskey"</span><span className="white">,</span></span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">3</span>
                    <span>  <span className="function">role</span><span className="white">:</span> <span className="string">"Full Stack Dev"</span><span className="white">,</span></span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">4</span>
                    <span>  <span className="function">skills</span><span className="white">:</span> <span className="bracket">[</span><span className="string">"React"</span><span className="white">,</span> <span className="string">"Node"</span><span className="bracket">]</span><span className="white">,</span></span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">5</span>
                    <span>  <span className="function">passion</span><span className="white">:</span> <span className="string">"Building cool stuff"</span><span className="white">,</span></span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">6</span>
                    <span>  <span className="function">coffee</span><span className="white">:</span> <span className="variable">Infinity</span><span className="white">,</span></span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">7</span>
                    <span><span className="bracket">{'}'}</span><span className="white">;</span></span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">8</span>
                    <span className="comment">// Let's build something amazing! 🚀</span>
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              <div className="floating-card card-1">
                <div className="card-icon">
                  <Code size={18} />
                </div>
                <div className="card-text">
                  <span className="card-label">Projects</span>
                  <span className="card-value">50+</span>
                </div>
              </div>

              <div className="floating-card card-2">
                <div className="card-icon">
                  <Sparkles size={18} />
                </div>
                <div className="card-text">
                  <span className="card-label">Experience</span>
                  <span className="card-value">5+ Years</span>
                </div>
              </div>

              <div className="floating-card card-3">
                <div className="card-icon">
                  <Github size={18} />
                </div>
                <div className="card-text">
                  <span className="card-label">Contributions</span>
                  <span className="card-value">1000+</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
          <span>Scroll down</span>
        </div>
      </section>
    </>
  );
}