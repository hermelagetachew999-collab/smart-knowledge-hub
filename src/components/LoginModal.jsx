import React, { useState } from "react";

export default function LoginModal({ onClose, onSuccess, switchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields.");
      return;
    }

 const users = safeJSON(localStorage.getItem("users"), []);
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
      alert("Invalid email or password.");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));
    alert("Login successful!");
    onSuccess(user); // ← THIS WAS MISSING
    onClose();
  };
const safeJSON = (item, fallback = []) => {
  try {
    if (!item || item === "undefined" || item === "null") return fallback;
    const parsed = JSON.parse(item);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
};
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
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
          <button type="submit">Login</button>
        </form>
        <p style={{ marginTop: "10px", fontSize: "14px" }}>
          Don't have an account? <span className="btn" onClick={switchToSignup} style={{ fontWeight: 500, cursor: "pointer" }}>Signup</span>
        </p>
      </div>
    </div>
  );
}