/* eslint-disable react-hooks/static-components */
import { useState } from 'react';
import API from '../api';
import GlassCard from '../components/Card';
import Loader from '../components/Loader';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ['#00ffc4', '#7b61ff', '#ff6bcb'];

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

  // ---- Derived metrics ----
  const computeVideoExtras = (data) => {
    if (!data || data.type !== 'video') return {};
    const daysSincePublished = Math.max(
      1,
      // eslint-disable-next-line react-hooks/purity
      (Date.now() - new Date(data.publishedAt).getTime()) / (1000 * 60 * 60 * 24)
    );
    const avgDailyViews = Math.round(data.views / daysSincePublished);
    const likeRate = ((data.likes / data.views) * 100).toFixed(2);
    return { avgDailyViews, likeRate };
  };

  const computeChannelExtras = (data) => {
    if (!data || data.type !== 'channel' || !data.recentVideos || data.recentVideos.length < 2)
      return { uploadCadence: 0 };
    const dates = data.recentVideos.map(v => new Date(v.publishedAt).getTime());
    const newest = Math.max(...dates);
    const oldest = Math.min(...dates);
    const spanWeeks = Math.max(1, (newest - oldest) / (1000 * 60 * 60 * 24 * 7));
    const vidsPerWeek = (data.recentVideos.length / spanWeeks).toFixed(1);
    return { uploadCadence: vidsPerWeek };
  };

  const videoExtras = data?.type === 'video' ? computeVideoExtras(data) : null;
  const channelExtras = data?.type === 'channel' ? computeChannelExtras(data) : null;

  // ---- Custom tooltip (dark style) ----
  // eslint-disable-next-line no-unused-vars
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'rgba(10,10,26,0.9)',
          border: '1px solid rgba(0,255,196,0.3)',
          borderRadius: 12,
          padding: '8px 14px',
          backdropFilter: 'blur(8px)',
        }}>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color, margin: '4px 0' }}>
              {entry.name}: {entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
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

          {/* Stat Cards (now 6 cards in a 3-column grid) */}
          <div className="mini-stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
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
            {videoExtras && (
              <>
                <GlassCard className="mini-stat">
                  <h4>Avg Daily Views</h4>
                  <h2 className="neon-text">{videoExtras.avgDailyViews.toLocaleString()}</h2>
                </GlassCard>
                <GlassCard className="mini-stat">
                  <h4>Like Rate</h4>
                  <h2 className="neon-text">{videoExtras.likeRate}%</h2>
                </GlassCard>
              </>
            )}
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

          {/* Charts with animation */}
          <div className="chart-section">
            <GlassCard>
              <h4>Views / Likes / Comments</h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={[{ name: 'Video', Views: data.views, Likes: data.likes, Comments: data.comments }]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#aaa"
                    interval={0}
                    angle={-30}
                    textAnchor='end'
                    height={70}
                  />
                  <YAxis stroke="#aaa" />
                  // eslint-disable-next-line react-hooks/static-components, react-hooks/static-components, react-hooks/static-components, react-hooks/static-components
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="Views" fill="#00ffc4" animationDuration={1200} animationEasing="ease-out" />
                  <Bar dataKey="Likes" fill="#7b61ff" animationDuration={1200} animationEasing="ease-out" />
                  <Bar dataKey="Comments" fill="#ff6bcb" animationDuration={1200} animationEasing="ease-out" />
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
                    animationDuration={1000}
                    animationEasing="ease-out"
                  >
                    {[...Array(3)].map((_, i) => (
                      <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
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

          <div className="mini-stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
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
            {channelExtras && (
              <GlassCard className="mini-stat">
                <h4>Uploads / Week</h4>
                <h2 className="neon-text">{channelExtras.uploadCadence}</h2>
              </GlassCard>
            )}
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
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="Views" fill="#00ffc4" animationDuration={1200} animationEasing="ease-out" />
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