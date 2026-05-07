import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosCreate, IoIosSave } from "react-icons/io";
import { MdAnalytics } from 'react-icons/md';
import { FaCalendarAlt,FaLightbulb } from "react-icons/fa";
import API from '../api';
import GlassCard from '../components/Card';

export default function Dashboard() {
  const [plans, setPlans] = useState([]);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await API.get('/auth/me');
        setUsername(userRes.data.username || userRes.data.email); // fallback
      } catch (err) {
        console.error('Failed to fetch user', err);
      }

      try {
        const plansRes = await API.get('/plans');
        setPlans(plansRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalPlans = plans.length;
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const plansThisMonth = plans.filter(p => new Date(p.createdAt) >= firstDayOfMonth).length;
  const lastPlan = plans.length > 0 ? plans[0] : null;
  const lastGeneratedDate = lastPlan ? new Date(lastPlan.createdAt).toLocaleDateString() : '—';
  const lastTopic = lastPlan ? lastPlan.topic : '—';
  const recentPlans = plans.slice(0, 4);

  if (loading) return <div className="page-transition" style={{ textAlign: 'center', padding: 80 }}>Loading...</div>;

  return (
    <div className="dashboard page-transition">
      {/* Welcome */}
      <div className="dashboard-welcome glass-card">
        <h2>Welcome, <span className="neon-text">{username}</span></h2>
        <p>Here's your content strategy overview</p>
      </div>

      {/* Stats Row */}
      <div className="stats-grid">
        <GlassCard className="stat-card">
          <p>Total Plans</p>
          <h3 className="neon-text">{totalPlans}</h3>
        </GlassCard>
        <GlassCard className="stat-card">
          <p>This Month</p>
          <h3 className="neon-text">{plansThisMonth}</h3>
        </GlassCard>
        <GlassCard className="stat-card">
          <p>Last Generated</p>
          <h3>{lastGeneratedDate}</h3>
        </GlassCard>
        <GlassCard className="stat-card">
          <p>Latest Topic</p>
          <h3>{lastTopic}</h3>
        </GlassCard>
      </div>

      {/* Recent Plans & Quick Actions */}
      <div className="dashboard-grid-2col">
        <GlassCard className="recent-plans-card">
          <h4 className="neon-text">Recent Plans</h4>
          {recentPlans.length === 0 ? (
            <p className="empty-text">No plans yet. Create your first one!</p>
          ) : (
            <ul className="recent-plans-list">
              {recentPlans.map(plan => (
                <li key={plan._id}>
                  <span className="plan-topic">{plan.topic}</span>
                  <span className="plan-date">{new Date(plan.createdAt).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          )}
          {plans.length > 4 && (
            <Link to="/saved" className="neon-btn" style={{ marginTop: 16, display: 'inline-block' }}>
              View All
            </Link>
          )}
        </GlassCard>

        <GlassCard className="quick-actions-card">
          <h4 className="neon-text">Quick Actions</h4>
          <div className="quick-actions-grid">
            <Link to="/planner" className="neon-btn action-btn">
              <IoIosCreate/> Create New Plan
            </Link>
            <Link to="/analytics" className="neon-btn action-btn" style={{ borderColor: '#7b61ff', color: '#7b61ff' }}
              onMouseEnter={e => { e.target.style.background = '#7b61ff'; e.target.style.color = 'white'; }}
              onMouseLeave={e => { e.target.style.background = ''; e.target.style.color = '#7b61ff'; }}>
              <MdAnalytics/> Analytics
            </Link>
            <Link to="/saved" className="neon-btn action-btn" style={{ borderColor: '#ffda03', color: '#ffda03' }}
              onMouseEnter={e => { e.target.style.background = '#ffda03'; e.target.style.color = 'white'; }}
              onMouseLeave={e => { e.target.style.background = ''; e.target.style.color = '#ffda03'; }}>
              <IoIosSave/> Saved Plans
            </Link>
            <Link to="/planner" className="neon-btn action-btn" style={{ borderColor: '#ff6bcb', color: '#ff6bcb' }}
              onMouseEnter={e => { e.target.style.background = '#ff6bcb'; e.target.style.color = 'white'; }}
              onMouseLeave={e => { e.target.style.background = ''; e.target.style.color = '#ff6bcb'; }}>
              <FaCalendarAlt/> Calendar
            </Link>
          </div>
        </GlassCard>
      </div>

      {/* Inspiration / Tips */}
      <GlassCard className="tips-card">
        <h4 className="neon-text"><FaLightbulb/> Content Tip</h4>
        <p>"Consistency beats perfection. Use the Planner to generate ideas in bulk and schedule them weekly."</p>
      </GlassCard>
    </div>
  );
}