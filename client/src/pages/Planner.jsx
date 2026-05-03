import { useState } from 'react';
import API from '../api';
// eslint-disable-next-line no-unused-vars
import GlassCard from '../components/Card';
import Loader from '../components/Loader';
import { FaCalendarAlt, FaLightbulb, FaTag } from "react-icons/fa";
import { MdSubtitles, MdDescription } from "react-icons/md";


export default function Planner() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(null);
  const [calendar, setCalendar] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isCalendarMode, setIsCalendarMode] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return alert('Enter a topic');
    setLoading(true);
    setGenerated(null);
    setCalendar(null);
    setSaveSuccess(false);
    try {
      const payload = { topic };
      if (isCalendarMode) payload.type = 'calendar';
      const res = await API.post('/api/generate', payload);
      if (isCalendarMode) {
        setCalendar(res.data.calendar);
      } else {
        setGenerated(res.data);
      }
    } catch (err) {
      alert('Generation failed. Check backend logs.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const contentToSave = isCalendarMode ? { calendar } : generated;
    if (!contentToSave || (isCalendarMode && !calendar) || (!isCalendarMode && !generated)) return;
    try {
      await API.post('/api/plans', { topic, generatedContent: contentToSave });
      setSaveSuccess(true);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert('Save failed');
    }
  };

  return (
    <div className="planner page-transition">
      <h2 className="neon-text">AI Content Planner</h2>

      {/* Mode toggle */}
      <div style={{ marginBottom: 16, textAlign: 'center' }}>
        <button
          className={`neon-btn ${isCalendarMode ? 'active' : ''}`}
          onClick={() => setIsCalendarMode(!isCalendarMode)}
          style={{ marginRight: 16 }}
        >
          {isCalendarMode ? 'Calendar Mode ✓' : 'Switch to Calendar'}
        </button>
      </div>

      <textarea
        placeholder="e.g., 'Top 10 JavaScript tips' or 'Indian food cooking channel'"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <button onClick={handleGenerate} className="neon-btn">
        {loading ? 'Generating...' : isCalendarMode ? 'Generate 7‑Day Calendar' : 'Generate Plan'}
      </button>

      {loading && <Loader />}

      {/* Calendar Output */}
      {calendar && isCalendarMode && (
        <div className="calendar-container glass-card">
          <h3 className="neon-text"><FaCalendarAlt/>7‑Day YouTube Content Calendar</h3>
          <div className="calendar-grid">
            {calendar.map((day, idx) => (
              <div key={idx} className="calendar-day-card">
                <h4 className="day-title">{day.day}</h4>
                <p><strong>Topic:</strong> {day.topic}</p>
                <p><strong>Title:</strong> {day.title}</p>
                <p><strong>Format:</strong> {day.format}</p>
                <p><strong>Description:</strong> {day.description}</p>
                <div className="tags">
                  {day.tags.map((tag, i) => <span className="tag" key={i}>{tag}</span>)}
                </div>
                <p><strong>Thumbnail:</strong> {day.thumbnailConcept}</p>
              </div>
            ))}
          </div>
          <button onClick={handleSave} className="neon-btn" style={{ marginTop: 20 }}>
            Save Calendar
          </button>
          {saveSuccess && <p style={{ color: '#00ffc4', marginTop: 10 }}>✓ Calendar saved!</p>}
        </div>
      )}

      {/* Single Plan Output (ideas, titles, tags, description) */}
      {generated && !isCalendarMode && (
        <div className="results-container glass-card">
          <div className="result-section">
            <h3><FaLightbulb/> Video Ideas</h3>
            <ul>
              {generated.ideas.map((idea, idx) => (
                <li key={idx}>{idea}</li>
              ))}
            </ul>
          </div>
          <div className="result-section">
            <h3><MdSubtitles/> Titles</h3>
            <ul>
              {generated.titles.map((title, idx) => (
                <li key={idx}>{title}</li>
              ))}
            </ul>
          </div>
          <div className="result-section">
            <h3><FaTag/> Tags</h3>
            <div className="tags">
              {generated.tags.map((tag, idx) => (
                <span className="tag" key={idx}>{tag}</span>
              ))}
            </div>
          </div>
          <div className="result-section">
            <h3><MdDescription/> Description</h3>
            <p>{generated.description}</p>
          </div>
          <button onClick={handleSave} className="neon-btn">
            Save Plan
          </button>
          {saveSuccess && <p style={{ color: '#00ffc4', marginTop: 10 }}>✓ Plan saved!</p>}
        </div>
      )}
    </div>
  );
}