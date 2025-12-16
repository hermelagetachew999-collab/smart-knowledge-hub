import React from "react";

const Footer = () => {
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
                        <li><a href="#" className="footer-link">About Us</a></li>
                        <li><a href="#" className="footer-link">Privacy Policy</a></li>
                        <li><a href="#" className="footer-link">Terms of Service</a></li>
                        <li><a href="#" className="footer-link">Contact</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <p>&copy; {new Date().getFullYear()} Smart Knowledge Hub. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
