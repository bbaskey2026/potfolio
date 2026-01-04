import React, { useState, useEffect, useRef } from 'react';
import {
  Code2,
  Trophy,
  Target,
  Zap,
  TrendingUp,
  Award,
  Star,
  Flame,
  Brain,
  Sparkles,
  ExternalLink,
  ChevronRight,
  BarChart3,
  GitBranch,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  Cpu,
  Layers,
  BookOpen
} from 'lucide-react';

export default function DSASection() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeCard, setActiveCard] = useState(null);
  const [counters, setCounters] = useState({});
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Start counter animation
          animateCounters();
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
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const animateCounters = () => {
    const targets = { total: 500, leetcode: 150, codeforces: 200, hackerrank: 150 };
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCounters({
        total: Math.floor(targets.total * easeOut),
        leetcode: Math.floor(targets.leetcode * easeOut),
        codeforces: Math.floor(targets.codeforces * easeOut),
        hackerrank: Math.floor(targets.hackerrank * easeOut)
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setCounters(targets);
      }
    }, stepDuration);
  };

  const platforms = [
    {
      id: 'leetcode',
      name: 'LeetCode',
      problems: 150,
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
        </svg>
      ),
      color: '#ffa116',
      bgGradient: 'linear-gradient(135deg, rgba(255, 161, 22, 0.15) 0%, rgba(255, 161, 22, 0.05) 100%)',
      link: 'https://leetcode.com/yourusername',
      rating: '1850+',
      rank: 'Knight',
      stats: { easy: 60, medium: 70, hard: 20 }
    },
    {
      id: 'codeforces',
      name: 'Codeforces',
      problems: 200,
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.672 21 0 20.328 0 19.5V9c0-.828.672-1.5 1.5-1.5h3zm9-4.5c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5v-15c0-.828.672-1.5 1.5-1.5h3zm9 7.5c.828 0 1.5.672 1.5 1.5v7.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V12c0-.828.672-1.5 1.5-1.5h3z"/>
        </svg>
      ),
      color: '#1890ff',
      bgGradient: 'linear-gradient(135deg, rgba(24, 144, 255, 0.15) 0%, rgba(24, 144, 255, 0.05) 100%)',
      link: 'https://codeforces.com/profile/yourusername',
      rating: '1400+',
      rank: 'Specialist',
      stats: { div1: 20, div2: 120, div3: 60 }
    },
    {
      id: 'hackerrank',
      name: 'HackerRank',
      problems: 150,
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M12 0c1.285 0 9.75 4.886 10.392 6 .645 1.115.645 10.885 0 12S13.287 24 12 24s-9.75-4.885-10.395-6c-.641-1.115-.641-10.885 0-12C2.25 4.886 10.715 0 12 0zm2.295 6.799c-.141 0-.258.115-.258.258v3.875H9.963V6.908h.701c.141 0 .254-.115.254-.258 0-.094-.049-.176-.123-.221L9.223 4.896c-.142-.09-.318.008-.318.18v1.573H6.85c-.259 0-.469.21-.469.469v9.764c0 .259.21.469.469.469h2.055v1.572c0 .172.176.27.318.18l1.572-1.533c.074-.045.123-.127.123-.221 0-.143-.113-.258-.254-.258h-.701v-3.875h4.074v4.024h-.701c-.141 0-.254.115-.254.258 0 .094.049.176.123.221l1.572 1.533c.142.09.318-.008.318-.18v-1.572h2.055c.259 0 .469-.21.469-.469V7.118c0-.259-.21-.469-.469-.469h-2.055V5.076c0-.172-.176-.27-.318-.18l-1.572 1.533c-.074.045-.123.127-.123.221 0 .143.117.149.258.149z"/>
        </svg>
      ),
      color: '#00ea64',
      bgGradient: 'linear-gradient(135deg, rgba(0, 234, 100, 0.15) 0%, rgba(0, 234, 100, 0.05) 100%)',
      link: 'https://hackerrank.com/yourusername',
      rating: '5★',
      rank: 'Gold Badge',
      stats: { algorithms: 80, dataStructures: 50, sql: 20 }
    }
  ];

  const dsaTopics = [
    { name: 'Arrays & Strings', count: 85, color: '#8b5cf6' },
    { name: 'Dynamic Programming', count: 65, color: '#ec4899' },
    { name: 'Trees & Graphs', count: 75, color: '#10b981' },
    { name: 'Binary Search', count: 45, color: '#f59e0b' },
    { name: 'Linked Lists', count: 35, color: '#3b82f6' },
    { name: 'Stack & Queue', count: 40, color: '#ef4444' },
    { name: 'Recursion', count: 50, color: '#06b6d4' },
    { name: 'Greedy', count: 55, color: '#84cc16' }
  ];

  const achievements = [
    {
      icon: <Trophy size={24} />,
      title: '500+ Problems',
      description: 'Solved across platforms',
      color: '#fbbf24'
    },
    {
      icon: <Flame size={24} />,
      title: '100 Day Streak',
      description: 'Consistent practice',
      color: '#ef4444'
    },
    {
      icon: <Award size={24} />,
      title: 'Contest Winner',
      description: 'Top 5% globally',
      color: '#8b5cf6'
    },
    {
      icon: <Star size={24} />,
      title: '5★ Rating',
      description: 'HackerRank certified',
      color: '#10b981'
    }
  ];

  return (
    <>
      <style>{`
        .dsa-section {
          background: #000000;
          padding: 8rem 2rem;
          position: relative;
          overflow: hidden;
          min-height: 100vh;
        }

        /* Background Effects */
        .dsa-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(ellipse at 30% 20%, rgba(139, 92, 246, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(16, 185, 129, 0.08) 0%, transparent 60%);
          pointer-events: none;
        }

        .dsa-mouse-gradient {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
            600px circle at var(--mouse-x) var(--mouse-y),
            rgba(139, 92, 246, 0.1),
            transparent 40%
          );
          pointer-events: none;
          z-index: 1;
        }

        .dsa-grid-pattern {
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

        /* Floating Code Elements */
        .floating-code {
          position: absolute;
          font-family: 'Fira Code', 'Monaco', monospace;
          font-size: 0.75rem;
          color: rgba(139, 92, 246, 0.15);
          pointer-events: none;
          white-space: nowrap;
          animation: floatCode 20s ease-in-out infinite;
        }

        .floating-code:nth-child(1) { top: 10%; left: 5%; animation-delay: 0s; }
        .floating-code:nth-child(2) { top: 30%; right: 8%; animation-delay: -5s; }
        .floating-code:nth-child(3) { bottom: 20%; left: 10%; animation-delay: -10s; }
        .floating-code:nth-child(4) { bottom: 40%; right: 5%; animation-delay: -15s; }

        @keyframes floatCode {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.15; }
          25% { transform: translateY(-20px) rotate(2deg); opacity: 0.25; }
          50% { transform: translateY(10px) rotate(-1deg); opacity: 0.15; }
          75% { transform: translateY(-10px) rotate(1deg); opacity: 0.2; }
        }

        /* Container */
        .dsa-container {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }

        /* Header */
        .dsa-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .dsa-badge {
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
          transition: all 0.6s ease;
        }

        .dsa-section.visible .dsa-badge {
          opacity: 1;
          transform: translateY(0);
        }

        .dsa-badge-icon {
          color: #10b981;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .dsa-badge-text {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.875rem;
          font-weight: 500;
        }

        .dsa-title {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 3.5rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 1rem;
          letter-spacing: -0.03em;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease 0.1s;
        }

        .dsa-section.visible .dsa-title {
          opacity: 1;
          transform: translateY(0);
        }

        .dsa-title .gradient-text {
          background: linear-gradient(135deg, #10b981 0%, #3b82f6 50%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .dsa-subtitle {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.5);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.7;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease 0.2s;
        }

        .dsa-section.visible .dsa-subtitle {
          opacity: 1;
          transform: translateY(0);
        }

        /* Main Stats Card */
        .main-stats-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 24px;
          padding: 3rem;
          margin-bottom: 3rem;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease 0.3s;
        }

        .dsa-section.visible .main-stats-card {
          opacity: 1;
          transform: translateY(0);
        }

        .main-stats-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.5), transparent);
        }

        .main-stats-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2.5rem;
        }

        .main-stats-icon {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .main-stats-info {
          text-align: left;
        }

        .main-stats-title {
          font-size: 2rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 0.25rem;
        }

        .main-stats-label {
          color: rgba(255, 255, 255, 0.5);
          font-size: 1rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        .stat-item {
          text-align: center;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 16px;
          transition: all 0.3s ease;
        }

        .stat-item:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
          transform: translateY(-5px);
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 0.5rem;
          background: var(--stat-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stat-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 500;
        }

        /* Platforms Section */
        .platforms-section {
          margin-bottom: 3rem;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease 0.4s;
        }

        .dsa-section.visible .platforms-section {
          opacity: 1;
          transform: translateY(0);
        }

        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .section-title-small {
          font-size: 1.25rem;
          font-weight: 700;
          color: #ffffff;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .section-title-icon {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #8b5cf6;
        }

        .platforms-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        /* Platform Card */
        .platform-card {
          background: var(--card-bg);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 20px;
          padding: 1.75rem;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
        }

        .platform-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--platform-color);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .platform-card:hover {
          transform: translateY(-8px);
          border-color: var(--platform-color);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }

        .platform-card:hover::before {
          opacity: 1;
        }

        .platform-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }

        .platform-icon {
          width: 52px;
          height: 52px;
          background: var(--icon-bg);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--platform-color);
          transition: all 0.3s ease;
        }

        .platform-card:hover .platform-icon {
          transform: scale(1.1) rotate(5deg);
        }

        .platform-link {
          width: 36px;
          height: 36px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.4);
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .platform-link:hover {
          background: var(--platform-color);
          color: white;
          transform: scale(1.1);
        }

        .platform-name {
          font-size: 1.25rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.25rem;
        }

        .platform-rank {
          font-size: 0.875rem;
          color: var(--platform-color);
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.375rem;
        }

        .platform-stats {
          display: flex;
          gap: 1.5rem;
          margin-top: 1.25rem;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .platform-stat {
          text-align: center;
          flex: 1;
        }

        .platform-stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.25rem;
        }

        .platform-stat-label {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.4);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* Progress Bar */
        .platform-progress {
          margin-top: 1.25rem;
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .progress-label {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .progress-value {
          font-size: 0.8rem;
          color: var(--platform-color);
          font-weight: 600;
        }

        .progress-bar {
          height: 6px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: var(--platform-color);
          border-radius: 3px;
          transition: width 1s ease;
          position: relative;
        }

        .progress-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        /* Topics Section */
        .topics-section {
          margin-bottom: 3rem;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease 0.5s;
        }

        .dsa-section.visible .topics-section {
          opacity: 1;
          transform: translateY(0);
        }

        .topics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }

        .topic-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 14px;
          padding: 1.25rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .topic-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: var(--topic-color);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .topic-card:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(255, 255, 255, 0.1);
          transform: translateX(5px);
        }

        .topic-card:hover::before {
          opacity: 1;
        }

        .topic-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }

        .topic-name {
          font-size: 0.95rem;
          font-weight: 600;
          color: #ffffff;
        }

        .topic-count {
          font-size: 0.8rem;
          color: var(--topic-color);
          font-weight: 600;
          background: var(--topic-bg);
          padding: 0.25rem 0.625rem;
          border-radius: 6px;
        }

        .topic-progress {
          height: 4px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 2px;
          overflow: hidden;
        }

        .topic-progress-fill {
          height: 100%;
          background: var(--topic-color);
          border-radius: 2px;
          transition: width 1s ease 0.5s;
        }

        /* Achievements Section */
        .achievements-section {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease 0.6s;
        }

        .dsa-section.visible .achievements-section {
          opacity: 1;
          transform: translateY(0);
        }

        .achievements-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .achievement-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          padding: 1.5rem;
          text-align: center;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .achievement-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60%;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--achievement-color), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .achievement-card:hover {
          background: rgba(255, 255, 255, 0.04);
          transform: translateY(-5px);
        }

        .achievement-card:hover::before {
          opacity: 1;
        }

        .achievement-icon {
          width: 56px;
          height: 56px;
          background: var(--icon-bg);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--achievement-color);
          margin: 0 auto 1rem;
          transition: all 0.3s ease;
        }

        .achievement-card:hover .achievement-icon {
          transform: scale(1.1) rotate(5deg);
        }

        .achievement-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.375rem;
        }

        .achievement-desc {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.5);
        }

        /* CTA Section */
        .dsa-cta {
          text-align: center;
          margin-top: 4rem;
          padding-top: 3rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease 0.7s;
        }

        .dsa-section.visible .dsa-cta {
          opacity: 1;
          transform: translateY(0);
        }

        .cta-text {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 1.5rem;
        }

        .cta-text strong {
          color: #ffffff;
        }

        .cta-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .cta-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 1.75rem;
          border-radius: 12px;
          font-size: 0.95rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .cta-btn.primary {
          background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%);
          color: white;
        }

        .cta-btn.primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(16, 185, 129, 0.3);
        }

        .cta-btn.secondary {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.8);
        }

        .cta-btn.secondary:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
          color: white;
        }

        /* Responsive */
        @media (max-width: 1200px) {
          .platforms-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .topics-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .achievements-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .dsa-section {
            padding: 5rem 1rem;
          }

          .dsa-title {
            font-size: 2.5rem;
          }

          .main-stats-card {
            padding: 2rem;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }

          .stat-value {
            font-size: 2rem;
          }

          .platforms-grid {
            grid-template-columns: 1fr;
          }

          .topics-grid {
            grid-template-columns: 1fr;
          }

          .achievements-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .cta-btn {
            width: 100%;
            max-width: 300px;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .dsa-title {
            font-size: 2rem;
          }

          .main-stats-header {
            flex-direction: column;
            text-align: center;
          }

          .main-stats-info {
            text-align: center;
          }

          .achievements-grid {
            grid-template-columns: 1fr;
          }

          .achievement-card {
            display: flex;
            align-items: center;
            gap: 1rem;
            text-align: left;
          }

          .achievement-icon {
            margin: 0;
            flex-shrink: 0;
          }
        }
      `}</style>

      <section
        id="dsa"
        className={`dsa-section ${isVisible ? 'visible' : ''}`}
        ref={sectionRef}
      >
        {/* Background Effects */}
        <div className="dsa-bg" />
        <div
          className="dsa-mouse-gradient"
          style={{
            '--mouse-x': `${mousePosition.x}%`,
            '--mouse-y': `${mousePosition.y}%`
          }}
        />
        <div className="dsa-grid-pattern" />

        {/* Floating Code Elements */}
        <div className="floating-code">const solve = (n) =&gt; dp[n]</div>
        <div className="floating-code">while (left &lt; right)</div>
        <div className="floating-code">return Math.max(...arr)</div>
        <div className="floating-code">graph.bfs(start, end)</div>

        <div className="dsa-container">
          {/* Header */}
          <div className="dsa-header">
            <div className="dsa-badge">
              <Brain size={16} className="dsa-badge-icon" />
              <span className="dsa-badge-text">Competitive Programming</span>
            </div>
            <h2 className="dsa-title">
              DSA <span className="gradient-text">Journey</span>
            </h2>
            <p className="dsa-subtitle">
              Continuously improving problem-solving skills through competitive programming
              and algorithmic challenges across multiple platforms.
            </p>
          </div>

          {/* Main Stats Card */}
          <div className="main-stats-card">
            <div className="main-stats-header">
              <div className="main-stats-icon">
                <Code2 size={32} />
              </div>
              <div className="main-stats-info">
                <div className="main-stats-title">{counters.total || 0}+ Problems Solved</div>
                <div className="main-stats-label">Across all competitive programming platforms</div>
              </div>
            </div>

            <div className="stats-grid">
              <div className="stat-item" style={{ '--stat-gradient': 'linear-gradient(135deg, #10b981, #3b82f6)' }}>
                <div className="stat-value">{counters.total || 0}+</div>
                <div className="stat-label">Total Problems</div>
              </div>
              <div className="stat-item" style={{ '--stat-gradient': 'linear-gradient(135deg, #ffa116, #ff6b6b)' }}>
                <div className="stat-value">{counters.leetcode || 0}+</div>
                <div className="stat-label">LeetCode</div>
              </div>
              <div className="stat-item" style={{ '--stat-gradient': 'linear-gradient(135deg, #1890ff, #722ed1)' }}>
                <div className="stat-value">{counters.codeforces || 0}+</div>
                <div className="stat-label">Codeforces</div>
              </div>
              <div className="stat-item" style={{ '--stat-gradient': 'linear-gradient(135deg, #00ea64, #00b894)' }}>
                <div className="stat-value">{counters.hackerrank || 0}+</div>
                <div className="stat-label">HackerRank</div>
              </div>
            </div>
          </div>

          {/* Platforms Section */}
          <div className="platforms-section">
            <div className="section-header">
              <h3 className="section-title-small">
                <span className="section-title-icon">
                  <Layers size={18} />
                </span>
                Coding Platforms
              </h3>
            </div>

            <div className="platforms-grid">
              {platforms.map((platform) => (
                <div
                  key={platform.id}
                  className="platform-card"
                  style={{
                    '--card-bg': platform.bgGradient,
                    '--platform-color': platform.color,
                    '--icon-bg': `${platform.color}15`
                  }}
                  onMouseEnter={() => setActiveCard(platform.id)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  <div className="platform-header">
                    <div className="platform-icon">
                      {platform.icon}
                    </div>
                    <a
                      href={platform.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="platform-link"
                    >
                      <ArrowUpRight size={18} />
                    </a>
                  </div>

                  <div className="platform-name">{platform.name}</div>
                  <div className="platform-rank">
                    <Star size={14} />
                    {platform.rank} • {platform.rating}
                  </div>

                  <div className="platform-stats">
                    <div className="platform-stat">
                      <div className="platform-stat-value">{platform.problems}+</div>
                      <div className="platform-stat-label">Solved</div>
                    </div>
                    <div className="platform-stat">
                      <div className="platform-stat-value">{platform.rating}</div>
                      <div className="platform-stat-label">Rating</div>
                    </div>
                  </div>

                  <div className="platform-progress">
                    <div className="progress-header">
                      <span className="progress-label">Progress</span>
                      <span className="progress-value">{Math.round((platform.problems / 500) * 100)}%</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: isVisible ? `${(platform.problems / 500) * 100}%` : '0%'
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Topics Section */}
          <div className="topics-section">
            <div className="section-header">
              <h3 className="section-title-small">
                <span className="section-title-icon">
                  <BookOpen size={18} />
                </span>
                Topics Mastered
              </h3>
            </div>

            <div className="topics-grid">
              {dsaTopics.map((topic, index) => (
                <div
                  key={index}
                  className="topic-card"
                  style={{
                    '--topic-color': topic.color,
                    '--topic-bg': `${topic.color}15`
                  }}
                >
                  <div className="topic-header">
                    <span className="topic-name">{topic.name}</span>
                    <span className="topic-count">{topic.count}</span>
                  </div>
                  <div className="topic-progress">
                    <div
                      className="topic-progress-fill"
                      style={{
                        width: isVisible ? `${(topic.count / 100) * 100}%` : '0%'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Section */}
          <div className="achievements-section">
            <div className="section-header">
              <h3 className="section-title-small">
                <span className="section-title-icon">
                  <Award size={18} />
                </span>
                Achievements
              </h3>
            </div>

            <div className="achievements-grid">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="achievement-card"
                  style={{
                    '--achievement-color': achievement.color,
                    '--icon-bg': `${achievement.color}15`
                  }}
                >
                  <div className="achievement-icon">
                    {achievement.icon}
                  </div>
                  <div>
                    <div className="achievement-title">{achievement.title}</div>
                    <div className="achievement-desc">{achievement.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="dsa-cta">
            <p className="cta-text">
              Interested in my <strong>problem-solving approach</strong>? Check out my solutions.
            </p>
            <div className="cta-buttons">
              <a
                href="https://github.com/yourusername/dsa-solutions"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn primary"
              >
                <Code2 size={18} />
                View Solutions
                <ChevronRight size={18} />
              </a>
              <a
                href="https://leetcode.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn secondary"
              >
                <ExternalLink size={18} />
                LeetCode Profile
              </a>
              <a
                href="https://codeforces.com/profile/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn secondary"
              >
                <ExternalLink size={18} />
                Codeforces Profile
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}