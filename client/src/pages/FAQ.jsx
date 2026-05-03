import { useState } from 'react';
import GlassCard from '../components/Card';
import { FiChevronDown, FiChevronUp, FiHelpCircle } from 'react-icons/fi';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  // Only allow one to be open at a time
  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const faqs = [
    {
      q: 'What is YTFlow?',
      a: 'YTFlow is an AI-powered YouTube content strategy platform that helps creators generate video ideas, SEO-optimized titles, tags, descriptions, and 7-day content calendars using Groq AI. It also includes YouTube video/channel analytics.',
    },
    {
      q: 'Is YTFlow free to use?',
      a: "Yes! YTFlow is completely free. We use Groq's free tier for AI generation and the YouTube Data API's free quota for analytics. No credit card required.",
    },
    {
      q: 'How does the AI content generator work?',
      a: 'Enter any niche or topic (e.g., "Indian cooking", "Minecraft tutorials"). Our AI strips away meta-instructions, extracts the core topic, and generates 5 distinct video ideas, 5 SEO titles, 10 relevant tags, and a full description — all unique each time.',
    },
    {
      q: 'What is the 7-Day Calendar feature?',
      a: 'Toggle "Calendar Mode" in the Planner to generate a complete week-long content schedule. Each day includes a unique topic, title, format, description, tags, and thumbnail concept. You can save and revisit it anytime from Saved Plans.',
    },
    {
      q: 'How do I use the YouTube Analytics tool?',
      a: 'Go to the Analytics page, paste any YouTube video or channel URL, and click "Analyze." You will see real-time stats like views, likes, comments, engagement rate, subscriber count, and interactive charts.',
    },
    {
      q: 'Can I save and revisit my generated plans?',
      a: 'Absolutely! All generated plans (single or calendar) can be saved with one click. Access them anytime from "Saved Plans." You can view full details and delete plans you no longer need.',
    },
    {
      q: 'Is my data secure?',
      a: 'Yes. We use JWT (JSON Web Token) authentication with bcrypt password hashing. Your plans are stored securely in MongoDB and are only accessible to you. We never share your data with third parties.',
    },
    {
      q: 'What languages does the AI support?',
      a: 'Currently, the AI generates content primarily in English. However, for specific topics (like regional cooking, local trends), you can mention the language or region in your topic and the AI often adapts naturally.',
    },
    {
      q: 'Do I need a YouTube channel to use YTFlow?',
      a: "No! You can use the AI Content Planner and Analytics features even without a channel. However, to paste your own channel links for analytics, you'll need a channel.",
    },
    {
      q: 'How often is new content generated?',
      a: 'Every time you click "Generate," the AI creates completely fresh, unique content. No two generations are the same, even for identical topics. The high temperature setting (1.0+) ensures creativity and variety.',
    },
    {
      q: 'What if the AI fails or returns an error?',
      a: 'We have a built-in fallback system. If Groq AI is temporarily unavailable or rate-limited, the system generates deterministic, topic-specific content so you never leave empty-handed.',
    },
    {
      q: 'Can I suggest new features?',
      a: "We'd love to hear from you! Visit the Contact Us page and send us your suggestions. We are constantly improving YTFlow based on user feedback.",
    },
  ];

  return (
    <div className="faq-page page-transition">
      <div className="page-header">
        <h1 className="neon-text">
          <FiHelpCircle style={{ marginRight: 12 }} />
          Frequently Asked Questions
        </h1>
        <p>Everything you need to know about YTFlow</p>
      </div>

      <div className="faq-list">
        {faqs.map((faq, idx) => (
          <GlassCard
            key={idx}
            className={`faq-card ${openIndex === idx ? 'faq-open' : ''}`}
          >
            {/* Clickable area - whole card */}
            <div
              onClick={() => toggleFAQ(idx)}
              style={{ cursor: 'pointer' }}
            >
              <div className="faq-question">
                <h3>{faq.q}</h3>
                <span className="faq-icon neon-text">
                  {openIndex === idx ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                </span>
              </div>
            </div>

            {/* Answer - conditionally rendered */}
            {openIndex === idx && (
              <div className="faq-answer">
                <p>{faq.a}</p>
              </div>
            )}
          </GlassCard>
        ))}
      </div>
    </div>
  );
}