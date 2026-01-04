import React from 'react';
import { Code, Zap, BookOpen } from 'lucide-react';
import "./styles/App.css";
export default function DSAShowcase() {
  const topics = [
    { name: 'Arrays & Strings', count: 80, icon: <Code size={20} /> },
    { name: 'Dynamic Programming', count: 60, icon: <Zap size={20} /> },
    { name: 'Trees & Graphs', count: 70, icon: <BookOpen size={20} /> },
    { name: 'Sorting & Searching', count: 50, icon: <Code size={20} /> },
  ];

  return (
    <section className="section" style={{ background: '#fafafa' }}>
      <h2 className="section-title">Problem Categories</h2>
      <p className="section-subtitle">Topics I've mastered through practice</p>
      <div className="skills-grid">
        {topics.map((topic, index) => (
          <div key={index} className="skill-category">
            <h3 className="skill-category-title">
              {topic.icon}
              {topic.name}
            </h3>
            <p style={{ color: '#6b6b6b', marginTop: '0.5rem' }}>
              {topic.count}+ problems solved
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}