import React, { useState, useEffect } from 'react';
import {
  Cloud, Code, Briefcase, Mail, Github, Linkedin, ExternalLink,
  ArrowRight, ArrowLeft, Package, Clock, Star, Loader2, AlertCircle,
  Folder, File, Copy, Check, GitFork, Calendar, FolderOpen, Award,
  Users, BookOpen, Cpu, Database, Globe, Zap, Terminal, Download,
  Search, FileCode
} from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Skills from './Skills.jsx';
import DSAShowcase from './DSAShowCase.jsx';
import DSASection from './DSASection.jsx';
import ContactSection from './ContactSection.jsx';
import Footer from './Footer.jsx';
import HeroSection from './HeroSection.jsx';
// DSA Problems Component
function DSAProblemsGitHub() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [repoName, setRepoName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchCppFiles = async () => {
    if (!username || !repoName) {
      setError('Please enter both username and repository name');
      return;
    }

    setLoading(true);
    setError('');
    setProblems([]);

    try {
      const response = await fetch(
        `https://api.github.com/repos/${username}/${repoName}/git/trees/main?recursive=1`
      );

      if (!response.ok) {
        const masterResponse = await fetch(
          `https://api.github.com/repos/${username}/${repoName}/git/trees/master?recursive=1`
        );
        
        if (!masterResponse.ok) {
          throw new Error('Repository not found or inaccessible');
        }
        
        const masterData = await masterResponse.json();
        processCppFiles(masterData.tree);
      } else {
        const data = await response.json();
        processCppFiles(data.tree);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch repository');
    } finally {
      setLoading(false);
    }
  };

  const processCppFiles = (tree) => {
    const cppFiles = tree.filter(
      item => item.type === 'blob' && item.path.endsWith('.cpp')
    );

    if (cppFiles.length === 0) {
      setError('No C++ files found in this repository');
      return;
    }

    const problemsList = cppFiles.map(file => ({
      name: file.path.split('/').pop().replace('.cpp', ''),
      path: file.path,
      url: file.url,
      downloadUrl: `https://raw.githubusercontent.com/${username}/${repoName}/main/${file.path}`,
      githubUrl: `https://github.com/${username}/${repoName}/blob/main/${file.path}`,
      size: file.size,
      sha: file.sha
    }));

    setProblems(problemsList);
  };

  const downloadFile = async (problem) => {
    try {
      const response = await fetch(problem.downloadUrl);
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
      alert('Failed to download file');
    }
  };

  const filteredProblems = problems.filter(problem =>
    problem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    problem.path.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ 
        background: 'white',
        border: '1px solid #e5e5e5',
        borderRadius: '2px',
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          marginBottom: '1rem'
        }}>
          <div>
            <label style={{ 
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1a1a1a'
            }}>
              GitHub Username
            </label>
            <input
              type="text"
              placeholder="e.g., johnsmith"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #e5e5e5',
                borderRadius: '2px',
                fontSize: '0.95rem'
              }}
            />
          </div>
          <div>
            <label style={{ 
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1a1a1a'
            }}>
              Repository Name
            </label>
            <input
              type="text"
              placeholder="e.g., DSA-Solutions"
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #e5e5e5',
                borderRadius: '2px',
                fontSize: '0.95rem'
              }}
            />
          </div>
        </div>

        <button
          onClick={fetchCppFiles}
          disabled={loading}
          style={{
            width: '100%',
            background: loading ? '#6b6b6b' : '#1a1a1a',
            color: 'white',
            border: 'none',
            padding: '0.875rem',
            borderRadius: '2px',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            fontSize: '0.95rem'
          }}
        >
          {loading ? (
            <>
              <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
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
        <div style={{
          background: '#fee',
          border: '1px solid #fcc',
          borderRadius: '2px',
          padding: '1rem',
          marginBottom: '1.5rem',
          color: '#c00'
        }}>
          {error}
        </div>
      )}

      {problems.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ position: 'relative' }}>
            <Search style={{ 
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#6b6b6b'
            }} size={20} />
            <input
              type="text"
              placeholder="Search problems..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.875rem 1rem 0.875rem 3rem',
                border: '1px solid #e5e5e5',
                borderRadius: '2px',
                fontSize: '0.95rem'
              }}
            />
          </div>
          <p style={{ 
            color: '#6b6b6b',
            fontSize: '0.875rem',
            marginTop: '0.5rem'
          }}>
            Found {filteredProblems.length} C++ file{filteredProblems.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredProblems.map((problem) => (
          <div
            key={problem.sha}
            style={{
              background: 'white',
              border: '1px solid #e5e5e5',
              borderRadius: '2px',
              padding: '1.5rem',
              transition: 'all 0.2s'
            }}
          >
            <div style={{ 
              display: 'flex',
              flexDirection: window.innerWidth < 768 ? 'column' : 'row',
              alignItems: window.innerWidth < 768 ? 'flex-start' : 'center',
              justifyContent: 'space-between',
              gap: '1rem'
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '0.5rem'
                }}>
                  <FileCode size={24} color="#1a1a1a" />
                  <h3 style={{ 
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    fontFamily: "'Crimson Pro', Georgia, serif",
                    color: '#1a1a1a'
                  }}>
                    {problem.name}
                  </h3>
                </div>
                <p style={{ 
                  color: '#6b6b6b',
                  fontSize: '0.875rem',
                  marginBottom: '0.25rem'
                }}>
                  <span style={{ fontWeight: '600' }}>Path:</span> {problem.path}
                </p>
                <p style={{ 
                  color: '#6b6b6b',
                  fontSize: '0.875rem'
                }}>
                  <span style={{ fontWeight: '600' }}>Size:</span> {(problem.size / 1024).toFixed(2)} KB
                </p>
              </div>

              <div style={{ 
                display: 'flex',
                gap: '0.75rem',
                flexWrap: 'wrap'
              }}>
                <button
                  onClick={() => downloadFile(problem)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: '#1a1a1a',
                    color: 'white',
                    border: '1px solid #1a1a1a',
                    padding: '0.625rem 1.25rem',
                    borderRadius: '2px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    fontSize: '0.875rem'
                  }}
                >
                  <Download size={16} />
                  Download
                </button>
                <a
                  href={problem.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'white',
                    color: '#1a1a1a',
                    border: '1px solid #1a1a1a',
                    padding: '0.625rem 1.25rem',
                    borderRadius: '2px',
                    fontWeight: '500',
                    textDecoration: 'none',
                    fontSize: '0.875rem'
                  }}
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
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          color: '#6b6b6b'
        }}>
          <Code size={64} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
          <p style={{ fontSize: '1.125rem' }}>
            Enter a GitHub username and repository to fetch C++ DSA problems
          </p>
        </div>
      )}
    </div>
  );
}

