import React, { useState } from "react";
import { FaBook } from "react-icons/fa";

export default function Navbar({ 
  currentUser, 
  onOpenLogin, 
  onOpenSignup, 
  onViewLibrary, 
  onLogout,
  hideProfileMenu = false   // ← NEW: hides menu when in Library
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const deleteAccount = () => {
  if (!currentUser) return;

  try {
    const stored = localStorage.getItem("users");
    let allUsers = [];

    if (stored && stored !== "undefined" && stored !== "null") {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) allUsers = parsed;
      } catch (e) {
        allUsers = [];
      }
    }

    // Remove current user
    const updatedUsers = allUsers.filter(u => u.email !== currentUser.email);

    // Clean save
    if (updatedUsers.length === 0) {
      localStorage.removeItem("users");
    } else {
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }

    localStorage.removeItem("currentUser");
    alert("Account deleted successfully!");
    onLogout();
    window.dispatchEvent(new Event("userChanged"));

  } catch (error) {
    console.error("Error during deletion:", error);
    localStorage.clear();
    alert("Account deleted and app reset.");
    window.location.reload();
  }
};

  return (
    <nav className="navbar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div
        className="logo"
        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        onClick={() => (window.location.href = "/")}
      >
        <FaBook size={24} style={{ marginRight: "8px" }} />
        <span>Smart Knowledge Hub</span>
      </div>

      <div className="nav-actions">
        {!currentUser ? (
          <>
            <button onClick={onOpenLogin}>Login</button>
            <button onClick={onOpenSignup}>Signup</button>
          </>
        ) : (
          // ← ONLY THIS PART CHANGED: hides entire profile menu when hideProfileMenu is true
          !hideProfileMenu && (
            <div className="profile-menu" style={{ position: "relative", display: "inline-block" }}>
              <span
                className="profile-name"
                style={{ marginRight: "12px", cursor: "pointer" }}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {currentUser.name}
              </span>

              {menuOpen && (
                <div className="profile-dropdown">
                  <button className="drop-btn" onClick={onViewLibrary}>
                    Library
                  </button>
                  <button className="drop-btn" onClick={onLogout}>
                    Logout
                  </button>
                  <button className="drop-btn danger" onClick={deleteAccount}>
                    Delete Account
                  </button>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </nav>
  );
}