import { assets } from "../../assets/assets";
import "./Footer.css";
import React from "react";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>This is the first value being logged. It will print the value of category to the console, which might be a variable that holds a specific value for comparison or categorization purposes.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>Company</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>Get in Touch</h2>
            <ul>
                <li>+91234567890</li>
                <li>contwct@tomato.in</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 @TOmato.com- All rights reserved.
      </p>
      
    </div>
    
  );
};

export default Footer;
