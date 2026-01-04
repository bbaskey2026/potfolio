export const getFileLanguage = (filename) => {
  const ext = filename.split('.').pop()?.toLowerCase();
  const langMap = {
    js: 'javascript',
    jsx: 'jsx',
    ts: 'typescript',
    tsx: 'tsx',
    py: 'python',
    java: 'java',
    cpp: 'cpp',
    c: 'c',
    cs: 'csharp',
    rb: 'ruby',
    go: 'go',
    rs: 'rust',
    php: 'php',
    swift: 'swift',
    kt: 'kotlin',
    html: 'html',
    css: 'css',
    scss: 'scss',
    json: 'json',
    xml: 'xml',
    yml: 'yaml',
    yaml: 'yaml',
    md: 'markdown',
    sh: 'bash',
  };
  return langMap[ext] || 'plaintext';
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatFileSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

export const fetchWithAuth = (url) => {
  const headers = { Accept: 'application/vnd.github.v3+json' };
  return fetch(url, { headers });
};