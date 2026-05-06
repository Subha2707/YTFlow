import { useState } from 'react';
import GlassCard from '../components/Card';
import { FiMail, FiMapPin, FiPhone, FiSend, FiClock } from 'react-icons/fi';
import API from '../api';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try{
      await API.post('/contact',{name, email, message});
      setSent(true);
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(()=> setSent(false),4000);
    }catch(err){
      alert(err.response?.data?.error || 'Failed to send message. Please try again.');
    }
  };

  return (
    <div className="contact-page page-transition">
      <div className="page-header">
        <h1 className="neon-text">Contact Us</h1>
        <p>Have questions, feedback, or need help? We'd love to hear from you.</p>
      </div>

      <div className="contact-grid">
        {/* Contact Form */}
        <GlassCard className="contact-form-card">
          <h3>Send a Message</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <textarea
              placeholder="Your Message..."
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <button type="submit" className="neon-btn">
              <FiSend style={{ marginRight: 8 }} /> Send Message
            </button>
          </form>
          {sent && (
            <p className="success-message neon-text" style={{ marginTop: 16 }}>
              ✓ Message sent successfully! We'll get back to you soon.
            </p>
          )}
        </GlassCard>

        {/* Contact Info */}
        <div className="contact-info-col">
          <GlassCard className="contact-info-card">
            <div className="contact-info-icon neon-text"><FiMail size={24} /></div>
            <h4>Email</h4>
            <p>support@ytflow.com</p>
            <p className="contact-sub">We reply within 24 hours</p>
          </GlassCard>

          <GlassCard className="contact-info-card">
            <div className="contact-info-icon neon-text-alt"><FiMapPin size={24} /></div>
            <h4>Location</h4>
            <p>Kolkata, India</p>
            <p className="contact-sub">Remote team, global reach</p>
          </GlassCard>

          <GlassCard className="contact-info-card">
            <div className="contact-info-icon neon-text"><FiPhone size={24} /></div>
            <h4>Phone</h4>
            <p>+91 98765 43210</p>
            <p className="contact-sub">Mon–Fri, 9 AM – 6 PM IST</p>
          </GlassCard>

          <GlassCard className="contact-info-card">
            <div className="contact-info-icon neon-text-alt"><FiClock size={24} /></div>
            <h4>Response Time</h4>
            <p>Average: 2–4 hours</p>
            <p className="contact-sub">Priority support for registered users</p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}