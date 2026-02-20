import React, { useState } from "react";
import { generateSummary } from "../utils/ai";

export default function ResourceCard({ resource, onSave, onUpdate, remove }) {
  const [summarizing, setSummarizing] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  const handleSave = () => {
    if (typeof onSave === "function") {
      onSave(resource);
    }
  };

  const handleSummarize = async () => {
    setSummarizing(true);
    try {
      const summary = await generateSummary(resource);
      if (onUpdate) {
        onUpdate({ ...resource, summary });
      } else {
        // Fallback for UI-only update if onUpdate not provided (e.g. on Home page before save)
        resource.summary = summary;
      }
    } catch (err) {
      alert("Summarization failed");
    } finally {
      setSummarizing(false);
    }
  };

  const handleNoteChange = (e) => {
    if (onUpdate) {
      onUpdate({ ...resource, notes: e.target.value });
    } else {
      resource.notes = e.target.value;
    }
  };

  return (
    <div className="resource-card" style={{ position: "relative" }}>
      {resource.thumbnail && <img src={resource.thumbnail} alt={resource.title} />}
      <div className="resource-content">
        <h3 className="resource-title">{resource.title}</h3>
        {resource.channel && <p className="resource-channel">{resource.channel}</p>}
        {resource.snippet && <p className="resource-snippet" style={{ fontSize: "14px", color: "#666", marginBottom: "10px" }}>{resource.snippet}</p>}

        <div className="resource-actions" style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "10px" }}>
          <a
            className="resource-link"
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "#007bff", fontWeight: "bold" }}
          >
            {resource.type === "youtube" ? "Visit Video" : "Visit Link"}
          </a>

          <button
            className="summarize-btn"
            onClick={handleSummarize}
            disabled={summarizing}
            style={{ padding: "5px 10px", borderRadius: "4px", border: "1px solid #007bff", background: "white", color: "#007bff", cursor: "pointer" }}
          >
            {summarizing ? "Summarizing..." : resource.summary ? "Re-summarize" : "Summarize"}
          </button>

          <button
            className="notes-btn"
            onClick={() => setShowNotes(!showNotes)}
            style={{ padding: "5px 10px", borderRadius: "4px", border: "1px solid #28a745", background: "white", color: "#28a745", cursor: "pointer" }}
          >
            {showNotes ? "Hide Notes" : "Notes"}
          </button>
        </div>

        {resource.summary && (
          <div className="summary-box" style={{ background: "#f8f9fa", padding: "10px", borderRadius: "4px", marginBottom: "10px", borderLeft: "4px solid #007bff" }}>
            <strong style={{ fontSize: "12px", color: "#007bff" }}>AI SUMMARY:</strong>
            <p style={{ margin: "5px 0 0 0", fontSize: "14px" }}>{resource.summary}</p>
          </div>
        )}

        {showNotes && (
          <div className="notes-box" style={{ marginBottom: "10px" }}>
            <textarea
              placeholder="Add your notes here..."
              value={resource.notes || ""}
              onChange={handleNoteChange}
              style={{ width: "100%", height: "80px", padding: "8px", borderRadius: "4px", border: "1px solid #ddd", resize: "vertical" }}
            />
          </div>
        )}

        <button className="save-btn" onClick={handleSave} style={{ width: "100%" }}>
          {remove ? "Remove from Library" : "Save to Library"}
        </button>
      </div>
    </div>
  );
}