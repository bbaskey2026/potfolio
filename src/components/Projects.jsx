import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

function Projects() {
  const username = "bbaskey2026"; // Replace with your GitHub username
  const [projects, setProjects] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [filesContent, setFilesContent] = useState([]);

  // Fetch all repos from GitHub
  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/repos`)
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  // Fetch files for selected repository
  useEffect(() => {
    if (!selectedRepo) return;

    fetch(`https://api.github.com/repos/${username}/${selectedRepo}/contents`)
      .then((res) => res.json())
      .then((files) => {
        const codeFiles = files.filter(
          (file) =>
            file.type === "file" &&
            (file.name.endsWith(".js") ||
              file.name.endsWith(".jsx") ||
              file.name.endsWith(".html") ||
              file.name.endsWith(".css"))
        );

        Promise.all(
          codeFiles.map((file) =>
            fetch(file.download_url).then((res) => res.text())
          )
        ).then((contents) => {
          const combined = codeFiles.map((file, index) => ({
            name: file.name,
            content: contents[index],
          }));
          setFilesContent(combined);
        });
      });
  }, [selectedRepo]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>My GitHub Projects</h1>

      <ul
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          listStyle: "none",
          padding: 0,
        }}
      >
        {projects.map((proj) => (
          <li key={proj.id}>
            <button
              onClick={() => setSelectedRepo(proj.name)}
              style={{
                padding: "10px 15px",
                cursor: "pointer",
                borderRadius: "5px",
                border: "1px solid #007bff",
                backgroundColor:
                  selectedRepo === proj.name ? "#007bff" : "#fff",
                color: selectedRepo === proj.name ? "#fff" : "#007bff",
                transition: "0.3s",
              }}
            >
              {proj.name}
            </button>
          </li>
        ))}
      </ul>

      {selectedRepo && (
        <div style={{ marginTop: "30px" }}>
          <h2>📂 Project: {selectedRepo}</h2>

          {filesContent.length === 0 && <p>Loading files...</p>}

          {filesContent.map((file, idx) => (
            <div key={idx} style={{ marginBottom: "30px" }}>
              <h3>{file.name}</h3>
              <SyntaxHighlighter
                language={
                  file.name.endsWith(".html")
                    ? "html"
                    : file.name.endsWith(".css")
                    ? "css"
                    : "javascript"
                }
                style={vscDarkPlus}
                showLineNumbers
              >
                {file.content}
              </SyntaxHighlighter>
            </div>
          ))}

          <div style={{ marginTop: "40px" }}>
            <h3>🧩 Project Metadata</h3>
            <SyntaxHighlighter language="json" style={vscDarkPlus}>
              {JSON.stringify(
                projects.find((p) => p.name === selectedRepo),
                null,
                2
              )}
            </SyntaxHighlighter>
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;
