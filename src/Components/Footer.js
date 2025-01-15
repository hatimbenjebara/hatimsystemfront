import React from "react";
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <p>
                &copy; {new Date().getFullYear()} 
                <a href="https://hatimbenjebaraporfolio.web.app" className="footer-link">Benjebara Hatim</a>. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
