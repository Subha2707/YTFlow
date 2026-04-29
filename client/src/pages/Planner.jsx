import { useState } from 'react';
import API from '../api';
// eslint-disable-next-line no-unused-vars
import GlassCard from '../components/Card';
import Loader from '../components/Loader';

export default function Planner() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return alert('Enter a topic');
    setLoading(true);
    setGenerated(null);
    setSaveSuccess(false);
    try {
      const res = await API.post('/generate', { topic });
      // Backend returns { ideas, titles, tags, description }
      setGenerated(res.data);
    } catch (err) {
      alert('Generation failed. Check backend logs.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!generated) return;
    try {
      await API.post('/plans', { topic, generatedContent: generated });
      setSaveSuccess(true);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert('Save failed');
    }
  };

  return (
    <div className="planner page-transition">
      <h2 className="neon-text">AI Content Planner</h2>
      <textarea
        placeholder="e.g., 'Top 10 JavaScript tips for beginners' or 'Minecraft survival guide'"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <button onClick={handleGenerate} className="neon-btn">
        {loading ? 'Generating...' : 'Generate Plan'}
      </button>

      {loading && <Loader />}

      {generated && (
        <div className="results-container glass-card">
          <div className="result-section">
            <h3>💡 Video Ideas</h3>
            <ul>
              {generated.ideas.map((idea, idx) => (
                <li key={idx}>{idea}</li>
              ))}
            </ul>
          </div>
          <div className="result-section">
            <h3>📝 Titles</h3>
            <ul>
              {generated.titles.map((title, idx) => (
                <li key={idx}>{title}</li>
              ))}
            </ul>
          </div>
          <div className="result-section">
            <h3>🏷️ Tags</h3>
            <div className="tags">
              {generated.tags.map((tag, idx) => (
                <span className="tag" key={idx}>{tag}</span>
              ))}
            </div>
          </div>
          <div className="result-section">
            <h3>📄 Description</h3>
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