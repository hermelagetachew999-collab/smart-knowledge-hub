import React from "react";

const Privacy = () => {
    return (
        <div className="container" style={{ padding: "40px 20px", color: "#fff" }}>
            <h2>Privacy Policy</h2>
            <p style={{ marginTop: "20px", lineHeight: "1.6", color: "#ddd" }}>
                Your privacy is important to us. This privacy policy explains how we collect, use, and protect your personal information.
            </p>
            <h3 style={{ marginTop: "30px", fontSize: "1.2rem" }}>Information We Collect</h3>
            <p style={{ marginTop: "10px", lineHeight: "1.6", color: "#ddd" }}>
                We may collect personal information such as your name and email address when you sign up for our services.
            </p>
            <h3 style={{ marginTop: "30px", fontSize: "1.2rem" }}>How We Use Your Information</h3>
            <p style={{ marginTop: "10px", lineHeight: "1.6", color: "#ddd" }}>
                We use your information to provide and improve our services, communicate with you, and ensure the security of our platform.
            </p>
        </div>
    );
};

export default Privacy;
