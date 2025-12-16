import React from "react";

const Footer = ({ onNavigate }) => {
    return (
        <div>
            {/* Top Section: Links (Transparent) */}
            <div className="container footer-content" style={{ padding: "40px 0 20px" }}>
                <div className="footer-section">
                    <h3>Smart Knowledge Hub</h3>
                    <p>Empowering you with knowledge.</p>
                </div>
                <div className="footer-section">
                    <ul className="footer-links">
                        <li><button onClick={() => onNavigate('about')} className="footer-link">About Us</button></li>
                        <li><button onClick={() => onNavigate('privacy')} className="footer-link">Privacy Policy</button></li>
                        <li><button onClick={() => onNavigate('terms')} className="footer-link">Terms of Service</button></li>
                        <li><button onClick={() => onNavigate('contact')} className="footer-link">Contact</button></li>
                    </ul>
                </div>
            </div>

            {/* Bottom Section: Copyright (Dark) */}
            <footer style={{ background: "#111", color: "#fff", textAlign: "center", padding: "20px 0", marginTop: "40px" }}>
                <p>
                    &copy; 2025. All rights reserved. Follow us on
                    <a style={{ color: "#1e90ff", marginLeft: "5px" }} href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer"> Twitter</a> |
                    <a style={{ color: "#fff", marginLeft: "5px" }} href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer"> Facebook</a> |
                    <a style={{ color: "#fff", marginLeft: "5px" }} href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer"> Instagram</a>
                </p>
            </footer>
        </div>
    );
};

export default Footer;
