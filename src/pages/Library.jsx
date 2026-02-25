import React, { useEffect, useState } from "react";
import ResourceCard from "../components/ResourceCard";

const safeJSON = (item, fallback = null) => {
  try {
    return item && item !== "undefined" && item !== "null" ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

export default function Library({ onClose, currentUser }) {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    setResources(currentUser?.resources || []);
  }, [currentUser]);

  useEffect(() => {
    const update = () => {
      const user = safeJSON(localStorage.getItem("currentUser"));
      setResources(user?.resources || []);
    };
    window.addEventListener("userChanged", update);
    return () => window.removeEventListener("userChanged", update);
  }, []);

  const removeFromLibrary = (resourceToRemove) => {
    if (!currentUser) return;

    const updatedResources = resources.filter(r => r.link !== resourceToRemove.link);
    const allUsers = safeJSON(localStorage.getItem("users"), []);
    const updatedUsers = allUsers.map(u =>
      u.email === currentUser.email ? { ...u, resources: updatedResources } : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify({ ...currentUser, resources: updatedResources }));
    window.dispatchEvent(new Event("userChanged"));
    setResources(updatedResources);
  };

  const stats = {
    total: resources.length,
    youtube: resources.filter(r => r.type === "youtube").length,
    wikipedia: resources.filter(r => r.type === "wikipedia").length,
    arxiv: resources.filter(r => r.type === "arxiv").length,
    web: resources.filter(r => r.type === "link").length,
  };

  return (
    <div className="container" style={{ marginTop: "40px" }}>
      {/* Analytics Dashboard */}
      <div className="analytics-dashboard" style={{ background: "#fdfdfd", padding: "20px", borderRadius: "10px", marginBottom: "30px", border: "1px solid #eee", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
        <h3 style={{ marginTop: 0, marginBottom: "15px" }}>Learning Progress & Insights</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "10px" }}>
          <div style={{ padding: "10px", textAlign: "center", background: "#f0f7ff", borderRadius: "8px" }}>
            <span style={{ display: "block", fontSize: "24px", fontWeight: "bold", color: "#007bff" }}>{stats.total}</span>
            <span style={{ fontSize: "12px", color: "#666" }}>Total Resources</span>
          </div>
          <div style={{ padding: "10px", textAlign: "center", background: "#fff5f5", borderRadius: "8px" }}>
            <span style={{ display: "block", fontSize: "20px", fontWeight: "bold", color: "#dc3545" }}>{stats.youtube}</span>
            <span style={{ fontSize: "12px", color: "#666" }}>YouTube Videos</span>
          </div>
          <div style={{ padding: "10px", textAlign: "center", background: "#f5fff5", borderRadius: "8px" }}>
            <span style={{ display: "block", fontSize: "20px", fontWeight: "bold", color: "#28a745" }}>{stats.wikipedia}</span>
            <span style={{ fontSize: "12px", color: "#666" }}>Wikipedia Articles</span>
          </div>
          <div style={{ padding: "10px", textAlign: "center", background: "#fcfcff", borderRadius: "8px" }}>
            <span style={{ display: "block", fontSize: "20px", fontWeight: "bold", color: "#6f42c1" }}>{stats.arxiv}</span>
            <span style={{ fontSize: "12px", color: "#666" }}>Research Papers</span>
          </div>
          <div style={{ padding: "10px", textAlign: "center", background: "#fffdf5", borderRadius: "8px" }}>
            <span style={{ display: "block", fontSize: "20px", fontWeight: "bold", color: "#fd7e14" }}>{stats.web}</span>
            <span style={{ fontSize: "12px", color: "#666" }}>Web Links</span>
          </div>
        </div>
      </div>
      <div className="library-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2>{currentUser?.name ? `${currentUser.name}'s Library` : "Your Library"}</h2>
        <div className="library-actions" style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => {
              const csvContent = "data:text/csv;charset=utf-8,"
                + "Title,Link,Type,Summary,Notes\n"
                + resources.map(r => `"${r.title}","${r.link}","${r.type}","${(r.summary || '').replace(/"/g, '""')}","${(r.notes || '').replace(/"/g, '""')}"`).join("\n");
              const encodedUri = encodeURI(csvContent);
              const link = document.createElement("a");
              link.setAttribute("href", encodedUri);
              link.setAttribute("download", "my_library.csv");
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            style={{ padding: "8px 15px", borderRadius: "5px", border: "1px solid #28a745", background: "#28a745", color: "white", cursor: "pointer" }}
          >
            Export CSV
          </button>
          <button
            onClick={() => {
              const shareData = JSON.stringify(resources);
              const blob = new Blob([shareData], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.setAttribute("href", url);
              link.setAttribute("download", "library_share.json");
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              alert("Library exported as JSON for sharing!");
            }}
            style={{ padding: "8px 15px", borderRadius: "5px", border: "1px solid #17a2b8", background: "#17a2b8", color: "white", cursor: "pointer" }}
          >
            Share Library
          </button>
          <span className="close-btn" onClick={onClose} style={{ fontSize: "24px", cursor: "pointer", marginLeft: "10px" }}>×</span>
        </div>
      </div>

      {resources.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
          <p>Your library is empty. Save some resources from the home page!</p>
        </div>
      ) : (
        <div className="resource-grid">
          {resources.map((r, i) => (
            <ResourceCard
              key={i}
              resource={r}
              onSave={() => removeFromLibrary(r)}
              remove={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}