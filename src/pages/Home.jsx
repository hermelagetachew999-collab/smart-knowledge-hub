import React, { useState } from "react";
import ResourceCard from "../components/ResourceCard";
import AnimatedBox from "../components/AnimatedBox";
import { box1Photos, box2Photos } from "../components/AnimatedBoxData";
import { fetchYouTube, fetchLinksAndPdfs } from "../utils/api";
import AnimatedText from "../components/AnimatedText";

const safeJSON = (value, fallback = null) => {
  try {
    if (!value || value === "undefined" || value === "null") return fallback;
    const parsed = JSON.parse(value);
    return parsed !== null && typeof parsed === "object" ? parsed : fallback;
  } catch {
    return fallback;
  }
};

const safeJSONList = (value, fallback = []) => {
  try {
    if (!value || value === "undefined" || value === "null") return fallback;
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
};

const Home = ({ currentUser }) => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    setLoading(true);
    setResources([]);

    try {
      const [videos, links] = await Promise.all([
        fetchYouTube(query),
        fetchLinksAndPdfs(query),
      ]);
      const merged = [...videos, ...links];
      const seen = new Set();
      const unique = merged.filter((item) => !seen.has(item.link) && seen.add(item.link));
      setResources(unique);
    } catch (err) {
      alert("Search failed!");
    } finally {
      setLoading(false);
    }
  };

  const saveToLibrary = (resource) => {
    const current = safeJSON(localStorage.getItem("currentUser"));
    if (!current || !current.email) {
      window.dispatchEvent(new Event("openLogin"));
      return;
    }

    const users = safeJSONList(localStorage.getItem("users"), []);
    const userIndex = users.findIndex((u) => u.email === current.email);
    if (userIndex === -1) return;

    const user = users[userIndex];
    if (!Array.isArray(user.resources)) user.resources = [];
    if (user.resources.some((r) => r.link === resource.link)) {
      alert("Already saved!");
      return;
    }

    user.resources.push(resource);
    users[userIndex] = user;
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(user));
    window.dispatchEvent(new Event("userChanged"));
    alert("Saved to Library!");
  };

  return (
  
    <>
      <div style={{ marginTop: 30 }}>
        <AnimatedText />
      </div>

      <div className="search-container">
        <div className="hero">
          <h1>Find PDFs, Videos and Links — fast</h1>
          <p>Search the web, preview resources, and save what matters.</p>

          <div className="search-box" style={{ justifyContent: "center" }}>
            <input
              className="search-input"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search terms"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch(q);
                }
              }}
            />

            <button
              className="icon-btn"
              onClick={() => handleSearch(q)}
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          {resources.length === 0 && !loading && (
            <p style={{ color: "var(--muted)", textAlign: "center" }}>
              No results yet — enter a query above.
            </p>
          )}

          <div className="resources-grid">
            {resources.map((r, i) => (
              <ResourceCard
                key={i}
                resource={r}
                onSave={() => saveToLibrary(r)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="features-section" style={{ display: "flex", gap: "20px", margin: "40px 0" }}>
        <AnimatedBox photos={box1Photos} />
        <AnimatedBox photos={box2Photos} />
      </div>

     

      <div className="knowledge-hub" style={{ marginTop: "40px", textAlign: "center" }}>
        <h2>Professional Knowledge Hubs if you want to learn:</h2>
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "16px",
        }}>
          <a href="https://www.coursera.org/" target="_blank" rel="noopener noreferrer" className="hub-link">Coursera</a>
          <a href="https://www.edx.org/" target="_blank" rel="noopener noreferrer" className="hub-link">edX</a>
          <a href="https://www.khanacademy.org/" target="_blank" rel="noopener noreferrer" className="hub-link">Khan Academy</a>
          <a href="https://www.udemy.com/" target="_blank" rel="noopener noreferrer" className="hub-link">Udemy</a>
          <a href="https://www.freecodecamp.org/" target="_blank" rel="noopener noreferrer" className="hub-link">FreeCodeCamp</a>
        </div>
      </div>

      <footer style={{ background: "#111", color: "#fff", textAlign: "center", padding: "20px 0", marginTop: "40px" }}>
        <p>
          © 2025. All rights reserved. Follow us on
          <a style={{ color: "#1e90ff" }} href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer"> Twitter</a> |
          <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer"> Facebook</a> |
          <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer"> Instagram</a>
        </p>
      </footer>
    </>
  );

};

export default Home;