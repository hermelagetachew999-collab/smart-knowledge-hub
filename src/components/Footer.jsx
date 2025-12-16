import React from "react";

const Footer = ({ onNavigate }) => {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-section">
                    <h3>Smart Knowledge Hub</h3>
                    <p>Empowering you with knowledge.</p>
                </div>
                <div className="footer-section">
                    <h4>Links</h4>
                    <ul className="footer-links">
                        <li><button onClick={() => onNavigate('about')} className="footer-link">About Us</button></li>
                        <li><button onClick={() => onNavigate('privacy')} className="footer-link">Privacy Policy</button></li>
                        <li><button onClick={() => onNavigate('terms')} className="footer-link">Terms of Service</button></li>
                        <li><button onClick={() => onNavigate('contact')} className="footer-link">Contact</button></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
