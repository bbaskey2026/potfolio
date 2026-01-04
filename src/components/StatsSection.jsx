import React from 'react';
import { Code, Users, Award, BookOpen } from 'lucide-react';
import "./styles/App.css";
export default function StatsSection() {
  const stats = [
    { icon: <Code size={32} />, value: '50+', label: 'Projects Completed' },
    { icon: <Users size={32} />, value: '30+', label: 'Happy Clients' },
    { icon: <Award size={32} />, value: '5+', label: 'Years Experience' },
    { icon: <BookOpen size={32} />, value: '100+', label: 'GitHub Repos' },
  ];

  return (
    <section className="stats-section">
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}