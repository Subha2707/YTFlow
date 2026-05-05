import GlassCard from '../components/Card';
import { FiFileText, FiUserCheck, FiAlertTriangle, FiCpu, FiGlobe, FiShield } from 'react-icons/fi';

export default function Terms() {
  const sections = [
    {
      icon: <FiFileText size={20} />,
      title: 'Acceptance of Terms',
      content: `By accessing or using YTFlow ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.

We reserve the right to update or modify these terms at any time without prior notice. Your continued use of the Service after any changes constitutes acceptance of the new terms. It is your responsibility to review these terms periodically.

These terms apply to all visitors, users, and others who access or use the Service.`,
    },
    {
      icon: <FiUserCheck size={20} />,
      title: 'User Accounts',
      content: `To access certain features of the Service, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.

You are responsible for safeguarding your password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account. YTFlow cannot and will not be liable for any loss or damage arising from your failure to comply with this security obligation.

You may not use the Service for any illegal or unauthorized purpose. You must not, in the use of the Service, violate any laws in your jurisdiction.`,
    },
    {
      icon: <FiCpu size={20} />,
      title: 'Use of AI-Generated Content',
      content: `YTFlow uses artificial intelligence (via Groq API) to generate content suggestions including video ideas, titles, tags, descriptions, and content calendars. You understand and agree that:

• AI-generated content is provided "as is" without warranty of any kind
• We do not guarantee the accuracy, originality, or SEO effectiveness of generated content
• You are solely responsible for reviewing and editing AI-generated content before publishing
• You retain all rights to content you create using our AI tools
• We are not responsible for any copyright claims, demonetization, or other issues arising from your use of AI-generated content

The AI models used by YTFlow are trained on publicly available data. While we strive to generate original content, you should always verify uniqueness before publishing.`,
    },
    {
      icon: <FiAlertTriangle size={20} />,
      title: 'Limitation of Liability',
      content: `YTFlow is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, expressed or implied, regarding the Service's reliability, availability, or fitness for a particular purpose.

In no event shall YTFlow, its developers, or contributors be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:

• Your use or inability to use the Service
• Any conduct or content of any third party on the Service
• Any content obtained from the Service
• Unauthorized access, use, or alteration of your transmissions or content

Some jurisdictions do not allow the exclusion of certain warranties or the limitation of liability, so these limitations may not apply to you.`,
    },
    {
      icon: <FiGlobe size={20} />,
      title: 'Intellectual Property',
      content: `The YTFlow platform, including its code, design, logo, and user interface, is the intellectual property of the YTFlow development team. You may not copy, modify, distribute, sell, or lease any part of our Service without written permission.

Content you generate using YTFlow belongs to you. We do not claim ownership over your generated plans, ideas, or content. However, by using the Service, you grant us a limited license to store and display your content solely for the purpose of providing the Service to you.

If you believe that any content on YTFlow infringes your copyright, please contact us at support@ytflow.com with a detailed description of the alleged infringement.`,
    },
    {
      icon: <FiShield size={20} />,
      title: 'Termination',
      content: `We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.

Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service and contact us to request data deletion.

All provisions of these Terms which by their nature should survive termination shall survive termination, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.

For any questions about these Terms, please contact us at support@ytflow.com.`,
    },
  ];

  return (
    <div className="legal-page page-transition">
      <div className="page-header">
        <h1 className="neon-text-alt">
          <FiFileText style={{ marginRight: 12 }} />
          Terms of Service
        </h1>
        <p>Last updated: May 1, 2026</p>
      </div>

      <div className="legal-intro glass-card">
        <p>
          Welcome to YTFlow. These Terms of Service govern your use of our website and services.
          Please read them carefully before using our platform. By accessing or using YTFlow,
          you agree to be bound by these terms.
        </p>
      </div>

      <div className="legal-sections">
        {sections.map((section, idx) => (
          <GlassCard key={idx} className="legal-card">
            <h3>
              <span className="neon-text-alt">{section.icon}</span>
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