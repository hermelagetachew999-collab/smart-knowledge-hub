import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Library from "./pages/Library";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";
import Footer from "./components/Footer";
import Home from "./pages/Home";

import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";

const safeJSON = (value, fallback = null) => {
  try {
    if (!value || value === "undefined" || value === "null") return fallback;
    const parsed = JSON.parse(value);
    return parsed !== null && typeof parsed === "object" ? parsed : fallback;
  } catch {
    return fallback;
  }
};

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [currentView, setCurrentView] = useState("home"); // 'home', 'library', 'about', 'privacy', 'terms', 'contact'
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const updateUser = () => {
      setCurrentUser(safeJSON(localStorage.getItem("currentUser")));
    };
    updateUser();
    window.addEventListener("userChanged", updateUser);
    window.addEventListener("openLogin", () => setShowLogin(true));
    return () => {
      window.removeEventListener("userChanged", updateUser);
      window.removeEventListener("openLogin", () => setShowLogin(true));
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.dispatchEvent(new Event("userChanged"));
    setCurrentUser(null);
    setCurrentView("home");
  };

  const renderContent = () => {
    switch (currentView) {
      case "library":
        return <Library onClose={() => setCurrentView("home")} currentUser={currentUser} />;
      case "about":
        return <About />;
      case "privacy":
        return <Privacy />;
      case "terms":
        return <Terms />;
      case "contact":
        return <Contact />;
      case "home":
      default:
        return <Home currentUser={currentUser} />;
    }
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* MAIN CONTENT – BLURS WHEN MODAL OPEN */}
      <div
        style={{
          filter: showLogin || showSignup ? "blur(10px)" : "none",
          transition: "filter 0.4s ease",
          pointerEvents: showLogin || showSignup ? "none" : "auto",
        }}
      >
        <Navbar
          currentUser={currentUser}
          onOpenLogin={() => setShowLogin(true)}
          onOpenSignup={() => setShowSignup(true)}
          onViewLibrary={() => setCurrentView("library")}
          onNavigate={(view) => setCurrentView(view)}
          onLogout={handleLogout}
          hideProfileMenu={currentView === "library"}
        />

        {renderContent()}

        <Footer onNavigate={setCurrentView} />
      </div>

      {/* LOGIN / SIGNUP MODAL WITH DARK OVERLAY */}
      {(showLogin || showSignup) && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.8)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => {
            setShowLogin(false);
            setShowSignup(false);
          }}
        >
          <div onClick={(e) => e.stopPropagation()}>
            {showLogin && (
              <LoginModal
                onClose={() => setShowLogin(false)}
                onSuccess={(user) => {
                  localStorage.setItem("currentUser", JSON.stringify(user));
                  window.dispatchEvent(new Event("userChanged"));
                  setShowLogin(false);
                }}
                switchToSignup={() => {
                  setShowLogin(false);
                  setShowSignup(true);
                }}
              />
            )}

            {showSignup && (
              <SignupModal
                onClose={() => setShowSignup(false)}
                onSuccess={(user) => {
                  localStorage.setItem("currentUser", JSON.stringify(user));
                  window.dispatchEvent(new Event("userChanged"));
                  setShowSignup(false);
                }}
                switchToLogin={() => {
                  setShowSignup(false);
                  setShowLogin(true);
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
