import GlassCard from '../components/Card';
import { FiShield, FiLock, FiEye, FiTrash2, FiServer, FiMail } from 'react-icons/fi';

export default function Privacy() {
  const sections = [
    {
      icon: <FiShield size={20} />,
      title: 'Information We Collect',
      content: `When you register for YTFlow, we collect your username, email address, and a hashed password. When you use our services, we store the content plans you generate, including topics, AI-generated ideas, titles, tags, descriptions, and calendar data. We also collect basic usage data such as login timestamps and feature usage patterns to improve our service.

We do NOT collect your YouTube channel data, video content, or any personally identifiable information beyond what you explicitly provide during registration. We never access your YouTube account without your explicit permission through official OAuth channels.`,
    },
    {
      icon: <FiLock size={20} />,
      title: 'How We Protect Your Data',
      content: `Your password is hashed using bcrypt with a salt round of 10 before storage — we never store plain-text passwords. All communication between your browser and our servers is encrypted using HTTPS/TLS. Authentication is handled via JSON Web Tokens (JWT) with a 7-day expiry.

Your generated content and plans are stored in a MongoDB database hosted on MongoDB Atlas, which provides enterprise-grade security including encryption at rest, network isolation, and IP whitelisting. Access to the database is strictly limited to our backend servers.

We regularly update our dependencies to patch security vulnerabilities and follow industry best practices for secure authentication and data storage.`,
    },
    {
      icon: <FiEye size={20} />,
      title: 'How We Use Your Information',
      content: `We use your email address to identify your account, send important service updates (such as security alerts), and respond to support inquiries. Your generated content is stored solely for your personal use and is never shared, sold, or analyzed for purposes other than providing the service to you.

We may use anonymized, aggregated data (such as total number of plans generated across all users) for internal analytics and service improvement. This data cannot be traced back to any individual user.

We will never sell your personal data to third parties. YTFlow is a free service, and our business model does not involve advertising or data monetization.`,
    },
    {
      icon: <FiTrash2 size={20} />,
      title: 'Data Retention & Deletion',
      content: `Your data is retained for as long as your account remains active. You can delete individual plans at any time through the Saved Plans page, and they are permanently removed from our database.

If you wish to delete your entire account and all associated data, please contact us at support@ytflow.com. We will process your request within 7 business days and confirm once deletion is complete.

Inactive accounts (no login for 12+ months) may be automatically purged after notification to the registered email address.`,
    },
    {
      icon: <FiServer size={20} />,
      title: 'Third-Party Services',
      content: `YTFlow integrates with the following third-party services to provide core functionality:

• Groq API — used for AI content generation. Your topic inputs are sent to Groq's servers for processing. Groq does not store your inputs or outputs. See Groq's privacy policy for details.

• YouTube Data API v3 — used for the Analytics feature. When you paste a public YouTube URL, we query YouTube's public API. No authentication with your YouTube account is performed.

• MongoDB Atlas — our database provider. Your data is stored on Atlas servers. See MongoDB's privacy policy for their security practices.

We are not responsible for the privacy practices of these third-party services, but we choose partners who demonstrate strong privacy commitments.`,
    },
    {
      icon: <FiMail size={20} />,
      title: 'Contact Us',
      content: `If you have any questions about this Privacy Policy, your data, or our security practices, please contact us:

• Email: support@ytflow.com
• Contact Form: Visit the Contact Us page on our website
• Response Time: We typically respond within 24-48 hours

This Privacy Policy was last updated on May 1, 2026. We reserve the right to update this policy at any time. Significant changes will be communicated via email to registered users.`,
    },
  ];

  return (
    <div className="legal-page page-transition">
      <div className="page-header">
        <h1 className="neon-text">
          <FiShield style={{ marginRight: 12 }} />
          Privacy Policy
        </h1>
        <p>Last updated: May 1, 2026</p>
      </div>

      <div className="legal-intro glass-card">
        <p>
          At YTFlow, we take your privacy seriously. This Privacy Policy explains what information we collect,
          how we use it, and what rights you have regarding your data. By using YTFlow, you agree to the
          practices described in this policy.
        </p>
      </div>

      <div className="legal-sections">
        {sections.map((section, idx) => (
          <GlassCard key={idx} className="legal-card">
            <h3>
              <span className="neon-text">{section.icon}</span>
              {section.title}
            </h3>
            <div className="legal-content">
              {section.content.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph.trim()}</p>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}