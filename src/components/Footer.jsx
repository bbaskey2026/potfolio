import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Heart, ArrowUp, Code2, Sparkles } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/yourusername',
      icon: <Github size={20} />,
      color: '#8b5cf6'
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/yourusername',
      icon: <Linkedin size={20} />,
      color: '#0077b5'
    },
    {
      name: 'Email',
      href: 'mailto:your@email.com',
      icon: <Mail size={20} />,
      color: '#ef4444'
    }
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <>
      <style>{`
        .footer {
          background: #000000;
          position: relative;
          overflow: hidden;
        }

        /* Background Effects */
        .footer-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(ellipse at 20% 100%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 100%, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
          pointer-events: none;
        }

        .footer-grid-pattern {
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

        /* Top Border Gradient */
        .footer-top-border {
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(139, 92, 246, 0.5) 20%,
            rgba(236, 72, 153, 0.5) 50%,
            rgba(59, 130, 246, 0.5) 80%,
            transparent 100%
          );
        }

        /* Main Content */
        .footer-main {
          padding: 4rem 2rem 2rem;
          position: relative;
          z-index: 10;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Top Section */
        .footer-top {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 4rem;
          margin-bottom: 3rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        /* Brand Section */
        .footer-brand {
          max-width: 350px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }

        .footer-logo-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .footer-logo-text {
          font-size: 1.5rem;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.02em;
        }

        .footer-logo-text .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .footer-description {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.95rem;
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }

        /* Social Links */
        .footer-social {
          display: flex;
          gap: 0.75rem;
        }

        .social-link {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .social-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--hover-color);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .social-link:hover {
          border-color: transparent;
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(139, 92, 246, 0.2);
        }

        .social-link:hover::before {
          opacity: 1;
        }

        .social-link svg {
          position: relative;
          z-index: 1;
        }

        /* Quick Links */
        .footer-section {
          display: flex;
          flex-direction: column;
        }

        .footer-section-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .footer-section-title::before {
          content: '';
          width: 8px;
          height: 8px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 2px;
        }

        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-link {
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .footer-link:hover {
          color: #8b5cf6;
          transform: translateX(5px);
        }

        .footer-link::before {
          content: '→';
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.3s ease;
        }

        .footer-link:hover::before {
          opacity: 1;
          transform: translateX(0);
        }

        /* Contact Info */
        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.95rem;
          margin-bottom: 0.75rem;
        }

        .contact-item-icon {
          width: 36px;
          height: 36px;
          background: rgba(139, 92, 246, 0.1);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #8b5cf6;
        }

        /* Bottom Section */
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1.5rem;
        }

        .footer-copyright {
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.875rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .footer-copyright .heart {
          color: #ef4444;
          animation: heartbeat 1.5s ease infinite;
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        .footer-made-with {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.875rem;
        }

        .footer-tech {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .tech-badge {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.375rem 0.75rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .tech-badge svg {
          color: #61dafb;
        }

        /* Scroll to Top Button */
        .scroll-top-btn {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 50%;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          visibility: hidden;
          transform: translateY(20px);
          transition: all 0.3s ease;
          z-index: 1000;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }

        .scroll-top-btn.visible {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .scroll-top-btn:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
        }

        .scroll-top-btn svg {
          transition: transform 0.3s ease;
        }

        .scroll-top-btn:hover svg {
          transform: translateY(-2px);
        }

        /* Decorative Elements */
        .footer-decoration {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.3;
          pointer-events: none;
        }

        .footer-decoration.purple {
          background: #8b5cf6;
          bottom: -150px;
          left: -100px;
        }

        .footer-decoration.blue {
          background: #3b82f6;
          bottom: -150px;
          right: -100px;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .footer-top {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }

          .footer-brand {
            grid-column: 1 / -1;
            max-width: 100%;
            text-align: center;
          }

          .footer-logo {
            justify-content: center;
          }

          .footer-social {
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .footer-main {
            padding: 3rem 1.5rem 1.5rem;
          }

          .footer-top {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
          }

          .footer-section {
            align-items: center;
          }

          .footer-links {
            align-items: center;
          }

          .footer-link:hover {
            transform: none;
          }

          .footer-link::before {
            display: none;
          }

          .footer-bottom {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .scroll-top-btn {
            bottom: 1.5rem;
            right: 1.5rem;
            width: 44px;
            height: 44px;
          }
        }

        @media (max-width: 480px) {
          .footer-logo-text {
            font-size: 1.25rem;
          }

          .footer-copyright {
            flex-direction: column;
            gap: 0.25rem;
          }

          .footer-made-with {
            flex-direction: column;
          }
        }

        /* Animation */
        .footer.visible .footer-brand,
        .footer.visible .footer-section,
        .footer.visible .footer-bottom {
          opacity: 1;
          transform: translateY(0);
        }

        .footer-brand,
        .footer-section,
        .footer-bottom {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease;
        }

        .footer-brand { transition-delay: 0.1s; }
        .footer-section:nth-child(2) { transition-delay: 0.2s; }
        .footer-section:nth-child(3) { transition-delay: 0.3s; }
        .footer-bottom { transition-delay: 0.4s; }
      `}</style>

      <footer className={`footer ${isVisible ? 'visible' : ''}`}>
        {/* Background Effects */}
        <div className="footer-bg" />
        <div className="footer-grid-pattern" />
        <div className="footer-decoration purple" />
        <div className="footer-decoration blue" />

        {/* Top Border */}
        <div className="footer-top-border" />

        {/* Main Content */}
        <div className="footer-main">
          <div className="footer-container">
            {/* Top Section */}
            <div className="footer-top">
              {/* Brand */}
              <div className="footer-brand">
                <div className="footer-logo">
                  <div className="footer-logo-icon">
                    <Code2 size={24} />
                  </div>
                  <span className="footer-logo-text">
                    Dev<span className="gradient-text">Portfolio</span>
                  </span>
                </div>
                <p className="footer-description">
                  Crafting exceptional digital experiences through clean code 
                  and innovative design. Let's build something amazing together.
                </p>
                <div className="footer-social">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      style={{ '--hover-color': link.color }}
                      aria-label={link.name}
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="footer-section">
                <h4 className="footer-section-title">Quick Links</h4>
                <div className="footer-links">
                  {quickLinks.map((link, index) => (
                    <a key={index} href={link.href} className="footer-link">
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="footer-section">
                <h4 className="footer-section-title">Get in Touch</h4>
                <div className="contact-item">
                  <div className="contact-item-icon">
                    <Mail size={16} />
                  </div>
                  <span>your@email.com</span>
                </div>
                <div className="contact-item">
                  <div className="contact-item-icon">
                    <Sparkles size={16} />
                  </div>
                  <span>Available for hire</span>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="footer-bottom">
              <p className="footer-copyright">
                <span>© {currentYear} DevPortfolio.</span>
                <span>All rights reserved.</span>
              </p>
              <div className="footer-made-with">
                <span>Made with</span>
                <Heart size={16} className="heart" fill="currentColor" />
                <span>using</span>
                <div className="tech-badge">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                  React
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <button
          className={`scroll-top-btn ${showScrollTop ? 'visible' : ''}`}
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ArrowUp size={22} />
        </button>
      </footer>
    </>
  );
}