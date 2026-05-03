import { Link } from 'react-router-dom';
import { FaBrain, FaRocket } from "react-icons/fa";
import { MdAutoGraph, MdCalendarMonth } from 'react-icons/md';


export default function Home() {
  return (
    <div className="page-transition">
      {/* Hero Section */}
      <section className="hero">
        <span className="hero-badge"><FaRocket/> AI-Powered Growth</span>
        <h1>
          YouTube Strategy <br /> & Content Planner
        </h1>
        <p>
          Generate video ideas, SEO‑optimized titles, tags, and descriptions 
          with cutting‑edge AI. Plan your content calendar and grow your 
          channel faster than ever.
        </p>
        <div className="hero-cta">
          <Link to="/register" className="neon-btn">Get Started Free</Link>
          <Link to="/login" className="neon-btn" style={{ borderColor: '#7b61ff', color: '#7b61ff' }}
             onMouseEnter={e => { e.target.style.background = '#7b61ff'; e.target.style.color = 'white'; }}
             onMouseLeave={e => { e.target.style.background = ''; e.target.style.color = '#7b61ff'; }}>
            Login
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="neon-text">Why creators love us</h2>
        <div className="features-grid">
          <div className="glass-card feature-card">
            <span className="feature-icon"><FaBrain/></span>
            <h3>AI Idea Engine</h3>
            <p>
              Never run out of content. Enter a topic and get fresh, 
              creative video ideas tailored to your niche.
            </p>
          </div>
          <div className="glass-card feature-card">
            <span className="feature-icon"><MdAutoGraph/></span>
            <h3>SEO Supercharge</h3>
            <p>
              Generate killer titles, tags, and descriptions that 
              rank higher in search and get more clicks.
            </p>
          </div>
          <div className="glass-card feature-card">
            <span className="feature-icon"><MdCalendarMonth/></span>
            <h3>Smart Planner</h3>
            <p>
              Save your generated plans and build a consistent 
              content strategy that keeps your channel growing.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="steps-section">
        <h2 className="neon-text-alt">How it works</h2>
        <div className="steps-grid">
          <div className="glass-card step-card">
            <div className="step-number">1</div>
            <h3>Enter a Topic</h3>
            <p>Type what you want to create – e.g., “React hooks tutorial”.</p>
          </div>
          <div className="glass-card step-card">
            <div className="step-number">2</div>
            <h3>AI Works Magic</h3>
            <p>Our AI instantly generates ideas, titles, tags, and a full description.</p>
          </div>
          <div className="glass-card step-card">
            <div className="step-number">3</div>
            <h3>Save & Execute</h3>
            <p>Store your plan and start filming with a clear strategy.</p>
          </div>
        </div>
      </section>

      {/* Testimonial / Social Proof */}
      <div className="testimonial-section">
        <div className="testimonial-card">
          <p>
            “This tool literally doubled my video output and tripled my views.
            The AI titles are incredible – I just copy‑paste and rank!”
          </p>
          <div className="testimonial-author">— Alex Chen, 120k subscribers</div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        © {new Date().getFullYear()} StratPlanner. Built for creators who want to grow.
      </footer>
    </div>
  );
}