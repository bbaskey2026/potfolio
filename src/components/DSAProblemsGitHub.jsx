import React, { useState } from 'react';
import {
  Search,
  Loader2,
  AlertCircle,
  FileCode,
  Download,
  ExternalLink,
  Code,
} from 'lucide-react';
import useWindowSize from '../hooks/useWindowSize';
import "./styles/App.css";
export default function DSAProblemsGitHub() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [repoName, setRepoName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { width } = useWindowSize();
  const isMobile = width < 768;

  const fetchCppFiles = async () => {
    if (!username || !repoName) {
      setError('Please enter both username and repository name');
      return;
    }

    setLoading(true);
    setError('');
    setProblems([]);

    try {
      let branch = 'main';
      let response = await fetch(
        `https://api.github.com/repos/${username}/${repoName}/git/trees/main?recursive=1`
      );

      if (!response.ok) {
        response = await fetch(
          `https://api.github.com/repos/${username}/${repoName}/git/trees/master?recursive=1`
        );
        branch = 'master';

        if (!response.ok) {
          throw new Error('Repository not found or inaccessible');
        }
      }

      const data = await response.json();
      processCppFiles(data.tree, branch);
    } catch (err) {
      setError(err.message || 'Failed to fetch repository');
    } finally {
      setLoading(false);
    }
  };

  const processCppFiles = (tree, branch) => {
    if (!tree || !Array.isArray(tree)) {
      setError('Invalid repository structure');
      return;
    }

    const cppFiles = tree.filter(
      (item) => item.type === 'blob' && item.path.endsWith('.cpp')
    );

    if (cppFiles.length === 0) {
      setError('No C++ files found in this repository');
      return;
    }

    const problemsList = cppFiles.map((file) => ({
      name: file.path.split('/').pop().replace('.cpp', ''),
      path: file.path,
      url: file.url,
      downloadUrl: `https://raw.githubusercontent.com/${username}/${repoName}/${branch}/${file.path}`,
      githubUrl: `https://github.com/${username}/${repoName}/blob/${branch}/${file.path}`,
      size: file.size,
      sha: file.sha,
    }));

    setProblems(problemsList);
  };

  const downloadFile = async (problem) => {
    try {
      const response = await fetch(problem.downloadUrl);
      if (!response.ok) throw new Error('Failed to fetch file');
      const content = await response.text();

      const blob = new Blob([content], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${problem.name}.cpp`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download error:', err);
      alert('Failed to download file');
    }
  };

  const filteredProblems = problems.filter(
    (problem) =>
      problem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.path.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dsa-problems-container">
      <div className="dsa-form">
        <div className="dsa-form-grid">
          <div className="form-group">
            <label>GitHub Username</label>
            <input
              type="text"
              placeholder="e.g., johnsmith"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Repository Name</label>
            <input
              type="text"
              placeholder="e.g., DSA-Solutions"
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
              className="form-input"
            />
          </div>
        </div>

        <button onClick={fetchCppFiles} disabled={loading} className="fetch-btn">
          {loading ? (
            <>
              <Loader2 size={20} className="loading-spinner" />
              Fetching C++ Files...
            </>
          ) : (
            <>
              <Search size={20} />
              Fetch C++ Files
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="error-message">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      {problems.length > 0 && (
        <div className="search-container">
          <div className="search-wrapper">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search problems..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <p className="search-results">
            Found {filteredProblems.length} C++ file
            {filteredProblems.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}

      <div className="problems-list">
        {filteredProblems.map((problem) => (
          <div key={problem.sha} className="problem-card">
            <div className={`problem-card-content ${isMobile ? 'mobile' : ''}`}>
              <div className="problem-info">
                <div className="problem-header">
                  <FileCode size={24} color="#1a1a1a" />
                  <h3 className="problem-name">{problem.name}</h3>
                </div>
                <p className="problem-meta">
                  <span>Path:</span> {problem.path}
                </p>
                <p className="problem-meta">
                  <span>Size:</span> {(problem.size / 1024).toFixed(2)} KB
                </p>
              </div>

              <div className="problem-actions">
                <button
                  onClick={() => downloadFile(problem)}
                  className="btn-primary"
                >
                  <Download size={16} />
                  Download
                </button>
                <a
                  href={problem.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <ExternalLink size={16} />
                  View
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!loading && problems.length === 0 && !error && (
        <div className="empty-state">
          <Code size={64} className="empty-state-icon" />
          <p>Enter a GitHub username and repository to fetch C++ DSA problems</p>
        </div>
      )}
    </div>
  );
}