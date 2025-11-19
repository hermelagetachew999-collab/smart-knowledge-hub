import React from "react";

export default function ResourceCard({ resource, onSave, remove }) {
  const handleClick = () => {
    // Extra safety: if onSave is not a function, do nothing (prevents rare crashes)
    if (typeof onSave === "function") {
      onSave();
    }
  };

  return (
    <div className="resource-card">
      {resource.thumbnail && <img src={resource.thumbnail} alt={resource.title} />}
      <div className="resource-content">
        <h3 className="resource-title">{resource.title}</h3>
        {resource.channel && <p className="resource-channel">{resource.channel}</p>}
        <a
          className="resource-link"
          href={resource.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {resource.type === "youtube" ? "Visit Video" : "Visit PDF/Link"}
        </a>
        <button className="save-btn" onClick={handleClick}>
          {remove ? "Remove" : "Save"}
        </button>
      </div>
    </div>
  );
}