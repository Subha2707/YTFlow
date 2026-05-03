import { Link } from 'react-router-dom';
import GlassCard from '../components/Card';
import { FiZap, FiTrendingUp, FiCalendar, FiBarChart2, FiLock, FiGlobe, FiCpu, FiTarget, FiUsers } from 'react-icons/fi';

export default function Features() {
  const features = [
    {
      icon: <FiCpu size={28} />,
      title: 'AI Content Generator',
      desc: 'Powered by Groq\'s Llama models, our AI generates fresh video ideas, SEO-optimized titles, relevant tags, and compelling descriptions from a single topic input.',
    },
    {
      icon: <FiCalendar size={28} />,
      title: '7-Day Content Calendar',
      desc: 'Plan your entire week with a structured calendar. Each day gets a unique topic, title, format, description, tags, and thumbnail concept — all generated automatically.',
    },
    {
      icon: <FiTrendingUp size={28} />,
      title: 'SEO Optimization Suite',
      desc: 'Every generation includes meticulously researched tags, long-tail keywords, and click-worthy titles designed to rank higher in YouTube search results.',
    },
    {
      icon: <FiBarChart2 size={28} />,
      title: 'YouTube Analytics',
      desc: 'Paste any YouTube video or channel link to instantly get views, likes, comments, engagement rate, subscriber count, and interactive charts powered by the official YouTube Data API.',
    },
    {
      icon: <FiTarget size={28} />,
      title: 'Smart Topic Extraction',
      desc: 'Our AI automatically strips meta-instructions from your input and extracts the core niche — so "give me ideas for Indian cooking" becomes just "Indian cooking" for perfect results.',
    },
    {
      icon: <FiLock size={28} />,
      title: 'Secure Authentication',
      desc: 'JWT-based login and registration with bcrypt password hashing. Your plans and data are protected and accessible only by you.',
    },
    {
      icon: <FiUsers size={28} />,
      title: 'Personalized Dashboard',
      desc: 'Track your total plans, monthly activity, and latest topics at a glance. Quick access to recent plans and one-click navigation to all tools.',
    },
    {
      icon: <FiGlobe size={28} />,
      title: 'Responsive Design',
      desc: 'Glassmorphism + neon themed UI that works beautifully on desktop, tablet, and mobile. Smooth animations and intuitive navigation throughout.',
    },
    {
      icon: <FiZap size={28} />,
      title: 'Fallback Intelligence',
      desc: 'If the AI service is temporarily unavailable, our built-in fallback system generates deterministic, topic-specific content so you never leave empty-handed.',
    },
  ];

  return (
    <div className="features-page page-transition">
      <div className="page-header">
        <h1 className="neon-text">All Features</h1>
        <p>Everything you need to plan, create, and optimize your YouTube content strategy</p>
      </div>

      <div className="features-grid">
        {features.map((feature, idx) => (
          <GlassCard key={idx} className="feature-card">
            <span className="feature-icon neon-text">{feature.icon}</span>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </GlassCard>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: 60 }}>
        <h2 className="neon-text-alt" style={{ fontSize: '2rem', marginBottom: 16 }}>Ready to grow your channel?</h2>
        <Link to="/planner" className="neon-btn">Start Generating →</Link>
      </div>
    </div>
  );
}