// GitHub Full Project Viewer Component
function GitHubProjectViewer({ username }) {
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);
  const [expandedFolders, setExpandedFolders] = useState(new Set());

  const fetchWithAuth = (url) => {
    const headers = { Accept: "application/vnd.github.v3+json" };
    return fetch(url, { headers });
  };

  useEffect(() => {
    setLoading(true);
    fetchWithAuth(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRepos(data.filter(repo => !repo.fork));
        } else {
          setError("Failed to load repositories");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching repos:", err);
        setError("Failed to load repositories");
        setLoading(false);
      });
  }, [username]);

  const fetchRepoContents = async (repoName, path = "") => {
    const res = await fetchWithAuth(
      `https://api.github.com/repos/${username}/${repoName}/contents/${path}`
    );
    const data = await res.json();
    if (!Array.isArray(data)) return [];

    const result = await Promise.all(
      data.map(async (item) => {
        if (item.type === "dir") {
          const children = await fetchRepoContents(repoName, item.path);
          return { ...item, children };
        }
        return item;
      })
    );
    return result;
  };

  const loadRepoFiles = async (repo) => {
    setSelectedRepo(repo);
    setLoadingFiles(true);
    try {
      const repoFiles = await fetchRepoContents(repo.name);
      setFiles(repoFiles);
      setSelectedFile(null);
      setFileContent("");
    } catch (err) {
      console.error("Error loading files:", err);
    }
    setLoadingFiles(false);
  };

  const openFile = async (file) => {
    try {
      const res = await fetch(file.download_url);
      const text = await res.text();
      setSelectedFile(file);
      setFileContent(text);
    } catch (error) {
      console.error("Error loading file:", error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fileContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleFolder = (path) => {
    setExpandedFolders(prev => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  const getFileLanguage = (filename) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    const langMap = {
      js: 'javascript', jsx: 'jsx', ts: 'typescript', tsx: 'tsx',
      py: 'python', java: 'java', cpp: 'cpp', c: 'c', cs: 'csharp',
      rb: 'ruby', go: 'go', rs: 'rust', php: 'php', swift: 'swift',
      kt: 'kotlin', html: 'html', css: 'css', scss: 'scss', json: 'json',
      xml: 'xml', yml: 'yaml', yaml: 'yaml', md: 'markdown', sh: 'bash',
    };
    return langMap[ext] || 'plaintext';
  };

  const renderTree = (items) =>
    items.map((item) => (
      <div key={item.path} className="tree-item">
        {item.type === "dir" ? (
          <>
            <div 
              className="tree-node folder-node"
              onClick={() => toggleFolder(item.path)}
            >
              {expandedFolders.has(item.path) ? (
                <FolderOpen size={16} className="tree-icon" />
              ) : (
                <Folder size={16} className="tree-icon" />
              )}
              <span>{item.name}</span>
            </div>
            {expandedFolders.has(item.path) && (
              <div className="tree-children">
                {renderTree(item.children)}
              </div>
            )}
          </>
        ) : (
          <div 
            className={`tree-node file-node ${selectedFile?.path === item.path ? 'active' : ''}`}
            onClick={() => openFile(item)}
          >
            <File size={14} className="tree-icon" />
            <span>{item.name}</span>
          </div>
        )}
      </div>
    ));

  if (loading) {
    return (
      <div className="loading-container">
        <Loader2 size={48} className="loading-spinner" />
        <p>Loading repositories from GitHub...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <AlertCircle size={48} />
        <p>{error}</p>
      </div>
    );
  }

  if (!selectedRepo) {
    return (
      <div className="github-repos-grid">
        {repos.map((repo) => (
          <div
            key={repo.id}
            className="github-repo-card"
            onClick={() => loadRepoFiles(repo)}
          >
            <div className="repo-header">
              <h3 className="repo-name">{repo.name}</h3>
            </div>
            <p className="repo-description">
              {repo.description || "No description available."}
            </p>
            <div className="repo-stats">
              <div className="stat-item">
                <Star size={14} />
                <span>{repo.stargazers_count}</span>
              </div>
              <div className="stat-item">
                <GitFork size={14} />
                <span>{repo.forks_count}</span>
              </div>
            </div>
            <div className="repo-footer">
              {repo.language && (
                <div className="repo-language">
                  <div className="language-dot" />
                  <span>{repo.language}</span>
                </div>
              )}
              <button className="view-code-btn">
                View Code <ExternalLink size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="project-viewer">
      <button onClick={() => setSelectedRepo(null)} className="back-to-repos-btn">
        <ArrowLeft size={18} /> Back to Repositories
      </button>

      <div className="project-detail-container">
        <div className="project-detail-header">
          <h1 className="project-detail-title">{selectedRepo.name}</h1>
          <p className="project-detail-description">
            {selectedRepo.description || "No description provided."}
          </p>
          <div className="project-detail-meta">
            <div className="meta-item">
              <Star size={16} />
              <span>{selectedRepo.stargazers_count} stars</span>
            </div>
            <div className="meta-item">
              <GitFork size={16} />
              <span>{selectedRepo.forks_count} forks</span>
            </div>
            <div className="meta-item">
              <Calendar size={16} />
              <span>Updated {new Date(selectedRepo.updated_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="project-detail-content">
          <div className="file-sidebar">
            <div className="sidebar-title">
              <Code size={16} />
              <span>Files</span>
            </div>
            {loadingFiles ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <Loader2 size={24} className="loading-spinner" />
              </div>
            ) : (
              <div className="file-tree">{renderTree(files)}</div>
            )}
          </div>

          <div className="file-content-area">
            {selectedFile ? (
              <div className="file-viewer">
                <div className="file-viewer-header">
                  <div className="file-title">
                    <File size={18} />
                    <span>{selectedFile.name}</span>
                  </div>
                  <button 
                    onClick={copyToClipboard} 
                    className={`copy-code-btn ${copied ? 'copied' : ''}`}
                  >
                    {copied ? (
                      <>
                        <Check size={16} /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={16} /> Copy Code
                      </>
                    )}
                  </button>
                </div>
                <div className="code-viewer-container">
                  <SyntaxHighlighter 
                    language={getFileLanguage(selectedFile.name)}
                    style={vscDarkPlus}
                    showLineNumbers={true}
                    wrapLines={true}
                    customStyle={{
                      margin: 0,
                      borderRadius: '2px',
                      fontSize: '0.875rem',
                      maxHeight: '600px',
                    }}
                  >
                    {fileContent}
                  </SyntaxHighlighter>
                </div>
              </div>
            ) : (
              <div className="empty-file-state">
                <Code size={64} />
                <p>Select a file to view its contents</p>
              </div>
            )}
          </div>
        </div>

        <div className="project-detail-footer">
          <a
            href={selectedRepo.html_url}
            target="_blank"
            rel="noreferrer"
            className="github-external-link"
          >
            <Github size={18} />
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

// Main Portfolio Component
export default function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('featured');
  const username = "bbaskey2026";

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const featuredProjects = [
    {
      id: 1,
      title: 'XWeather - Real-time Weather App',
      description: 'A comprehensive weather application with real-time data, geolocation support, and beautiful UI with city insights.',
      image: 'https://images.unsplash.com/photo-1534274988757-a28bf1a4c817?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      tech: ['React', 'Node.js', 'Express', 'OpenWeather API', 'Wikipedia API'],
      github: 'https://github.com/yourusername/xweather',
      live: 'https://xweather-demo.com',
    },
    {
      id: 2,
      title: 'E-Commerce Platform',
      description: 'A full-featured online shopping platform with cart management, payment integration, and admin dashboard.',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
      github: 'https://github.com/yourusername/ecommerce',
      live: 'https://ecommerce-demo.com',
    },
    {
      id: 3,
      title: 'Task Management System',
      description: 'A collaborative project management tool with real-time updates, team collaboration, and progress tracking.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      tech: ['React', 'Node.js', 'Socket.io', 'PostgreSQL', 'TypeScript'],
      github: 'https://github.com/yourusername/taskmanager',
      live: 'https://taskmanager-demo.com',
    }
  ];

  const stats = [
    { icon: <Code size={32} />, value: '50+', label: 'Projects Completed' },
    { icon: <Users size={32} />, value: '30+', label: 'Happy Clients' },
    { icon: <Award size={32} />, value: '5+', label: 'Years Experience' },
    { icon: <BookOpen size={32} />, value: '100+', label: 'GitHub Repos' }
  ];

  return (
    <div className="portfolio-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .portfolio-page {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
             background:   #ffffffff;
          color: #000000ff;
        }

        .navbar {
          position: sticky;
          top: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid #e5e5e5;
          padding: 1.25rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 1000;
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .logo-text {
          font-family: 'Crimson Pro', Georgia, serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a1a1a;
        }

        .nav-center {
          display: flex;
          gap: 2rem;
        }

        .nav-link {
          color: #6b6b6b;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
          font-size: 0.95rem;
        }

        .nav-link:hover {
          color: #1a1a1a;
        }

        .time-display {
          font-family: 'Inter', monospace;
          color: #6b6b6b;
          font-size: 0.9rem;
          padding: 0.5rem 1rem;
          border: 1px solid #e5e5e5;
          border-radius: 2px;
        }

        .hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
         
          padding: 6rem 2rem;
          max-width: 1400px;
          margin: 0 auto;
          align-items: center;
        }

        .hero-title {
          font-family: 'Crimson Pro', Georgia, serif;
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }

        .hero-subtitle {
          font-size: 1.5rem;
          color: #001168ff;
          margin-bottom: 1.5rem;
          font-weight: 400;
        }

        .hero-description {
          font-size: 1.125rem;
          line-height: 1.7;
          color: #000000ff;
          margin-bottom: 2rem;
        }

        .hero-button {
          background: #1a1a1a;
          color: white;
          border: 1px solid #1a1a1a;
          padding: 0.875rem 2rem;
          border-radius: 2px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1rem;
        }

        .hero-button:hover {
          background: #000000;
          transform: translateX(4px);
        }

        .resume-button {
          background: white;
          color: #1a1a1a;
          border: 1px solid #1a1a1a;
          padding: 0.875rem 2rem;
          border-radius: 2px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1rem;
        }

        .resume-button:hover {
          background: #fafafa;
          transform: translateY(-2px);
        }

        .hero-image {
          display: flex;
          justify-content: center;
        }

        .image-placeholder {
        
       
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stats-section {
          padding: 4rem 2rem;
          background: #fafafa;
          border-top: 1px solid #e5e5e5;
          border-bottom: 1px solid #e5e5e5;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 3rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .stat-card {
          text-align: center;
          padding: 2rem;
          background: white;
          border: 1px solid #e5e5e5;
          border-radius: 2px;
          transition: all 0.3s;
        }

        .stat-card:hover {
          border-color: #1a1a1a;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
          transform: translateY(-4px);
        }

        .stat-icon {
          margin-bottom: 1rem;
          color: #1a1a1a;
        }

        .stat-value {
          font-family: 'Crimson Pro', Georgia, serif;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          color: #6b6b6b;
          font-size: 0.95rem;
        }

        .section-title {
          font-family: 'Crimson Pro', Georgia, serif;
          font-size: 2.5rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .section-subtitle {
          text-align: center;
          color: #6b6b6b;
          font-size: 1.125rem;
          margin-bottom: 3rem;
          line-height: 1.7;
        }

        .projects-section {
          padding: 6rem 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .project-tabs {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .tab-button {
          padding: 0.75rem 2rem;
          border: 1px solid #e5e5e5;
          background: white;
          color: #6b6b6b;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          border-radius: 2px;
          font-size: 0.95rem;
        }

        .tab-button.active {
          background: #1a1a1a;
          color: white;
          border-color: #1a1a1a;
        }

        .tab-button:hover:not(.active) {
          border-color: #1a1a1a;
          color: #1a1a1a;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 2rem;
        }

        .project-card {
          background: white;
          border: 1px solid #e5e5e5;
          border-radius: 2px;
          overflow: hidden;
          transition: all 0.3s;
        }

        .project-card:hover {
          border-color: #1a1a1a;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
          transform: translateY(-4px);
        }

        .project-image {
          position: relative;
          overflow: hidden;
        }

        .project-image img {
          width: 100%;
          height: 250px;
          object-fit: cover;
          transition: transform 0.3s;
        }

        .project-card:hover .project-image img {
          transform: scale(1.05);
        }

        .project-content {
          padding: 2rem;
        }

        .project-title {
          font-family: 'Crimson Pro', Georgia, serif;
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .project-description {
          color: #6b6b6b;
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }

        .project-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .tech-tag {
          padding: 0.375rem 0.75rem;
          background: #f5f5f5;
          border: 1px solid #e5e5e5;
          font-size: 0.875rem;
          border-radius: 2px;
          color: #1a1a1a;
        }

        .project-links {
          display: flex;
          gap: 1rem;
        }

        .project-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1.25rem;
          background: #1a1a1a;
          color: white;
          text-decoration: none;
          border: 1px solid #1a1a1a;
          border-radius: 2px;
          font-weight: 500;
          font-size: 0.875rem;
          transition: all 0.2s;
        }

        .project-link:hover {
          background: #000000;
        }

        .project-link.secondary {
          background: white;
          color: #1a1a1a;
        }

        .project-link.secondary:hover {
          background: #fafafa;
        }

        .github-repos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
        }

        .github-repo-card {
          background: white;
          border: 1px solid #e5e5e5;
          border-radius: 2px;
          padding: 2rem;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .github-repo-card:hover {
          border-color: #1a1a1a;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
          transform: translateY(-4px);
        }

        .repo-header {
          display: flex;
          align-items: start;
          justify-content: space-between;
        }

        .repo-name {
          font-family: 'Crimson Pro', Georgia, serif;
          font-size: 1.25rem;
          font-weight: 600;
          color: #1a1a1a;
          flex: 1;
        }

        .repo-description {
          color: #6b6b6b;
          line-height: 1.6;
          flex: 1;
          font-size: 0.95rem;
        }

        .repo-stats {
          display: flex;
          gap: 1.5rem;
          font-size: 0.875rem;
          color: #6b6b6b;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 0.375rem;
        }

        .repo-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          border-top: 1px solid #e5e5e5;
        }

        .repo-language {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: #6b6b6b;
        }

        .language-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #1a1a1a;
        }

        .view-code-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: #1a1a1a;
          color: white;
          border: 1px solid #1a1a1a;
          border-radius: 2px;
          font-weight: 500;
          cursor: pointer;
          font-size: 0.875rem;
          transition: all 0.2s;
        }

        .view-code-btn:hover {
          background: #000000;
        }

        .project-viewer {
          max-width: 1400px;
          margin: 0 auto;
        }

        .back-to-repos-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: #ffffff;
          color: #1a1a1a;
          border: 1px solid #1a1a1a;
          border-radius: 2px;
          font-weight: 500;
          cursor: pointer;
          margin-bottom: 2rem;
          transition: all 0.2s;
        }

        .back-to-repos-btn:hover {
          background: #1a1a1a;
          color: #ffffff;
        }

        .project-detail-container {
          background: white;
          border: 1px solid #e5e5e5;
          border-radius: 2px;
          overflow: hidden;
        }

        .project-detail-header {
          padding: 3rem 2rem;
          background: #1a1a1a;
          color: white;
          border-bottom: 1px solid #000000;
        }

        .project-detail-title {
          font-family: 'Crimson Pro', Georgia, serif;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .project-detail-description {
          font-size: 1.125rem;
          opacity: 0.9;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .project-detail-meta {
          display: flex;
          gap: 2rem;
          font-size: 0.95rem;
          opacity: 0.8;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .project-detail-content {
          display: grid;
          grid-template-columns: 280px 1fr;
          min-height: 600px;
        }

        .file-sidebar {
          border-right: 1px solid #e5e5e5;
          background: #fafafa;
          padding: 1.5rem;
          overflow-y: auto;
          max-height: 80vh;
        }

        .sidebar-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #1a1a1a;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .file-tree {
          font-size: 0.875rem;
        }

        .tree-item {
          margin-left: 0.5rem;
        }

        .tree-node {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.15s ease;
          user-select: none;
        }

        .tree-node:hover {
          background: #f0f0f0;
        }

        .tree-node.active {
          background: #1a1a1a;
          color: white;
        }

        .tree-icon {
          flex-shrink: 0;
        }

        .tree-children {
          margin-left: 1rem;
        }

        .folder-node {
          font-weight: 500;
          color: #1a1a1a;
        }

        .file-node {
          color: #6b6b6b;
          font-weight: 400;
        }

        .file-content-area {
          padding: 1.5rem;
          overflow-y: auto;
          max-height: 80vh;
          background: #ffffff;
        }

        .empty-file-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          min-height: 400px;
          color: #9b9b9b;
          gap: 1rem;
        }

        .file-viewer {
          height: 100%;
        }

        .file-viewer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e5e5e5;
        }

        .file-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.125rem;
          font-weight: 600;
          color: #1a1a1a;
          font-family: 'Crimson Pro', Georgia, serif;
        }

        .copy-code-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1.25rem;
          background: #1a1a1a;
          color: white;
          border: 1px solid #1a1a1a;
          border-radius: 2px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.875rem;
        }

        .copy-code-btn:hover {
          background: #000000;
        }

        .copy-code-btn.copied {
          background: #4a4a4a;
          border-color: #4a4a4a;
        }

        .code-viewer-container {
          border: 1px solid #e5e5e5;
          border-radius: 2px;
          overflow: hidden;
        }

        .project-detail-footer {
          padding: 1.5rem 2rem;
          border-top: 1px solid #e5e5e5;
          display: flex;
          justify-content: flex-end;
          background: #fafafa;
        }

        .github-external-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: #1a1a1a;
          color: white;
          text-decoration: none;
          border: 1px solid #1a1a1a;
          border-radius: 2px;
          font-weight: 500;
          transition: all 0.2s;
        }

        .github-external-link:hover {
          background: #000000;
        }

        .loading-container, .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          color: #1a1a1a;
          gap: 1rem;
        }

        .loading-spinner {
          animation: spin 1s linear infinite;
          color: #1a1a1a;
        }

        .contact-section {
          padding: 6rem 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .contact-box {
          background: #fff700ff;
          border: 1px solid #0953bbff;
          padding: 4rem 3rem;
          border-radius: 2px;
          text-align: center;
        }

        .contact-description {
          font-size: 1.125rem;
          color: #6b6b6b;
          margin-bottom: 2.5rem;
          line-height: 1.7;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .contact-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .contact-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 1.75rem;
          background: #1a1a1a;
          color: white;
          border: 1px solid #1a1a1a;
          border-radius: 2px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .contact-button:hover {
          background: #000000;
          transform: translateY(-2px);
        }

        .footer {
          background: #1a1a1a;
          color: white;
          padding: 3rem 2rem;
          text-align: center;
          border-top: 1px solid #000000;
        }

        .footer-content {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-links {
          display: flex;
          gap: 2rem;
        }

        .footer-links a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer-links a:hover {
          color: white;
        }

        @media (max-width: 1024px) {
          .project-detail-content {
            grid-template-columns: 1fr;
          }

          .file-sidebar {
            border-right: none;
            border-bottom: 1px solid #e5e5e5;
            max-height: 300px;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .hero {
            grid-template-columns: 1fr;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .projects-grid, .github-repos-grid {
            grid-template-columns: 1fr;
          }

          .nav-center {
            display: none;
          }

          .footer-content {
            flex-direction: column;
            gap: 1rem;
          }

          .section-title {
            font-size: 2rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .image-placeholder {
            width: 100%;
            height: 300px;
          }
        }
      `}</style>

      <nav className="navbar">
        <div className="logo-section">
          <Cloud className="logo-icon" />
          <h1 className="logo-text">DevPortfolio</h1>
        </div>
        <div className="nav-center">
          <a href="#about" className="nav-link">About</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
        <div className="time-display">
          {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
        </div>
      </nav>

 <HeroSection></HeroSection>






      

<Skills></Skills>

<DSASection></DSASection>
      <section id="projects" className="projects-section">
        <h2 className="section-title">My Projects</h2>
        <p className="section-subtitle">
          A collection of my work, from featured projects to DSA solutions
        </p>
        
        <div className="project-tabs">
          <button 
            className={`tab-button ${activeTab === 'featured' ? 'active' : ''}`}
            onClick={() => setActiveTab('featured')}
          >
            Featured Projects
          </button>
          <button 
            className={`tab-button ${activeTab === 'github' ? 'active' : ''}`}
            onClick={() => setActiveTab('github')}
          >
            GitHub Repositories
          </button>
          <button 
            className={`tab-button ${activeTab === 'dsa' ? 'active' : ''}`}
            onClick={() => setActiveTab('dsa')}
          >
            DSA Problems (C++)
          </button>
        </div>

        {activeTab === 'featured' && (
          <div className="projects-grid">
            {featuredProjects.map((project) => (
              <div key={project.id} className="project-card">
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
                  <div className="project-links">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                      <Github size={16} /> GitHub
                    </a>
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link secondary">
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'github' && <GitHubProjectViewer username={username} />}
        {activeTab === 'dsa' && <DSAProblemsGitHub />}
      </section>

     <ContactSection />

     <Footer></Footer>
    </div>
  );
}