import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Star,
  GitFork,
  Calendar,
  Loader2,
  AlertCircle,
  Folder,
  FolderOpen,
  File,
  Code,
  Copy,
  Check,
  ExternalLink,
  Github,
  Eye,
  Search,
  RefreshCw,
  ChevronRight,
  FileCode,
  FileText,
  FileJson,
  Image,
  Settings,
  Package,
  BookOpen,
  Zap,
  Filter,
  SortAsc,
  Grid3X3,
  List,
  Download,
  Share2,
  Clock,
  Tag,
  GitBranch,
  Terminal,
  Sparkles
} from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Helper functions
const getFileLanguage = (filename) => {
  const ext = filename.split('.').pop()?.toLowerCase();
  const langMap = {
    js: 'javascript', jsx: 'jsx', ts: 'typescript', tsx: 'tsx',
    py: 'python', java: 'java', cpp: 'cpp', c: 'c', cs: 'csharp',
    rb: 'ruby', go: 'go', rs: 'rust', php: 'php', swift: 'swift',
    kt: 'kotlin', html: 'html', css: 'css', scss: 'scss', json: 'json',
    xml: 'xml', yml: 'yaml', yaml: 'yaml', md: 'markdown', sh: 'bash',
    sql: 'sql', graphql: 'graphql', vue: 'vue', svelte: 'svelte'
  };
  return langMap[ext] || 'plaintext';
};

const fetchWithAuth = (url) => {
  const headers = { Accept: 'application/vnd.github.v3+json' };
  return fetch(url, { headers });
};

const getFileIcon = (filename) => {
  const ext = filename.split('.').pop()?.toLowerCase();
  const iconMap = {
    js: <FileCode size={14} style={{ color: '#f7df1e' }} />,
    jsx: <FileCode size={14} style={{ color: '#61dafb' }} />,
    ts: <FileCode size={14} style={{ color: '#3178c6' }} />,
    tsx: <FileCode size={14} style={{ color: '#3178c6' }} />,
    py: <FileCode size={14} style={{ color: '#3572A5' }} />,
    java: <FileCode size={14} style={{ color: '#b07219' }} />,
    cpp: <FileCode size={14} style={{ color: '#f34b7d' }} />,
    c: <FileCode size={14} style={{ color: '#555555' }} />,
    html: <FileCode size={14} style={{ color: '#e34c26' }} />,
    css: <FileCode size={14} style={{ color: '#563d7c' }} />,
    json: <FileJson size={14} style={{ color: '#cbcb41' }} />,
    md: <BookOpen size={14} style={{ color: '#083fa1' }} />,
    png: <Image size={14} style={{ color: '#a074c4' }} />,
    jpg: <Image size={14} style={{ color: '#a074c4' }} />,
    svg: <Image size={14} style={{ color: '#ffb13b' }} />,
    yml: <Settings size={14} style={{ color: '#cb171e' }} />,
    yaml: <Settings size={14} style={{ color: '#cb171e' }} />,
    lock: <Package size={14} style={{ color: '#8b5cf6' }} />,
  };
  return iconMap[ext] || <File size={14} style={{ color: 'rgba(255,255,255,0.5)' }} />;
};

const getLanguageColor = (language) => {
  const colors = {
    JavaScript: '#f7df1e',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    Java: '#b07219',
    'C++': '#f34b7d',
    C: '#555555',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Ruby: '#701516',
    Go: '#00ADD8',
    Rust: '#dea584',
    PHP: '#4F5D95',
    Swift: '#ffac45',
    Kotlin: '#A97BFF',
    Vue: '#41b883',
    default: '#8b5cf6'
  };
  return colors[language] || colors.default;
};

