import React, { useEffect, useState } from "react";
import "./PortFolio.css";

export default function AboutStats() {
  const [progress, setProgress] = useState({
    projects: 90,
    clients: 75,
    experience: 50,
  });

  return (
    <div className="about-stats">
      <Donut label="Projects Completed" value={progress.projects} color="#00c3ff" />
      <Donut label="Happy Clients" value={progress.clients} color="#ff0077" />
      <Donut label="Years Experience" value={progress.experience} color="#22c55e" />
    </div>
  );
}

// 🔹 Reusable Donut Component
function Donut({ label, value, color }) {
  const [offset, setOffset] = useState(440);

  useEffect(() => {
    const progressOffset = ((100 - value) / 100) * 440;
    setOffset(progressOffset);
  }, [value]);

  return (
    <div className="stat">
      <svg className="donut-svg" width="150" height="150">
        <circle className="donut-bg" cx="75" cy="75" r="70"></circle>
        <circle
          className="donut-ring"
          cx="75"
          cy="75"
          r="70"
          stroke={color}
          strokeDasharray="440"
          strokeDashoffset={offset}
        ></circle>
      </svg>
      <div className="stat-number">{value}%</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
