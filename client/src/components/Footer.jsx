import { Link } from 'react-router-dom';
import { FiYoutube, FiGithub, FiTwitter, FiInstagram, FiLinkedin, FiMail, FiSend } from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Brand Section */}
        <div className="footer-section brand-section">
          <h3 className="footer-logo neon-text">YTFlow</h3>
          <p className="footer-description">
            AI-powered YouTube content strategy platform. Generate ideas, optimize SEO, and plan your content calendar with cutting-edge technology.
          </p>
          <div className="footer-socials">
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon" title="YouTube">
              <FiYoutube />
            </a>
            <a href="https://github.com/Subha2707" target="_blank" rel="noopener noreferrer" className="social-icon" title="GitHub">
              <FiGithub />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon" title="Twitter">
              <FiTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" title="Instagram">
              <FiInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon" title="LinkedIn">
              <FiLinkedin />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/planner">Planner</Link></li>
            <li><Link to="/analytics">Analytics</Link></li>
            <li><Link to="/saved">Saved Plans</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div className="footer-section">
          <h4 className="footer-heading">Resources</h4>
          <ul className="footer-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#tutorials">Tutorials</a></li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer-section">
          <h4 className="footer-heading">Support</h4>
          <ul className="footer-links">
            <li><Link to="/contact">Contact Us</Link></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms of Service</a></li>
            <li>
              <a href="mailto:support@ytflow.com" className="email-link">
                <FiMail style={{ marginRight: 6 }} />
                support@ytflow.com
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-section newsletter-section">
          <h4 className="footer-heading">Stay Updated</h4>
          <p className="newsletter-text">Get the latest tips and updates delivered to your inbox.</p>
          <div className="newsletter-form">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="newsletter-input"
            />
            <button className="neon-btn newsletter-btn">
              <FiSend />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© {currentYear} YTFlow. All rights reserved. Built with ❤️ for creators.</p>
        <div className="footer-bottom-links">
          <a href="#privacy">Privacy</a>
          <span className="divider">|</span>
          <a href="#terms">Terms</a>
          <span className="divider">|</span>
          <a href="#cookies">Cookies</a>
        </div>
      </div>
    </footer>
  );
}