export default function GitHubProjectViewer({ username }) {
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [loadingContent, setLoadingContent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);
  const [expandedFolders, setExpandedFolders] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('updated');
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

  useEffect(() => {
    fetchRepositories();
  }, [username]);

  const fetchRepositories = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetchWithAuth(
        `https://api.github.com/users/${username}/repos?sort=${sortBy}&per_page=100`
      );

      if (!res.ok) throw new Error('Failed to fetch repositories');
      
      const data = await res.json();
      
      if (Array.isArray(data)) {
        setRepos(data.filter((repo) => !repo.fork));
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Error fetching repos:', err);
      setError(err.message || 'Failed to load repositories');
    } finally {
      setLoading(false);
    }
  };

  const fetchRepoContents = async (repoName, path = '') => {
    try {
      const res = await fetchWithAuth(
        `https://api.github.com/repos/${username}/${repoName}/contents/${path}`
      );

      if (!res.ok) {
        console.error(`Failed to fetch contents for ${path}`);
        return [];
      }

      const data = await res.json();
      if (!Array.isArray(data)) return [];

      // Sort: folders first, then files alphabetically
      const sorted = data.sort((a, b) => {
        if (a.type === 'dir' && b.type !== 'dir') return -1;
        if (a.type !== 'dir' && b.type === 'dir') return 1;
        return a.name.localeCompare(b.name);
      });

      const result = await Promise.all(
        sorted.map(async (item) => {
          if (item.type === 'dir') {
            const children = await fetchRepoContents(repoName, item.path);
            return { ...item, children };
          }
          return item;
        })
      );
      return result;
    } catch (err) {
      console.error('Error fetching repo contents:', err);
      return [];
    }
  };

  const loadRepoFiles = async (repo) => {
    setSelectedRepo(repo);
    setLoadingFiles(true);
    setSelectedFile(null);
    setFileContent('');
    setExpandedFolders(new Set());

    try {
      const repoFiles = await fetchRepoContents(repo.name);
      setFiles(repoFiles);
    } catch (err) {
      console.error('Error loading files:', err);
      setFiles([]);
    }
    setLoadingFiles(false);
  };

  const openFile = async (file) => {
    if (!file.download_url) {
      console.error('No download URL for file');
      return;
    }

    setLoadingContent(true);
    setSelectedFile(file);

    try {
      const res = await fetch(file.download_url);
      if (!res.ok) throw new Error('Failed to fetch file content');
      const text = await res.text();
      setFileContent(text);
    } catch (error) {
      console.error('Error loading file:', error);
      setFileContent('// Error loading file content');
    } finally {
      setLoadingContent(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fileContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadFile = () => {
    if (!selectedFile || !fileContent) return;
    
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = selectedFile.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const toggleFolder = (path) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  const filteredRepos = repos.filter(repo =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const renderTree = (items, level = 0) => {
    if (!items || items.length === 0) return null;

    return items.map((item) => (
      <div key={item.path} className="tree-item" style={{ '--level': level }}>
        {item.type === 'dir' ? (
          <>
            <div
              className={`tree-node folder-node ${expandedFolders.has(item.path) ? 'expanded' : ''}`}
              onClick={() => toggleFolder(item.path)}
            >
              <ChevronRight 
                size={14} 
                className={`folder-chevron ${expandedFolders.has(item.path) ? 'rotated' : ''}`}
              />
              {expandedFolders.has(item.path) ? (
                <FolderOpen size={16} className="folder-icon open" />
              ) : (
                <Folder size={16} className="folder-icon" />
              )}
              <span className="node-name">{item.name}</span>
              {item.children && (
                <span className="item-count">{item.children.length}</span>
              )}
            </div>
            <div className={`tree-children ${expandedFolders.has(item.path) ? 'expanded' : ''}`}>
              {expandedFolders.has(item.path) && item.children && (
                renderTree(item.children, level + 1)
              )}
            </div>
          </>
        ) : (
          <div
            className={`tree-node file-node ${selectedFile?.path === item.path ? 'active' : ''}`}
            onClick={() => openFile(item)}
          >
            <span className="file-icon-wrapper">
              {getFileIcon(item.name)}
            </span>
            <span className="node-name">{item.name}</span>
            <span className="file-size">
              {item.size > 1024 ? `${(item.size / 1024).toFixed(1)}KB` : `${item.size}B`}
            </span>
          </div>
        )}
      </div>
    ));
  };

  const getLineCount = () => {
    return fileContent.split('\n').length;
  };

  return (
    <>
      <style>{`
        .github-viewer {
          position: relative;
          min-height: 500px;
        }

        /* Loading State */
        .viewer-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          gap: 1.5rem;
        }

        .loading-spinner {
          animation: spin 1s linear infinite;
          color: #8b5cf6;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .loading-text {
          color: rgba(255, 255, 255, 0.5);
          font-size: 1rem;
        }

        .loading-progress {
          width: 200px;
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
          overflow: hidden;
        }

        .loading-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #667eea, #764ba2);
          animation: progress 1.5s ease-in-out infinite;
        }

        @keyframes progress {
          0% { width: 0%; transform: translateX(0); }
          50% { width: 100%; }
          100% { width: 0%; transform: translateX(200px); }
        }

        /* Error State */
        .viewer-error {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          gap: 1.5rem;
          text-align: center;
        }

        .error-icon {
          width: 80px;
          height: 80px;
          background: rgba(239, 68, 68, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ef4444;
        }

        .error-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #ffffff;
        }

        .error-message {
          color: rgba(255, 255, 255, 0.5);
          max-width: 400px;
        }

        .retry-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .retry-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }

        /* Repository List View */
        .repos-container {
          opacity: 0;
          animation: fadeIn 0.6s ease-out forwards;
        }

        @keyframes fadeIn {
          to { opacity: 1; }
        }

        /* Search and Controls */
        .repos-controls {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .search-wrapper {
          flex: 1;
          min-width: 250px;
          position: relative;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.3);
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          padding: 0.875rem 1rem 0.875rem 3rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          color: #ffffff;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          outline: none;
        }

        .search-input::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }

        .search-input:focus {
          background: rgba(255, 255, 255, 0.05);
          border-color: #8b5cf6;
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
        }

        .control-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .control-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          color: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .control-btn:hover,
        .control-btn.active {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
          color: #ffffff;
        }

        .repos-count {
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.875rem;
          margin-bottom: 1.5rem;
        }

        /* Repository Grid */
        .repos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        .repos-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        /* Repository Card */
        .repo-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          padding: 1.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          position: relative;
          overflow: hidden;
        }

        .repo-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .repo-card:hover {
          transform: translateY(-5px);
          border-color: rgba(255, 255, 255, 0.15);
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.3),
            0 0 60px rgba(139, 92, 246, 0.1);
        }

        .repo-card:hover::before {
          opacity: 1;
        }

        .repo-card-header {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          position: relative;
          z-index: 1;
        }

        .repo-icon {
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #8b5cf6;
          flex-shrink: 0;
        }

        .repo-info {
          flex: 1;
          min-width: 0;
        }

        .repo-name {
          font-size: 1.125rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 0.25rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .repo-visibility {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.25rem 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .repo-description {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.9rem;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          position: relative;
          z-index: 1;
        }

        .repo-topics {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          position: relative;
          z-index: 1;
        }

        .repo-topic {
          padding: 0.25rem 0.625rem;
          background: rgba(139, 92, 246, 0.15);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 20px;
          font-size: 0.75rem;
          color: #a78bfa;
        }

        .repo-meta {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }

        .repo-stat {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.8rem;
        }

        .repo-stat svg {
          color: rgba(255, 255, 255, 0.3);
        }

        .repo-language {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-left: auto;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .language-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .repo-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          position: relative;
          z-index: 1;
        }

        .repo-updated {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.75rem;
        }

        .view-repo-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 8px;
          color: white;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .view-repo-btn:hover {
          box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
          transform: scale(1.05);
        }

        /* Project Detail View */
        .project-detail {
          opacity: 0;
          animation: slideIn 0.4s ease-out forwards;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .back-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 1.5rem;
        }

        .back-button:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
          color: #ffffff;
          transform: translateX(-5px);
        }

        .detail-container {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 20px;
          overflow: hidden;
        }

        /* Detail Header */
        .detail-header {
          padding: 2rem;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.1) 100%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .detail-header-content {
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
        }

        .detail-icon {
          width: 64px;
          height: 64px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #8b5cf6;
          flex-shrink: 0;
        }

        .detail-info {
          flex: 1;
        }

        .detail-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .detail-title .visibility-badge {
          padding: 0.25rem 0.75rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 500;
          text-transform: uppercase;
        }

        .detail-description {
          color: rgba(255, 255, 255, 0.6);
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 1.25rem;
        }

        .detail-stats {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .detail-stat {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.875rem;
        }

        .detail-stat svg {
          color: rgba(255, 255, 255, 0.5);
        }

        .detail-actions {
          display: flex;
          gap: 0.75rem;
          margin-left: auto;
        }

        .detail-action-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 500;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .detail-action-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          color: #ffffff;
        }

        .detail-action-btn.primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-color: transparent;
          color: white;
        }

        .detail-action-btn.primary:hover {
          box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
        }

        /* Content Area */
        .detail-content {
          display: grid;
          grid-template-columns: 300px 1fr;
          min-height: 500px;
        }

        /* File Sidebar */
        .file-sidebar {
          background: rgba(0, 0, 0, 0.2);
          border-right: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          flex-direction: column;
        }

        .sidebar-header {
          padding: 1rem 1.25rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .sidebar-header svg {
          color: #8b5cf6;
        }

        .file-tree-container {
          flex: 1;
          overflow-y: auto;
          padding: 0.75rem;
        }

        .file-tree-container::-webkit-scrollbar {
          width: 6px;
        }

        .file-tree-container::-webkit-scrollbar-track {
          background: transparent;
        }

        .file-tree-container::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }

        .file-tree-container::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        /* Tree Styles */
        .tree-item {
          margin-left: calc(var(--level, 0) * 0.75rem);
        }

        .tree-node {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.75rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          user-select: none;
        }

        .tree-node:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .folder-node {
          color: rgba(255, 255, 255, 0.8);
          font-weight: 500;
        }

        .folder-chevron {
          color: rgba(255, 255, 255, 0.3);
          transition: transform 0.2s ease;
          flex-shrink: 0;
        }

        .folder-chevron.rotated {
          transform: rotate(90deg);
        }

        .folder-icon {
          color: #fbbf24;
          flex-shrink: 0;
        }

        .folder-icon.open {
          color: #f59e0b;
        }

        .file-node {
          color: rgba(255, 255, 255, 0.6);
          padding-left: 1.5rem;
        }

        .file-node:hover {
          color: rgba(255, 255, 255, 0.9);
        }

        .file-node.active {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(59, 130, 246, 0.15) 100%);
          color: #ffffff;
        }

        .file-icon-wrapper {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .node-name {
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 0.875rem;
        }

        .item-count {
          padding: 0.125rem 0.375rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .file-size {
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.3);
        }

        .tree-children {
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transition: all 0.3s ease;
        }

        .tree-children.expanded {
          max-height: 9999px;
          opacity: 1;
        }

        /* File Content Area */
        .file-content-area {
          display: flex;
          flex-direction: column;
          background: #0d0d0d;
        }

        .content-empty {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          color: rgba(255, 255, 255, 0.3);
        }

        .content-empty svg {
          opacity: 0.3;
        }

        .content-empty p {
          font-size: 1rem;
        }

        /* File Viewer */
        .file-viewer {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .file-viewer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          background: rgba(255, 255, 255, 0.02);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          flex-wrap: wrap;
          gap: 1rem;
        }

        .file-viewer-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .file-viewer-icon {
          width: 36px;
          height: 36px;
          background: rgba(139, 92, 246, 0.15);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .file-viewer-info h3 {
          font-size: 1rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 0.125rem;
        }

        .file-viewer-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.4);
        }

        .file-viewer-actions {
          display: flex;
          gap: 0.5rem;
        }

        .file-action-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .file-action-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
        }

        .file-action-btn.copied {
          background: rgba(16, 185, 129, 0.2);
          border-color: rgba(16, 185, 129, 0.4);
          color: #10b981;
        }

        .code-container {
          flex: 1;
          overflow: auto;
          position: relative;
        }

        .code-loading {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.5);
          z-index: 10;
        }

        /* Detail Footer */
        .detail-footer {
          padding: 1.25rem 1.5rem;
          background: rgba(255, 255, 255, 0.02);
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .footer-info {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.4);
        }

        .footer-info span {
          display: flex;
          align-items: center;
          gap: 0.375rem;
        }

        .github-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 10px;
          color: white;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .github-link:hover {
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
          transform: translateY(-2px);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .detail-content {
            grid-template-columns: 1fr;
          }

          .file-sidebar {
            border-right: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
            max-height: 300px;
          }

          .detail-header-content {
            flex-wrap: wrap;
          }

          .detail-actions {
            width: 100%;
            margin-top: 1rem;
            margin-left: 0;
          }
        }

        @media (max-width: 768px) {
          .repos-controls {
            flex-direction: column;
          }

          .repos-grid {
            grid-template-columns: 1fr;
          }

          .detail-header {
            padding: 1.5rem;
          }

          .detail-title {
            font-size: 1.25rem;
            flex-wrap: wrap;
          }

          .detail-stats {
            gap: 0.75rem;
          }

          .detail-stat {
            padding: 0.375rem 0.75rem;
            font-size: 0.75rem;
          }

          .file-viewer-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .file-viewer-actions {
            width: 100%;
            justify-content: flex-end;
          }
        }

        @media (max-width: 480px) {
          .repo-card {
            padding: 1.25rem;
          }

          .repo-card-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .control-buttons {
            display: none;
          }

          .file-action-btn span {
            display: none;
          }

          .file-action-btn {
            padding: 0.5rem;
          }
        }
      `}</style>

      <div className="github-viewer" ref={sectionRef}>
        {loading ? (
          <div className="viewer-loading">
            <Loader2 size={48} className="loading-spinner" />
            <p className="loading-text">Loading repositories from GitHub...</p>
            <div className="loading-progress">
              <div className="loading-progress-bar" />
            </div>
          </div>
        ) : error ? (
          <div className="viewer-error">
            <div className="error-icon">
              <AlertCircle size={32} />
            </div>
            <h3 className="error-title">Failed to load repositories</h3>
            <p className="error-message">{error}</p>
            <button className="retry-button" onClick={fetchRepositories}>
              <RefreshCw size={18} />
              Try Again
            </button>
          </div>
        ) : !selectedRepo ? (
          <div className="repos-container">
            {/* Controls */}
            <div className="repos-controls">
              <div className="search-wrapper">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search repositories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="control-buttons">
                <button
                  className={`control-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Grid view"
                >
                  <Grid3X3 size={18} />
                </button>
                <button
                  className={`control-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  title="List view"
                >
                  <List size={18} />
                </button>
                <button
                  className="control-btn"
                  onClick={fetchRepositories}
                  title="Refresh"
                >
                  <RefreshCw size={18} />
                </button>
              </div>
            </div>

            <p className="repos-count">
              Showing {filteredRepos.length} of {repos.length} repositories
            </p>

            {/* Repository Grid/List */}
            <div className={viewMode === 'grid' ? 'repos-grid' : 'repos-list'}>
              {filteredRepos.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', gridColumn: '1 / -1' }}>
                  <Code size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                  <p style={{ color: 'rgba(255,255,255,0.5)' }}>No repositories found</p>
                </div>
              ) : (
                filteredRepos.map((repo, index) => (
                  <div
                    key={repo.id}
                    className="repo-card"
                    onClick={() => loadRepoFiles(repo)}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="repo-card-header">
                      <div className="repo-icon">
                        <Folder size={24} />
                      </div>
                      <div className="repo-info">
                        <h3 className="repo-name">{repo.name}</h3>
                        <span className="repo-visibility">
                          {repo.private ? '🔒 Private' : '🌐 Public'}
                        </span>
                      </div>
                    </div>

                    <p className="repo-description">
                      {repo.description || 'No description available.'}
                    </p>

                    {repo.topics && repo.topics.length > 0 && (
                      <div className="repo-topics">
                        {repo.topics.slice(0, 3).map((topic, i) => (
                          <span key={i} className="repo-topic">{topic}</span>
                        ))}
                      </div>
                    )}

                    <div className="repo-meta">
                      <span className="repo-stat">
                        <Star size={14} />
                        {repo.stargazers_count}
                      </span>
                      <span className="repo-stat">
                        <GitFork size={14} />
                        {repo.forks_count}
                      </span>
                      <span className="repo-stat">
                        <Eye size={14} />
                        {repo.watchers_count}
                      </span>
                      {repo.language && (
                        <span className="repo-language">
                          <span 
                            className="language-dot" 
                            style={{ background: getLanguageColor(repo.language) }}
                          />
                          {repo.language}
                        </span>
                      )}
                    </div>

                    <div className="repo-card-footer">
                      <span className="repo-updated">
                        <Clock size={12} />
                        Updated {new Date(repo.updated_at).toLocaleDateString()}
                      </span>
                      <button className="view-repo-btn">
                        <Code size={14} />
                        View Code
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="project-detail">
            <button className="back-button" onClick={() => setSelectedRepo(null)}>
              <ArrowLeft size={18} />
              Back to Repositories
            </button>

            <div className="detail-container">
              {/* Header */}
              <div className="detail-header">
                <div className="detail-header-content">
                  <div className="detail-icon">
                    <Folder size={32} />
                  </div>
                  <div className="detail-info">
                    <h1 className="detail-title">
                      {selectedRepo.name}
                      <span className="visibility-badge">
                        {selectedRepo.private ? 'Private' : 'Public'}
                      </span>
                    </h1>
                    <p className="detail-description">
                      {selectedRepo.description || 'No description provided.'}
                    </p>
                    <div className="detail-stats">
                      <span className="detail-stat">
                        <Star size={16} />
                        {selectedRepo.stargazers_count} stars
                      </span>
                      <span className="detail-stat">
                        <GitFork size={16} />
                        {selectedRepo.forks_count} forks
                      </span>
                      <span className="detail-stat">
                        <Eye size={16} />
                        {selectedRepo.watchers_count} watchers
                      </span>
                      <span className="detail-stat">
                        <Calendar size={16} />
                        Updated {new Date(selectedRepo.updated_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="detail-actions">
                    <a
                      href={selectedRepo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="detail-action-btn primary"
                    >
                      <Github size={18} />
                      View on GitHub
                    </a>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="detail-content">
                {/* File Sidebar */}
                <div className="file-sidebar">
                  <div className="sidebar-header">
                    <Folder size={16} />
                    <span>Files</span>
                  </div>
                  <div className="file-tree-container">
                    {loadingFiles ? (
                      <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <Loader2 size={24} className="loading-spinner" />
                      </div>
                    ) : files.length === 0 ? (
                      <div style={{ textAlign: 'center', padding: '2rem', color: 'rgba(255,255,255,0.4)' }}>
                        <p>No files found</p>
                      </div>
                    ) : (
                      renderTree(files)
                    )}
                  </div>
                </div>

                {/* File Content */}
                <div className="file-content-area">
                  {selectedFile ? (
                    <div className="file-viewer">
                      <div className="file-viewer-header">
                        <div className="file-viewer-title">
                          <div className="file-viewer-icon">
                            {getFileIcon(selectedFile.name)}
                          </div>
                          <div className="file-viewer-info">
                            <h3>{selectedFile.name}</h3>
                            <div className="file-viewer-meta">
                              <span>{getLineCount()} lines</span>
                              <span>
                                {selectedFile.size > 1024 
                                  ? `${(selectedFile.size / 1024).toFixed(1)} KB` 
                                  : `${selectedFile.size} B`}
                              </span>
                              <span>{getFileLanguage(selectedFile.name)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="file-viewer-actions">
                          <button
                            className={`file-action-btn ${copied ? 'copied' : ''}`}
                            onClick={copyToClipboard}
                          >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                            <span>{copied ? 'Copied!' : 'Copy'}</span>
                          </button>
                          <button
                            className="file-action-btn"
                            onClick={downloadFile}
                          >
                            <Download size={16} />
                            <span>Download</span>
                          </button>
                          <a
                            href={selectedFile.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="file-action-btn"
                          >
                            <ExternalLink size={16} />
                            <span>Open</span>
                          </a>
                        </div>
                      </div>
                      <div className="code-container">
                        {loadingContent && (
                          <div className="code-loading">
                            <Loader2 size={32} className="loading-spinner" />
                          </div>
                        )}
                        <SyntaxHighlighter
                          language={getFileLanguage(selectedFile.name)}
                          style={vscDarkPlus}
                          showLineNumbers={true}
                          wrapLines={true}
                          customStyle={{
                            margin: 0,
                            padding: '1.5rem',
                            background: '#0d0d0d',
                            fontSize: '0.875rem',
                            minHeight: '400px',
                          }}
                        >
                          {fileContent}
                        </SyntaxHighlighter>
                      </div>
                    </div>
                  ) : (
                    <div className="content-empty">
                      <Code size={64} />
                      <p>Select a file to view its contents</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="detail-footer">
                <div className="footer-info">
                  {selectedRepo.language && (
                    <span>
                      <span 
                        className="language-dot" 
                        style={{ 
                          display: 'inline-block',
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          background: getLanguageColor(selectedRepo.language) 
                        }}
                      />
                      {selectedRepo.language}
                    </span>
                  )}
                  <span>
                    <GitBranch size={14} />
                    {selectedRepo.default_branch || 'main'}
                  </span>
                  {selectedRepo.license && (
                    <span>
                      <FileText size={14} />
                      {selectedRepo.license.spdx_id}
                    </span>
                  )}
                </div>
                <a
                  href={selectedRepo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-link"
                >
                  <Github size={18} />
                  View on GitHub
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}