import { useState } from 'react';
import API from '../api';
import GlassCard from '../components/Card';
import Loader from '../components/Loader';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ['#00ffc4', '#7b61ff', '#ff6bcb'];

// Engagement color indicator
function getEngagementColor(rate) {
  if (rate >= 5) return '#00ffc4';
  if (rate >= 2) return '#ffc107';
  return '#ff4d6a';
}

export default function Analytics() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!url.trim()) return setError('Enter a YouTube URL');
    setLoading(true);
    setError('');
    setData(null);
    try {
      const res = await API.post('/analytics', { url });
      setData(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const clearInput = () => {
    setUrl('');
    setData(null);
    setError('');
  };

  const tryExample = (type) => {
    if (type === 'video')
      setUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    else
      setUrl('https://www.youtube.com/@mkbhd');
  };

  return (
    <div className="analytics-page page-transition">
      <h2 className="neon-text" style={{ textAlign: 'center', marginBottom: 16 }}>
        YouTube Analytics
      </h2>
      <p style={{ textAlign: 'center', color: '#888', marginBottom: 32 }}>
        Paste a video or channel link to see rich insights
      </p>

      {/* Input area */}
      <div className="analytics-input-wrap">
        <input
          type="text"
          placeholder="Paste YouTube video or channel link..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="analytics-input"
        />
        <div className="analytics-input-actions">
          <button onClick={handleAnalyze} className="neon-btn">Analyze</button>
          <button onClick={clearInput} className="neon-btn" style={{ borderColor: '#ff4d6a', color: '#ff4d6a' }}
            onMouseEnter={e => { e.target.style.background = '#ff4d6a'; e.target.style.color = 'white'; }}
            onMouseLeave={e => { e.target.style.background = ''; e.target.style.color = '#ff4d6a'; }}>
            Clear
          </button>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: 24, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <span style={{ color: '#888' }}>Try an example:</span>
        <button className="neon-btn" style={{ padding: '4px 14px', fontSize: '0.8rem' }} onClick={() => tryExample('video')}>Video</button>
        <button className="neon-btn" style={{ padding: '4px 14px', fontSize: '0.8rem', borderColor: '#7b61ff', color: '#7b61ff' }}
          onClick={() => tryExample('channel')}
          onMouseEnter={e => { e.target.style.background = '#7b61ff'; e.target.style.color = 'white'; }}
          onMouseLeave={e => { e.target.style.background = ''; e.target.style.color = '#7b61ff'; }}>
          Channel
        </button>
      </div>

      {loading && <Loader />}
      {error && <p className="error-text">{error}</p>}

      {/* ========== VIDEO RESULTS ========== */}
      {data && data.type === 'video' && (
        <div className="analytics-results">
          {/* Hero Card */}
          <GlassCard className="video-summary-card" style={{ marginBottom: 32 }}>
            <img src={data.thumbnail} alt="thumb" className="video-thumb" />
            <div className="video-meta">
              <h3>{data.title}</h3>
              <p className="channel-name">{data.channelTitle} <span style={{ marginLeft: 8, color: '#aaa', fontSize: '0.8rem' }}>• {data.channelSubs ? `${data.channelSubs.toLocaleString()} subscribers` : ''}</span></p>
              <p className="publish-date">Published: {new Date(data.publishedAt).toLocaleDateString()}</p>
              <p className="duration">Duration: {data.duration} ({(data.durationSeconds / 60).toFixed(1)} min)</p>
              <div className="engagement-badge" style={{ background: getEngagementColor(data.engagement) }}>
                {data.engagement}% Engagement
              </div>
            </div>
          </GlassCard>

          {/* Stat Cards Grid */}
          <div className="mini-stats-grid">
            <GlassCard className="mini-stat">
              <h4>Views</h4>
              <h2 className="neon-text">{data.views.toLocaleString()}</h2>
            </GlassCard>
            <GlassCard className="mini-stat">
              <h4>Likes</h4>
              <h2 className="neon-text">{data.likes.toLocaleString()}</h2>
            </GlassCard>
            <GlassCard className="mini-stat">
              <h4>Comments</h4>
              <h2 className="neon-text">{data.comments.toLocaleString()}</h2>
            </GlassCard>
            <GlassCard className="mini-stat">
              <h4>Engagement</h4>
              <h2 className="neon-text">{data.engagement}%</h2>
            </GlassCard>
          </div>

          {/* Tags */}
          {data.tags.length > 0 && (
            <GlassCard style={{ marginBottom: 32 }}>
              <h4 style={{ marginBottom: 12 }}>Tags</h4>
              <div className="tags">
                {data.tags.map((tag, idx) => <span className="tag" key={idx}>{tag}</span>)}
              </div>
            </GlassCard>
          )}

          {/* Charts */}
          <div className="chart-section">
            <GlassCard>
              <h4>Views / Likes / Comments</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[{ name: 'Video', Views: data.views, Likes: data.likes, Comments: data.comments }]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#aaa" />
                  <YAxis stroke="#aaa" />
                  <Tooltip />
                  <Bar dataKey="Views" fill="#00ffc4" />
                  <Bar dataKey="Likes" fill="#7b61ff" />
                  <Bar dataKey="Comments" fill="#ff6bcb" />
                </BarChart>
              </ResponsiveContainer>
            </GlassCard>

            <GlassCard>
              <h4>Engagement Breakdown</h4>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Likes', value: data.likes },
                      { name: 'Comments', value: data.comments },
                      { name: 'Remaining Views', value: data.views - data.likes - data.comments },
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name }) => name}
                  >
                    {[...Array(3)].map((_, i) => (
                      <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </GlassCard>
          </div>
        </div>
      )}

      {/* ========== CHANNEL RESULTS ========== */}
      {data && data.type === 'channel' && (
        <div className="analytics-results">
          <GlassCard style={{ marginBottom: 32 }}>
            <h3 style={{ color: '#00ffc4', marginBottom: 12 }}>{data.channelTitle}</h3>
            {data.customUrl && <p className="channel-url" style={{ color: '#7b61ff' }}>{data.customUrl}</p>}
          </GlassCard>

          <div className="mini-stats-grid">
            <GlassCard className="mini-stat">
              <h4>Subscribers</h4>
              <h2 className="neon-text">{data.subscribers.toLocaleString()}</h2>
            </GlassCard>
            <GlassCard className="mini-stat">
              <h4>Total Views</h4>
              <h2 className="neon-text">{data.totalViews.toLocaleString()}</h2>
            </GlassCard>
            <GlassCard className="mini-stat">
              <h4>Videos</h4>
              <h2 className="neon-text">{data.videoCount}</h2>
            </GlassCard>
            <GlassCard className="mini-stat">
              <h4>Avg Recent Views</h4>
              <h2 className="neon-text">{data.avgRecentViews.toLocaleString()}</h2>
            </GlassCard>
          </div>

          {data.recentVideos.length > 0 && (
            <>
              <h4 style={{ margin: '32px 0 16px', color: '#ff6bcb' }}>Recent Videos Performance</h4>
              <div className="chart-section">
                <GlassCard>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data.recentVideos.map(v => ({ name: v.title.substring(0, 25) + '...', Views: v.views }))}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="name" stroke="#aaa" angle={-15} textAnchor="end" height={60} />
                      <YAxis stroke="#aaa" />
                      <Tooltip />
                      <Bar dataKey="Views" fill="#00ffc4" />
                    </BarChart>
                  </ResponsiveContainer>
                </GlassCard>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}