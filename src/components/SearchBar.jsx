import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  // Log keys only in dev mode (not in production)
  if (process.env.NODE_ENV === "development") {
    console.log("Google API Key:", process.env.REACT_APP_GOOGLE_API_KEY);
    console.log("Google CSE ID:", process.env.REACT_APP_GOOGLE_CSE_ID);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        placeholder="Search for resources..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button  type="submit">Search</button>
    </form>
  );
}
