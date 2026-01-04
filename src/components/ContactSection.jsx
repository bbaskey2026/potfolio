import React, { useState, useRef, useEffect } from 'react';
import {
  Mail,
  Linkedin,
  Github,
  Twitter,
  Send,
  MapPin,
  Phone,
  Clock,
  ArrowRight,
  Sparkles,
  MessageSquare,
  User,
  AtSign,
  FileText,
  CheckCircle,
  Loader2,
  ExternalLink,
  Calendar,
  Coffee,
  Zap,
  Heart,
  Globe
} from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      label: 'Email',
      value: 'bibek@example.com',
      link: 'mailto:bibek@example.com',
      color: '#3b82f6'
    },
    {
      icon: <MapPin size={24} />,
      label: 'Location',
      value: 'India',
      link: null,
      color: '#10b981'
    },
    {
      icon: <Clock size={24} />,
      label: 'Timezone',
      value: 'IST (UTC+5:30)',
      link: null,
      color: '#f59e0b'
    }
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <Github size={22} />,
      url: 'https://github.com/bbaskey2026',
      color: '#ffffff',
      followers: '1.2K'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin size={22} />,
      url: 'https://linkedin.com/in/yourusername',
      color: '#0077b5',
      followers: '500+'
    },
    {
      name: 'Twitter',
      icon: <Twitter size={22} />,
      url: 'https://twitter.com/yourusername',
      color: '#1da1f2',
      followers: '800+'
    },
    {
      name: 'Email',
      icon: <Mail size={22} />,
      url: 'mailto:bibek@example.com',
      color: '#ea4335',
      followers: null
    }
  ];

  const quickActions = [
    {
      icon: <Calendar size={20} />,
      title: 'Schedule a Call',
      description: 'Book a 30-min intro call',
      link: 'https://calendly.com/yourusername',
      color: '#8b5cf6'
    },
    {
      icon: <Coffee size={20} />,
      title: 'Buy Me a Coffee',
      description: 'Support my work',
      link: 'https://buymeacoffee.com/yourusername',
      color: '#f59e0b'
    },
    {
      icon: <FileText size={20} />,
      title: 'Download Resume',
      description: 'Get my latest CV',
      link: '/resume.pdf',
      color: '#10b981'
    }
  ];

  return (
    <>
      <style>{`
        .contact-section {
          background: #000000;
          padding: 8rem 2rem;
          position: relative;
          overflow: hidden;
        }

        /* Background effects */
        .contact-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(ellipse at 20% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(236, 72, 153, 0.08) 0%, transparent 60%);
          pointer-events: none;
        }

        .contact-grid-pattern {
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

        /* Floating elements */
        .floating-elements {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .floating-shape {
          position: absolute;
          border-radius: 50%;
          opacity: 0.1;
          animation: float 20s infinite ease-in-out;
        }

        .floating-shape:nth-child(1) {
          width: 300px;
          height: 300px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          top: 10%;
          left: -5%;
          animation-delay: 0s;
        }

        .floating-shape:nth-child(2) {
          width: 200px;
          height: 200px;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          bottom: 10%;
          right: -3%;
          animation-delay: -5s;
        }

        .floating-shape:nth-child(3) {
          width: 150px;
          height: 150px;
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          top: 50%;
          right: 10%;
          animation-delay: -10s;
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(20px, -20px) rotate(5deg);
          }
          50% {
            transform: translate(0, -40px) rotate(0deg);
          }
          75% {
            transform: translate(-20px, -20px) rotate(-5deg);
          }
        }

        /* Container */
        .contact-container {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }

        /* Header */
        .contact-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .contact-badge {
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

        .contact-badge.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .contact-badge-icon {
          color: #ec4899;
        }

        .contact-badge-text {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.875rem;
          font-weight: 500;
        }

        .contact-title {
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

        .contact-title .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .contact-subtitle {
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

        /* Main content grid */
        .contact-content {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 4rem;
          opacity: 0;
          animation: fadeInUp 0.6s ease-out 0.3s forwards;
        }

        /* Left side - Info & Social */
        .contact-info-side {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        /* Contact info cards */
        .contact-info-cards {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .contact-info-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          transition: all 0.3s ease;
        }

        .contact-info-card:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.1);
          transform: translateX(10px);
        }

        .info-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .info-content {
          flex: 1;
        }

        .info-label {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.4);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.25rem;
        }

        .info-value {
          font-size: 1rem;
          color: #ffffff;
          font-weight: 500;
        }

        .info-value a {
          color: #ffffff;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .info-value a:hover {
          color: #8b5cf6;
        }

        /* Social links */
        .social-section {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 20px;
          padding: 2rem;
        }

        .social-title {
          font-size: 1rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .social-title-icon {
          color: #8b5cf6;
        }

        .social-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .social-link {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          padding: 1rem 1.25rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 12px;
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
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .social-link:hover {
          transform: translateY(-3px);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .social-link:hover::before {
          opacity: 0.1;
        }

        .social-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease;
        }

        .social-link:hover .social-icon {
          transform: scale(1.1);
        }

        .social-info {
          flex: 1;
          position: relative;
          z-index: 1;
        }

        .social-name {
          font-size: 0.95rem;
          font-weight: 600;
          color: #ffffff;
        }

        .social-followers {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.4);
        }

        .social-arrow {
          color: rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
          position: relative;
          z-index: 1;
        }

        .social-link:hover .social-arrow {
          color: white;
          transform: translateX(3px);
        }

        /* Quick actions */
        .quick-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .quick-action {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.25rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .quick-action:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.1);
          transform: translateX(5px);
        }

        .quick-action-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .quick-action-content {
          flex: 1;
        }

        .quick-action-title {
          font-size: 0.95rem;
          font-weight: 600;
          color: #ffffff;
        }

        .quick-action-desc {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.4);
        }

        .quick-action-arrow {
          color: rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
        }

        .quick-action:hover .quick-action-arrow {
          color: white;
          transform: translateX(3px);
        }

        /* Right side - Form */
        .contact-form-side {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 24px;
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
        }

        .contact-form-side::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        }

        .form-header {
          margin-bottom: 2rem;
        }

        .form-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .form-title-icon {
          color: #8b5cf6;
        }

        .form-description {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.95rem;
        }

        /* Form styles */
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .form-group {
          position: relative;
        }

        .form-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 0.5rem;
        }

        .input-wrapper {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.3);
          transition: color 0.3s ease;
          pointer-events: none;
        }

        .form-input {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          color: #ffffff;
          font-size: 1rem;
          transition: all 0.3s ease;
          outline: none;
        }

        .form-input::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }

        .form-input:focus {
          background: rgba(255, 255, 255, 0.05);
          border-color: #8b5cf6;
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
        }

        .form-input:focus + .input-icon,
        .form-group.focused .input-icon {
          color: #8b5cf6;
        }

        .form-textarea {
          min-height: 150px;
          resize: vertical;
          padding-top: 1rem;
        }

        .form-textarea + .input-icon {
          top: 1rem;
          transform: none;
        }

        /* Submit button */
        .submit-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 1.25rem 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 12px;
          color: white;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .submit-btn::before {
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

        .submit-btn:hover::before {
          opacity: 1;
        }

        .submit-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .submit-btn span,
        .submit-btn svg {
          position: relative;
          z-index: 1;
        }

        .submit-btn .btn-arrow {
          transition: transform 0.3s ease;
        }

        .submit-btn:hover .btn-arrow {
          transform: translateX(5px);
        }

        .btn-loading {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Success state */
        .success-message {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 3rem 2rem;
          animation: fadeInUp 0.5s ease-out;
        }

        .success-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(52, 211, 153, 0.2) 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #10b981;
          margin-bottom: 1.5rem;
          animation: scaleIn 0.5s ease-out;
        }

        @keyframes scaleIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .success-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }

        .success-text {
          color: rgba(255, 255, 255, 0.5);
          font-size: 1rem;
        }

        /* Availability banner */
        .availability-banner {
          margin-top: 2rem;
          padding: 1.25rem 1.5rem;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(52, 211, 153, 0.05) 100%);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .availability-dot {
          width: 12px;
          height: 12px;
          background: #10b981;
          border-radius: 50%;
          animation: pulse 2s infinite;
          flex-shrink: 0;
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

        .availability-text {
          flex: 1;
        }

        .availability-title {
          font-size: 0.95rem;
          font-weight: 600;
          color: #10b981;
        }

        .availability-desc {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.5);
        }

        /* Bottom decoration */
        .contact-bottom {
          margin-top: 4rem;
          text-align: center;
          opacity: 0;
          animation: fadeInUp 0.6s ease-out 0.5s forwards;
        }

        .bottom-text {
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .bottom-text .heart {
          color: #ef4444;
          animation: heartbeat 1.5s infinite;
        }

        @keyframes heartbeat {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .contact-content {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .social-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .contact-section {
            padding: 5rem 1rem;
          }

          .contact-title {
            font-size: 2.5rem;
          }

          .form-row {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .social-grid {
            grid-template-columns: 1fr;
          }

          .contact-form-side {
            padding: 1.5rem;
          }

          .contact-info-card {
            padding: 1rem;
          }
        }

        @media (max-width: 480px) {
          .contact-title {
            font-size: 2rem;
          }

          .contact-subtitle {
            font-size: 1rem;
          }

          .form-input {
            padding: 0.875rem 0.875rem 0.875rem 2.75rem;
          }

          .input-icon {
            left: 0.875rem;
          }

          .submit-btn {
            padding: 1rem 1.5rem;
          }
        }
      `}</style>

      <section id="contact" className="contact-section" ref={sectionRef}>
        {/* Background effects */}
        <div className="contact-bg" />
        <div className="contact-grid-pattern" />

        {/* Floating elements */}
        <div className="floating-elements">
          <div className="floating-shape" />
          <div className="floating-shape" />
          <div className="floating-shape" />
        </div>

        <div className="contact-container">
          {/* Header */}
          <div className="contact-header">
            <div className={`contact-badge ${isVisible ? 'visible' : ''}`}>
              <MessageSquare size={16} className="contact-badge-icon" />
              <span className="contact-badge-text">Let's Connect</span>
            </div>
            <h2 className="contact-title">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="contact-subtitle">
              Have a project in mind or want to collaborate? I'd love to hear from you.
              Let's create something amazing together!
            </p>
          </div>

          {/* Main content */}
          <div className="contact-content">
            {/* Left side - Info */}
            <div className="contact-info-side">
              {/* Contact info cards */}
              <div className="contact-info-cards">
                {contactInfo.map((info, index) => (
                  <div key={index} className="contact-info-card">
                    <div 
                      className="info-icon"
                      style={{ background: `linear-gradient(135deg, ${info.color}40 0%, ${info.color}20 100%)` }}
                    >
                      {React.cloneElement(info.icon, { color: info.color })}
                    </div>
                    <div className="info-content">
                      <div className="info-label">{info.label}</div>
                      <div className="info-value">
                        {info.link ? (
                          <a href={info.link}>{info.value}</a>
                        ) : (
                          info.value
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div className="social-section">
                <h3 className="social-title">
                  <Globe size={18} className="social-title-icon" />
                  Connect with me
                </h3>
                <div className="social-grid">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      style={{ '--social-color': social.color }}
                    >
                      <div 
                        className="social-icon"
                        style={{ background: `linear-gradient(135deg, ${social.color}40 0%, ${social.color}20 100%)` }}
                      >
                        {React.cloneElement(social.icon, { color: social.color })}
                      </div>
                      <div className="social-info">
                        <div className="social-name">{social.name}</div>
                        {social.followers && (
                          <div className="social-followers">{social.followers} followers</div>
                        )}
                      </div>
                      <ExternalLink size={16} className="social-arrow" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick actions */}
              <div className="quick-actions">
                {quickActions.map((action, index) => (
                  <a
                    key={index}
                    href={action.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="quick-action"
                  >
                    <div 
                      className="quick-action-icon"
                      style={{ background: `linear-gradient(135deg, ${action.color}40 0%, ${action.color}20 100%)` }}
                    >
                      {React.cloneElement(action.icon, { color: action.color })}
                    </div>
                    <div className="quick-action-content">
                      <div className="quick-action-title">{action.title}</div>
                      <div className="quick-action-desc">{action.description}</div>
                    </div>
                    <ArrowRight size={16} className="quick-action-arrow" />
                  </a>
                ))}
              </div>
            </div>

            {/* Right side - Form */}
            <div className="contact-form-side">
              {isSubmitted ? (
                <div className="success-message">
                  <div className="success-icon">
                    <CheckCircle size={40} />
                  </div>
                  <h3 className="success-title">Message Sent!</h3>
                  <p className="success-text">
                    Thank you for reaching out. I'll get back to you soon!
                  </p>
                </div>
              ) : (
                <>
                  <div className="form-header">
                    <h3 className="form-title">
                      <Send size={20} className="form-title-icon" />
                      Send a Message
                    </h3>
                    <p className="form-description">
                      Fill out the form below and I'll respond within 24 hours.
                    </p>
                  </div>

                  <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                      <div className={`form-group ${focusedField === 'name' ? 'focused' : ''}`}>
                        <label className="form-label">Your Name</label>
                        <div className="input-wrapper">
                          <input
                            type="text"
                            name="name"
                            className="form-input"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField(null)}
                            required
                          />
                          <User size={18} className="input-icon" />
                        </div>
                      </div>

                      <div className={`form-group ${focusedField === 'email' ? 'focused' : ''}`}>
                        <label className="form-label">Your Email</label>
                        <div className="input-wrapper">
                          <input
                            type="email"
                            name="email"
                            className="form-input"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            required
                          />
                          <AtSign size={18} className="input-icon" />
                        </div>
                      </div>
                    </div>

                    <div className={`form-group ${focusedField === 'subject' ? 'focused' : ''}`}>
                      <label className="form-label">Subject</label>
                      <div className="input-wrapper">
                        <input
                          type="text"
                          name="subject"
                          className="form-input"
                          placeholder="What's this about?"
                          value={formData.subject}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('subject')}
                          onBlur={() => setFocusedField(null)}
                          required
                        />
                        <FileText size={18} className="input-icon" />
                      </div>
                    </div>

                    <div className={`form-group ${focusedField === 'message' ? 'focused' : ''}`}>
                      <label className="form-label">Your Message</label>
                      <div className="input-wrapper">
                        <textarea
                          name="message"
                          className="form-input form-textarea"
                          placeholder="Tell me about your project..."
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => setFocusedField(null)}
                          required
                        />
                        <MessageSquare size={18} className="input-icon" />
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      className="submit-btn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={20} className="btn-loading" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <ArrowRight size={20} className="btn-arrow" />
                        </>
                      )}
                    </button>
                  </form>

                  {/* Availability banner */}
                  <div className="availability-banner">
                    <div className="availability-dot" />
                    <div className="availability-text">
                      <div className="availability-title">Available for new projects</div>
                      <div className="availability-desc">Currently accepting freelance work</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Bottom */}
          <div className="contact-bottom">
            <p className="bottom-text">
              Made with <Heart size={16} className="heart" /> by Bibek Baskey
            </p>
          </div>
        </div>
      </section>
    </>
  );
}