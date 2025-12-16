import React from "react";

const Contact = () => {
    return (
        <div className="container" style={{ padding: "40px 20px", color: "#fff" }}>
            <h2>Contact Us</h2>
            <p style={{ marginTop: "20px", lineHeight: "1.6", color: "#ddd" }}>
                Have questions or feedback? We'd love to hear from you!
            </p>
            <div style={{ marginTop: "30px" }}>
                <p style={{ marginBottom: "10px" }}><strong>Email:</strong> support@smartknowledgehub.com</p>
                <p style={{ marginBottom: "10px" }}><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p><strong>Address:</strong> 123 Knowledge Way, Learning City, ED 10101</p>
            </div>
        </div>
    );
};

export default Contact;
