import { useState } from 'react';
import GlassCard from '../components/Card';
// eslint-disable-next-line no-unused-vars
import { FiYoutube, FiChevronDown, FiChevronUp } from 'react-icons/fi';

export default function Tutorials() {
  const [openIndex, setOpenIndex] = useState(null);

  const tutorials = [
    {
      title: 'Getting Started with the AI Planner',
      duration: '5 min',
      summary: 'Learn how to generate your first content plan using the AI Content Planner.',
      steps: [
        'Navigate to the Planner page from the navbar.',
        'Enter a topic in the text area (e.g., "Minecraft survival tips").',
        'Click "Generate Plan" and wait for the AI to respond.',
      ],
    },
    {
      title: 'How to Create a 7-Day Content Calendar',
      duration: '7 min',
      summary: 'Master the Calendar Mode to plan an entire week of YouTube videos.',
      steps: [
        'Go to the Planner page.',
        'Click "Switch to Calendar" to toggle Calendar Mode.',
        'Enter your niche or topic.',
        'Click "Generate 7-Day Calendar".',
        'Review each day\'s topic, title, format, and tags.',
        'Click "Save Calendar" to store it in your Saved Plans.',
      ],
    },
    {
      title: 'Using YouTube Analytics',
      duration: '6 min',
      summary: 'Analyze any YouTube video or channel with detailed stats and charts.',
      steps: [
        'Go to the Analytics page.',
        'Paste a YouTube video or channel URL in the input field.',
        'Click "Analyze" to fetch real-time data.',
        'Explore the stat cards, engagement badge, and interactive charts.',
      ],
    },
    {
      title: 'Managing Saved Plans',
      duration: '4 min',
      summary: 'View, delete, and organize your saved content plans.',
      steps: [
        'Navigate to the Saved Plans page.',
        'See all your saved generations with dates and types.',
        'Click "View Details" on any plan to see the full content.',
        'Use the "Delete" button to remove plans you no longer need.',
      ],
    },
    {
      title: 'Interpreting Your Dashboard Stats',
      duration: '3 min',
      summary: 'Understand your dashboard metrics — total plans, monthly activity, and recent overview.',
      steps: [
        'Visit the Dashboard page after logging in.',
        'View Total Plans and This Month cards for quick stats.',
        'Check Recent Plans for a snapshot of your latest activity.',
      ],
    },
  ];

  return (
    <div className="tutorials-page page-transition">
      <div className="page-header">
        <h1 className="neon-text">Tutorials</h1>
        <p>Step-by-step guides to master every feature of YTFlow</p>
      </div>

      <div className="tutorials-list">
        {tutorials.map((tut, idx) => (
          <GlassCard key={idx} className="tutorial-card">
            <div
              className="tutorial-header"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              style={{ cursor: 'pointer' }}
            >
                <div>
                    <h3>{tut.title}</h3>
                </div>
              {openIndex === idx ? <FiChevronUp /> : <FiChevronDown />}
            </div>
            {openIndex === idx && (
              <div className="tutorial-body">
                <p className="tutorial-summary">{tut.summary}</p>
                <ol className="tutorial-steps">
                  {tut.steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
            )}
          </GlassCard>
        ))}
      </div>
    </div>
  );
}