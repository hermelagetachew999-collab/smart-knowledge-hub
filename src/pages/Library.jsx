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

  return (
    <div className="container" style={{ marginTop: "40px" }}>
      <div className="library-header">
        <h2>{currentUser?.name ? `${currentUser.name}'s Library` : "Your Library"}</h2>
        <span className="close-btn" onClick={onClose}>×</span>
      </div>

      {resources.length === 0 ? (
        <p style={{ color: "var(--muted)", textAlign: "center", marginTop: "60px" }}>
          No saved resources yet. Go back and save some from Home!
        </p>
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