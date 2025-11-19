import React, { useState } from "react";

export default function SignupModal({ onClose, onSuccess, switchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
const safeJSON = (item, fallback = []) => {
  try {
    if (!item || item === "undefined" || item === "null") return fallback;
    const parsed = JSON.parse(item);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
};
  const users = safeJSON(localStorage.getItem("users"), []);

    if (users.find((u) => u.email === email)) {
      alert("This email is already registered.");
      return;
    }

    const newUser = { name, email, password, resources: [] };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    alert("Signup successful!");
    onSuccess(newUser); // ← THIS WAS MISSING
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        <h2>Signup</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Signup</button>
        </form>
        <p style={{ marginTop: "10px", fontSize: "14px" }}>
          Already have an account? <span className="btn" onClick={switchToLogin} style={{ fontWeight: 500, cursor: "pointer" }}>Login</span>
        </p>
      </div>
    </div>
  );
}