import { Link } from 'react-router-dom';
import GlassCard from '../components/Card';
import { FiEdit3, FiCpu, FiSave, FiTrendingUp, FiRepeat, FiPlay } from 'react-icons/fi';

export default function HowItWorks() {
  const steps = [
    {
      number: '1',
      icon: <FiEdit3 size={24} />,
      title: 'Sign Up & Log In',
      desc: 'Create your free account with email and password. Your personalized dashboard awaits.',
    },
    {
      number: '2',
      icon: <FiCpu size={24} />,
      title: 'Enter Your Topic',
      desc: 'Describe your niche or paste a rough idea. Our AI strips the noise and identifies the core topic.',
    },
    {
      number: '3',
      icon: <FiPlay size={24} />,
      title: 'AI Generates Content',
      desc: 'In seconds, get 5 unique video ideas, SEO titles, 10 tags, and a full description — all tailored to your niche.',
    },
    {
      number: '4',
      icon: <FiSave size={24} />,
      title: 'Save Your Plan',
      desc: 'Store any generation in your personal vault. Revisit, view details, or delete anytime.',
    },
    {
      number: '5',
      icon: <FiRepeat size={24} />,
      title: 'Generate a Calendar',
      desc: 'Toggle to Calendar Mode for a complete 7-day video schedule with formats, descriptions, and thumbnail concepts.',
    },
    {
      number: '6',
      icon: <FiTrendingUp size={24} />,
      title: 'Analyze Performance',
      desc: 'Paste any YouTube link to see rich analytics — views, engagement, subscriber count, and interactive charts.',
    },
  ];

  return (
    <div className="how-it-works-page page-transition">
      <div className="page-header">
        <h1 className="neon-text-alt">How It Works</h1>
        <p>A simple 6-step workflow to supercharge your YouTube content strategy</p>
      </div>

      <div className="steps-timeline">
        {steps.map((step, idx) => (
          <GlassCard key={idx} className="timeline-card">
            <div className="timeline-number">{step.number}</div>
            <div className="timeline-content">
              <h3>
                <span className="neon-text" style={{ marginRight: 10 }}>{step.icon}</span>
                {step.title}
              </h3>
              <p>{step.desc}</p>
            </div>
          </GlassCard>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: 60 }}>
        <Link to="/planner" className="neon-btn">Try It Now →</Link>
      </div>
    </div>
  );
}