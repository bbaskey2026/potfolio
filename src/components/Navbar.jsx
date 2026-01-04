import React, { useState, useEffect } from 'react';
import {
  Code2,
  Menu,
  X,
  Home,
  User,
  FolderKanban,
  Mail,
  Clock,
  Sparkles,
  ChevronRight,
  Github,
  Linkedin,
  ExternalLink,
  Terminal,
  Zap
} from 'lucide-react';

export default function Navbar({ currentTime }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(false);

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ['home', 'about', 'projects', 'skills', 'dsa', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { id: 'home', label: 'Home', icon: <Home size={18} /> },
    { id: 'about', label: 'About', icon: <User size={18} /> },
    { id: 'projects', label: 'Projects', icon: <FolderKanban size={18} /> },
    { id: 'skills', label: 'Skills', icon: <Zap size={18} /> },
    { id: 'dsa', label: 'DSA', icon: <Terminal size={18} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={18} /> },
  ];

  const socialLinks = [
    { name: 'GitHub', icon: <Github size={20} />, href: 'https://github.com/yourusername' },
    { name: 'LinkedIn', icon: <Linkedin size={20} />, href: 'https://linkedin.com/in/yourusername' },
  ];

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setActiveSection(sectionId);

    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <style>{`
        /* Navbar Container */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 1rem 2rem;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
          transform: translateY(-20px);
        }

        .navbar.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .navbar.scrolled {
          padding: 0.75rem 2rem;
        }

        /* Navbar Inner */
        .navbar-inner {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1.5rem;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          transition: all 0.4s ease;
        }

        .navbar.scrolled .navbar-inner {
          background: rgba(0, 0, 0, 0.85);
          border-color: rgba(255, 255, 255, 0.1);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        }

        /* Logo Section */
        .logo-section {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .logo-section:hover {
          transform: scale(1.02);
        }

        .logo-icon-wrapper {
          width: 42px;
          height: 42px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .logo-icon-wrapper::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .logo-section:hover .logo-icon-wrapper::before {
          left: 100%;
        }

        .logo-section:hover .logo-icon-wrapper {
          transform: rotate(5deg);
        }

        .logo-text {
          font-size: 1.25rem;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.02em;
          display: flex;
          align-items: center;
        }

        .logo-text .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .logo-badge {
          margin-left: 0.5rem;
          padding: 0.125rem 0.5rem;
          background: rgba(139, 92, 246, 0.2);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 6px;
          font-size: 0.65rem;
          font-weight: 600;
          color: #a78bfa;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* Nav Center - Links */
        .nav-center {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1rem;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          border-radius: 10px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .nav-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 10px;
        }

        .nav-link:hover {
          color: rgba(255, 255, 255, 0.95);
        }

        .nav-link:hover::before {
          opacity: 0.1;
        }

        .nav-link.active {
          color: #ffffff;
        }

        .nav-link.active::before {
          opacity: 0.15;
        }

        .nav-link-icon {
          display: flex;
          opacity: 0.7;
          transition: all 0.3s ease;
        }

        .nav-link:hover .nav-link-icon,
        .nav-link.active .nav-link-icon {
          opacity: 1;
        }

        .nav-link-text {
          position: relative;
          z-index: 1;
        }

        /* Active indicator */
        .nav-link-indicator {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #667eea, #764ba2);
          border-radius: 1px;
          transition: width 0.3s ease;
        }

        .nav-link.active .nav-link-indicator,
        .nav-link:hover .nav-link-indicator {
          width: 60%;
        }

        /* Right Section */
        .nav-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        /* Time Display */
        .time-display {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 10px;
          transition: all 0.3s ease;
        }

        .time-display:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .time-icon {
          color: #8b5cf6;
          display: flex;
        }

        .time-content {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .time-value {
          font-size: 0.9rem;
          font-weight: 600;
          color: #ffffff;
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
        }

        .time-date {
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.4);
        }

        /* Social Links */
        .nav-social-links {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .nav-social-link {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 10px;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .nav-social-link:hover {
          background: rgba(139, 92, 246, 0.2);
          border-color: rgba(139, 92, 246, 0.3);
          color: #a78bfa;
          transform: translateY(-2px);
        }

        /* CTA Button */
        .nav-cta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1.25rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 10px;
          color: white;
          font-size: 0.875rem;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .nav-cta::before {
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

        .nav-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }

        .nav-cta:hover::before {
          opacity: 1;
        }

        .nav-cta span,
        .nav-cta svg {
          position: relative;
          z-index: 1;
        }

        .nav-cta .cta-arrow {
          transition: transform 0.3s ease;
        }

        .nav-cta:hover .cta-arrow {
          transform: translateX(3px);
        }

        /* Mobile Menu Button */
        .mobile-menu-btn {
          display: none;
          width: 44px;
          height: 44px;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          color: rgba(255, 255, 255, 0.8);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .mobile-menu-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
          color: #ffffff;
        }

        .mobile-menu-btn.active {
          background: rgba(139, 92, 246, 0.2);
          border-color: rgba(139, 92, 246, 0.3);
          color: #a78bfa;
        }

        /* Mobile Menu Overlay */
        .mobile-menu-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          z-index: 999;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .mobile-menu-overlay.open {
          opacity: 1;
          visibility: visible;
        }

        /* Mobile Menu */
        .mobile-menu {
          display: none;
          position: fixed;
          top: 0;
          right: 0;
          width: 320px;
          height: 100vh;
          background: #0a0a0a;
          border-left: 1px solid rgba(255, 255, 255, 0.08);
          z-index: 1001;
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          overflow-y: auto;
        }

        .mobile-menu.open {
          transform: translateX(0);
        }

        .mobile-menu-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .mobile-menu-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .mobile-menu-logo-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .mobile-menu-logo-text {
          font-size: 1.125rem;
          font-weight: 700;
          color: #ffffff;
        }

        .mobile-menu-close {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .mobile-menu-close:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
        }

        .mobile-menu-content {
          padding: 1.5rem;
        }

        .mobile-menu-section {
          margin-bottom: 2rem;
        }

        .mobile-menu-section-title {
          font-size: 0.75rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.4);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 0.75rem;
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          padding: 0.875rem 1rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 12px;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .mobile-nav-link:hover,
        .mobile-nav-link.active {
          background: rgba(139, 92, 246, 0.1);
          border-color: rgba(139, 92, 246, 0.2);
          color: #ffffff;
        }

        .mobile-nav-link-icon {
          width: 36px;
          height: 36px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.5);
          transition: all 0.3s ease;
        }

        .mobile-nav-link:hover .mobile-nav-link-icon,
        .mobile-nav-link.active .mobile-nav-link-icon {
          background: rgba(139, 92, 246, 0.2);
          color: #a78bfa;
        }

        .mobile-nav-link-content {
          flex: 1;
        }

        .mobile-nav-link-arrow {
          color: rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
        }

        .mobile-nav-link:hover .mobile-nav-link-arrow {
          color: rgba(255, 255, 255, 0.6);
          transform: translateX(3px);
        }

        /* Mobile Social Links */
        .mobile-social-links {
          display: flex;
          gap: 0.75rem;
        }

        .mobile-social-link {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.875rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 12px;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .mobile-social-link:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
          color: #ffffff;
        }

        /* Mobile Time Display */
        .mobile-time-display {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 12px;
        }

        .mobile-time-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .mobile-time-icon {
          width: 40px;
          height: 40px;
          background: rgba(139, 92, 246, 0.1);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #8b5cf6;
        }

        .mobile-time-label {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.4);
          margin-bottom: 0.125rem;
        }

        .mobile-time-value {
          font-size: 1rem;
          font-weight: 600;
          color: #ffffff;
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
        }

        .mobile-time-date {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.5);
        }

        /* Mobile CTA */
        .mobile-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 12px;
          color: white;
          font-size: 0.95rem;
          font-weight: 600;
          text-decoration: none;
          margin-top: 1.5rem;
          transition: all 0.3s ease;
        }

        .mobile-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }

        /* Responsive */
        @media (max-width: 1200px) {
          .nav-link-icon {
            display: none;
          }
        }

        @media (max-width: 1024px) {
          .navbar {
            padding: 0.75rem 1rem;
          }

          .navbar-inner {
            padding: 0.5rem 1rem;
          }

          .nav-center {
            display: none;
          }

          .nav-social-links {
            display: none;
          }

          .nav-cta {
            display: none;
          }

          .mobile-menu-btn {
            display: flex;
          }

          .mobile-menu-overlay {
            display: block;
          }

          .mobile-menu {
            display: block;
          }
        }

        @media (max-width: 768px) {
          .logo-badge {
            display: none;
          }

          .time-display {
            display: none;
          }

          .mobile-menu {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .navbar {
            padding: 0.5rem 0.75rem;
          }

          .navbar-inner {
            padding: 0.5rem 0.75rem;
            border-radius: 12px;
          }

          .logo-icon-wrapper {
            width: 36px;
            height: 36px;
          }

          .logo-text {
            font-size: 1.1rem;
          }

          .mobile-menu-btn {
            width: 40px;
            height: 40px;
          }
        }
      `}</style>

      {/* Navbar */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isVisible ? 'visible' : ''}`}>
        <div className="navbar-inner">
          {/* Logo */}
          <a
            href="#home"
            className="logo-section"
            onClick={(e) => handleNavClick(e, 'home')}
          >
            <div className="logo-icon-wrapper">
              <Code2 size={22} />
            </div>
            <h1 className="logo-text">
              Dev<span className="gradient-text">Portfolio</span>
              <span className="logo-badge">v2.0</span>
            </h1>
          </a>

          {/* Center Navigation */}
          <div className="nav-center">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, link.id)}
              >
                <span className="nav-link-icon">{link.icon}</span>
                <span className="nav-link-text">{link.label}</span>
                <span className="nav-link-indicator" />
              </a>
            ))}
          </div>

          {/* Right Section */}
          <div className="nav-right">
            {/* Time Display */}
            <div className="time-display">
              <Clock size={16} className="time-icon" />
              <div className="time-content">
                <span className="time-value">{formattedTime}</span>
                <span className="time-date">{formattedDate}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="nav-social-links">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-social-link"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <a href="#contact" className="nav-cta" onClick={(e) => handleNavClick(e, 'contact')}>
              <Sparkles size={16} />
              <span>Hire Me</span>
              <ChevronRight size={16} className="cta-arrow" />
            </a>

            {/* Mobile Menu Button */}
            <button
              className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <div className="mobile-menu-logo">
            <div className="mobile-menu-logo-icon">
              <Code2 size={20} />
            </div>
            <span className="mobile-menu-logo-text">DevPortfolio</span>
          </div>
          <button
            className="mobile-menu-close"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mobile-menu-content">
          {/* Navigation Links */}
          <div className="mobile-menu-section">
            <div className="mobile-menu-section-title">Navigation</div>
            <div className="mobile-nav-links">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`mobile-nav-link ${activeSection === link.id ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                >
                  <div className="mobile-nav-link-icon">{link.icon}</div>
                  <div className="mobile-nav-link-content">{link.label}</div>
                  <ChevronRight size={18} className="mobile-nav-link-arrow" />
                </a>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="mobile-menu-section">
            <div className="mobile-menu-section-title">Connect</div>
            <div className="mobile-social-links">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-social-link"
                >
                  {link.icon}
                  <span>{link.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Time Display */}
          <div className="mobile-menu-section">
            <div className="mobile-menu-section-title">Current Time</div>
            <div className="mobile-time-display">
              <div className="mobile-time-left">
                <div className="mobile-time-icon">
                  <Clock size={20} />
                </div>
                <div>
                  <div className="mobile-time-label">Local Time</div>
                  <div className="mobile-time-value">{formattedTime}</div>
                </div>
              </div>
              <div className="mobile-time-date">{formattedDate}</div>
            </div>
          </div>

          {/* CTA Button */}
          <a
            href="#contact"
            className="mobile-cta"
            onClick={(e) => handleNavClick(e, 'contact')}
          >
            <Sparkles size={18} />
            <span>Get In Touch</span>
            <ChevronRight size={18} />
          </a>
        </div>
      </div>
    </>
  );
}